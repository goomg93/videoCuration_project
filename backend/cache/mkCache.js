import cron from 'node-cron';
import fetch from 'node-fetch-npm';
import dotenv from 'dotenv';
import connectRedisServer from './redis';

dotenv.config();

const cacheSchedule = () => {
  cron.schedule('59 * * * *', async () => {
    await makeCache();
  });
};

const makeCache = async () => {
  try {
    let listData = await getApi();
    listData.forEach((item, index) => {
      item.id = Number(index + 1);
    });
    listData = JSON.stringify(listData);
    let redis = await connectRedisServer();
    await redis.set('data', listData);
    console.log('최신화완료');
  } catch (err) {
    console.log(`makeCache : ${err}`);
  }
};

const getApi = async () => {
  try {
    let endDate = new Date();
    let startDate = new Date(endDate.setDate(endDate.getDate() - 1));
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
    return data.data;
  } catch (err) {
    console.log(`fetchError : ${err}`);
  }
};

export default { cacheSchedule, makeCache, getApi };
