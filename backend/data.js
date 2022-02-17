import cron from 'node-cron';
import fetch from 'node-fetch-npm';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const makeDataFile = () => {
  cron.schedule('* * * * *', async () => {
    try {
      let listData = await getApi();
      listData.forEach((item, index) => {
        item.id = Number(index + 1);
      });
      listData = JSON.stringify(listData);
      fs.writeFileSync('test.json', listData);
      console.log('파일 최신화 완료');
    } catch (err) {
      console.log(err);
    }
  });
};

async function getApi() {
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
    throw err;
  }
}

export default makeDataFile;
