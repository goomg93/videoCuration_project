import { UserInputError } from 'apollo-server-express';
import connectRedisServer from '../cache/redis';
import cache from '../cache/mkCache';

const videoAllData = async context => {
  const redis = await connectRedisServer();
  let dataParse;
  if (!redis) {
    dataParse = await cache.getApi(context);
    cache.reprocessData(dataParse);
  } else {
    if (!(await redis.exists(`${context.LIST_ID}`))) {
      await cache.makeCache(context);
    }
    const data = await redis.get(`${context.LIST_ID}`);
    dataParse = JSON.parse(data);
  }

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

const getVideoDataByIsNow = (data, isNow) => {
  [data] = data.filter(video => video.isNow === isNow);
  if (data === undefined) {
    throw new Error('isNow error');
  }
  return data;
};

const videoPagination = (index, limit, data) => {
  let listData = [];
  let [tmp] = data.filter(video => video.isNow === true);

  data.unshift(tmp);

  if (index === 1) {
    listData = data.splice(index - 1, limit + 1);
  } else {
    listData = data.splice(index, limit);
  }

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
  getVideoDataByIsNow,
};
