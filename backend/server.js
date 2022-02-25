import { ApolloServer } from 'apollo-server-express';
import httpHeadersPlugin from 'apollo-server-plugin-http-headers';
import express from 'express';
import cache from './cache/mkCache';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import dotenv from 'dotenv';
import cors from 'cors';
import socketIO from 'socket.io';
import http from 'http';
import realTimeChat from './realTimeChat/chat';
import { connect } from './mongodb/chatDataHandler';

dotenv.config();

const PORT = process.env.PORT;

const startApolloServer = async (typeDefs, resolvers) => {
  try {
    const app = express();
    const expressServer = http.createServer(app);
    const io = socketIO(expressServer, { cors: { origin: '*' } });
    app.use(cors());
    const apolloServer = new ApolloServer({
      cors: {
        origin: '*',
      },
      typeDefs,
      resolvers,
      plugins: [httpHeadersPlugin],
      context: ({ req }) => {
        return { setCookies: new Array(), setHeaders: new Array(), req };
      },
    });
    connect();
    realTimeChat(io);
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    expressServer.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
  } catch (err) {
    throw err;
  }
};

startApolloServer(typeDefs, resolvers);
cache.cacheSchedule();
