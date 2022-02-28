import cron from 'node-cron';
import fetch from 'node-fetch-npm';
import dotenv from 'dotenv';
import connectRedisServer from './redis';

dotenv.config();

const cacheSchedule = () => {
  cron.schedule('00 09 * * *', async () => {
    await makeCache();
  });
};

const makeCache = async () => {
  let listData = await getApi();
  let redis = await connectRedisServer();
  reprocessData(listData);
  listData = JSON.stringify(listData);
  await redis.set('data', listData);
  console.log('최신화완료');
};

const reprocessData = data => {
  data.forEach((item, index) => {
    item.id = Number(index + 1);
    item.thumbnails = item.thumbnails.replace('default', 'sddefault');
    item.listTimestamp = 0;
  });
};

const getApi = async () => {
  let endDate = new Date();
  let startDate = new Date(endDate.setDate(endDate.getDate() - 2));
  endDate = endDate.toISOString().substring(0, 10);
  startDate = startDate.toISOString().substring(0, 10);
  const response = await fetch(
    `https://sandbox.apix.vling.net/v1/video/dlist/${process.env.LIST_ID}?from=0&size=50&startDate=${startDate}&endDate=${endDate}&sort=publishedAt&order=desc`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        x_api_key: process.env.SECRET_KEY,
      },
    }
  );
  const data = await response.json();
  if (data === null) {
    throw new Error('not exsist data');
  }
  return data.data;
};

export default { cacheSchedule, makeCache, getApi };
