import { ApolloServer } from 'apollo-server-express';
import httpHeadersPlugin from 'apollo-server-plugin-http-headers';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import dataSchedule from './data';

const PORT = process.env.PORT;

const startApolloServer = async (typeDefs, resolvers) => {
  try {
    const app = express();
    const server = new ApolloServer({
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
dataSchedule();
