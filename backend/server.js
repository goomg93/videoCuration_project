import { ApolloServer } from 'apollo-server-express';
import httpHeadersPlugin from 'apollo-server-plugin-http-headers';
import express from 'express';
import cache from './cache/mkCache';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT;

const startApolloServer = async (typeDefs, resolvers) => {
  try {
    const app = express();
    app.use(cors());
    const server = new ApolloServer({
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
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (err) {
    throw err;
  }
};

startApolloServer(typeDefs, resolvers);
cache.cacheSchedule();
