const redis = require('redis');

const connectRedisServer = async () => {
  try {
    const client = redis.createClient({ host: '52.79.109.183', port: 6379 });

    client.on('error', err => {
      throw err;
    });

    await client.connect();

    return client;
  } catch (err) {
    console.log(err);
  }
};

export default connectRedisServer;
