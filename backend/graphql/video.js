import connectRedisServer from '../cache/redis';
import cache from '../cache/mkCache';

const videoAllData = async () => {
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
};

const getVideoDataById = (data, id) => {
  data = data.filter(video => video.id === id);
  if (data[0] === undefined) {
    throw new Error('invalid id');
  } else {
    return data[0];
  }
};

const getVideoDataByVideoId = (data, videoId) => {
  data = data.filter(video => video.videoId === videoId);
  if (data[0] === undefined) {
    throw new Error('invalid videoId');
  } else {
    return data[0];
  }
};

const videoPagination = (index, limit, data) => {
  let listData = data.splice(index - 1, limit);
  return listData;
};

const videoFilterByCategory = (category, data) => {
  data = data.filter(video => video.category.includes(category));
  return data;
};

export default {
  videoAllData,
  getVideoDataById,
  getVideoDataByVideoId,
  videoPagination,
  videoFilterByCategory,
};
