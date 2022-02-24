const redis = require('redis');

const connectRedisServer = async () => {
  const client = redis.createClient();

  client.on('error', () => {
    throw new Error('connected error');
  });

  await client.connect();

  return client;
};

export default connectRedisServer;
