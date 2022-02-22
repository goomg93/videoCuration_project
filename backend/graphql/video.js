import connectRedisServer from '../cache/redis';
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
      item.timestamp = timestampSecond % item.durationSeconds;
    });
    return dataParse;
  } catch (err) {
    console.log(`getData : ${err}`);
  }
};

const getVideoDataById = (data, id) => {
  data = data.filter(video => video.id === id);
  return data[0];
};

const getVideoDataByVideoId = (data, videoId) => {
  data = data.filter(video => video.videoId === videoId);
  return data[0];
};

const videoPagination = (index, limit, data) => {
  let listData = data.splice(index - 1, limit);
  return listData;
};

export { videoAllData, getVideoDataById, getVideoDataByVideoId, videoPagination };
