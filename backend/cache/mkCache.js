import cron from 'node-cron';
import fetch from 'node-fetch-npm';
import dotenv from 'dotenv';
import connectRedisServer from './redis';
import { logger } from '../winston/logs';

dotenv.config();

const cacheSchedule = LIST_ID => {
  cron.schedule('00 09 * * *', async () => {
    await makeCache(LIST_ID);
  });
};

const makeCache = async context => {
  let listData = await getApi(context);
  let redis = await connectRedisServer();
  reprocessData(listData);
  listData = JSON.stringify(listData);
  await redis.set('data', listData);
  logger.info('Update Data');
};

const reprocessData = data => {
  data.forEach((item, index) => {
    item.id = Number(index + 1);
    item.thumbnails = item.thumbnails.replace('default', 'sddefault');
    item.listTimestamp = 0;
  });
};

const getApi = async context => {
  const listId = context.LIST_ID || context;
  let endDate = new Date();
  let startDate = new Date(endDate.setDate(endDate.getDate() - 2));
  endDate = endDate.toISOString().substring(0, 10);
  startDate = startDate.toISOString().substring(0, 10);
  const response = await fetch(
    `https://sandbox.apix.vling.net/v1/video/dlist/${listId}?from=0&size=50&startDate=${startDate}&endDate=${endDate}&sort=publishedAt&order=desc`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        x_api_key: process.env.SECRET_KEY,
      },
    }
  );
  const data = await response.json();
  if (!data.data) {
    throw new Error('NOT EXSIST DATA');
  }
  return data.data;
};

export default { cacheSchedule, makeCache, getApi, reprocessData };
