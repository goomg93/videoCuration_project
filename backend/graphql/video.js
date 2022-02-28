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

const getVideoDataById = async (data, id, start) => {
  const redis = await connectRedisServer();
  [data] = data.filter(video => video.id === id);
  const timestampSecond = Math.floor(+new Date() / 1000);

  if (data === undefined) {
    throw new Error('invalid id');
  }

  if (start === true) {
    redis.set(`${data.videoId}`, timestampSecond);
    data.timestamp = timestampSecond - (await redis.get(`${data.videoId}`));
  } else if (start === false) {
    data.timestamp = timestampSecond - (await redis.get(`${data.videoId}`));
  }

  return data;
};

const getVideoDataByVideoId = async (data, videoId, start) => {
  const redis = await connectRedisServer();
  [data] = data.filter(video => video.videoId === videoId);
  const timestampSecond = Math.floor(+new Date() / 1000);

  if (data === undefined) {
    throw new Error('invalid videoId');
  }

  if (start === true) {
    redis.set(`${data.videoId}`, timestampSecond);
    data.timestamp = timestampSecond - (await redis.get(`${data.videoId}`));
  } else if (start === false) {
    data.timestamp = timestampSecond - (await redis.get(`${data.videoId}`));
  }

  return data;
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
