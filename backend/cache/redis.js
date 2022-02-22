const redis = require('redis');

const connectRedisServer = async () => {
  try {
    const client = redis.createClient({});

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
