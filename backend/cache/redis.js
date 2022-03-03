const redis = require('redis');
import dotenv from 'dotenv';

dotenv.config();

const connectRedisServer = async () => {
  try {
    const client = redis.createClient({
      url: process.env.CONNECT_REDIS_URL_1 | process.env.CONNECT_REDIS_URL_2,
    });

    await client.connect();

    return client;
  } catch (err) {
    console.log('--- redis-server disconnect ---');
    return false;
  }
};

export default connectRedisServer;
