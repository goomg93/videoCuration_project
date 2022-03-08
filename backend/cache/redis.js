const redis = require('redis');
import dotenv from 'dotenv';
import { logger } from '../winston/logs';

dotenv.config();

const connectRedisServer = async () => {
  try {
    const client = redis.createClient({
      url: process.env.CONNECT_REDIS_URL_1,
    });

    await client.connect();

    return client;
  } catch (err) {
    const error = new Error('Redis connected Error');
    logger.error(error.message);
    return false;
  }
};

export default connectRedisServer;
