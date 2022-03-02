import { UserInputError } from 'apollo-server-express';
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
  let totalDurationSeconds = 0;
  let currentOverlapValue = 0;
  let previousValue = 0;

  dataParse.forEach(item => {
    item.timestamp = timestampSecond % item.durationSeconds;
    item.isNow = false;
    totalDurationSeconds += item.durationSeconds;
  });

  let totalTimestamp = timestampSecond % totalDurationSeconds;

  for (let i = 0; i < dataParse.length; i++) {
    currentOverlapValue += dataParse[i].durationSeconds;
    if (totalTimestamp - currentOverlapValue < 0) {
      dataParse[i].isNow = true;
      if (i === 0) {
        data[i].listTimestamp = totalTimestamp;
      } else {
        dataParse[i].listTimestamp = previousValue;
      }
      break;
    } else {
    }
    previousValue = totalTimestamp - currentOverlapValue;
  }

  return dataParse;
};

const videoData = async () => {
  const redis = await connectRedisServer();
  if (!(await redis.exists('data'))) {
    await cache.makeCache();
  }
  const data = await redis.get('data');
  const dataParse = JSON.parse(data);

  return dataParse;
};

const getVideoDataById = (data, id) => {
  [data] = data.filter(video => video.id === id);

  if (data === undefined) {
    throw new UserInputError('Invalid id');
  }

  return data;
};

const getVideoDataByVideoId = (data, videoId) => {
  [data] = data.filter(video => video.videoId === videoId);

  if (data === undefined) {
    throw new UserInputError('Invalid videoId');
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
  videoData,
};
