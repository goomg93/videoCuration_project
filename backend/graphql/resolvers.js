import { getVideoDataById, videoAllData, getVideoDataByVideoId, videoPagination } from './video';
import authentication from '../middleware/auth';

const resolvers = {
  Query: {
    videos: async () => await videoAllData(),
    video: async (_, { id, videoId }, context) => {
      try {
        authentication(context);
        let data = await videoAllData();
        return getVideoDataById(data, id) || getVideoDataByVideoId(data, videoId);
      } catch (err) {
        console.log(err);
      }
    },
    videoPagination: async (_, { index, limit }, context) => {
      try {
        authentication(context);
        let data = await videoAllData();
        console.log(data);
        return videoPagination(index, limit, data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default resolvers;
