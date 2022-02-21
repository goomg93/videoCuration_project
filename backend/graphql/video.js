import connectRedisServer from '../cache/redis';
import authentication from '../middleware/auth';
import cache from '../cache/mkCache';

const videoAllData = async () => {
  try {
    const redis = await connectRedisServer();
    if (!(await redis.exists('data'))) {
      await cache.makeCache();
    }
    const data = await redis.get('data');
    const dataParse = JSON.parse(data);
    const timestampSecond = Math.floor(+new Date() / 1000);
    dataParse.forEach(item => {
      item.ts = timestampSecond % item.durationSeconds;
    });
    return dataParse;
  } catch (err) {
    console.log(`getData : ${err}`);
  }
};

const getVideoDataById = async (id, context) => {
  authentication(context);

  let videoFilter = await videoAllData();
  videoFilter = videoFilter.filter(video => video.id === id);
  return videoFilter[0];
};

export { videoAllData, getVideoDataById };
