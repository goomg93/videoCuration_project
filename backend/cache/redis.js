const redis = require('redis');

const connectRedisServer = async () => {
  try {
    const client = redis.createClient({
      url: 'redis://@redis:6379',
    });

    // client.on('error', () => {
    //   throw new Error('connected error');
    // });

    await client.connect();

    return client;
  } catch (err) {
    console.log('--- redis-server disconnect ---');
    return false;
  }
};

export default connectRedisServer;
