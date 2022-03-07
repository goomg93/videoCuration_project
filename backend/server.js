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
import routes from './healthyCheck';
import { logger } from './winston/logs';
import morgan from 'morgan';

dotenv.config();

const PORT = process.env.PORT;

const startApolloServer = async (typeDefs, resolvers) => {
  try {
    const app = express();
    const expressServer = http.createServer(app);
    const io = socketIO(expressServer, { cors: { origin: '*' } });

    app.use(cors());
    app.use(routes);
    app.use(
      morgan(`${process.env.MORGAN_FORMAT}`, {
        stream: logger.stream,
      })
    );

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
      logger.info(`Server ready at https://www2.wecode.buzzntrend.com:${PORT}`);
    });
  } catch (err) {
    logger.error(err.message);
  }
};
startApolloServer(typeDefs, resolvers);
cache.cacheSchedule();
