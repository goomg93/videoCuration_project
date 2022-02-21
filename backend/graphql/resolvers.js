import fs from 'fs';
import authentication from '../auth';

const getData = () => {
  const readJson = fs.readFileSync('test.json').toString();
  const dataParse = JSON.parse(readJson);
  const timestampSecond = Math.floor(+new Date() / 1000);
  dataParse.forEach(item => {
    item.ts = timestampSecond % item.durationSeconds;
  });
  return dataParse;
};

const getById = (id, context) => {
  authentication(context);

  let videoFilter = getData();
  videoFilter = videoFilter.filter(video => video.id === id);
  return videoFilter[0];
};

const resolvers = {
  Query: {
    videos: () => getData(),
    video: (_, { id }, context) => getById(id, context),
  },
};

export default resolvers;
