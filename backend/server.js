import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cache from './cache/mkCache';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import dotenv from 'dotenv';
import cors from 'cors';
import socketIO from 'socket.io';
import http from 'http';
import realTimeChat from './realTimeChat/chat';
import { dbConnect } from './mongodb/chatDataHandler';
import formatError from './middleware/formatError';
import authentication from './middleware/auth';

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
      context: async ({ req }) => {
        const LIST_ID = await authentication(req);
        return { LIST_ID };
      },
      formatError,
      debug: false,
    });
    dbConnect();
    realTimeChat(io);
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    expressServer.listen(PORT, () => {
      if (process.env.NODE_ENV !== 'production')
        console.log(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
  } catch (err) {
    console.log(err);
  }
};
startApolloServer(typeDefs, resolvers);
cache.cacheSchedule();
