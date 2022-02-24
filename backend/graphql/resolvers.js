import { getVideoDataById, videoAllData, getVideoDataByVideoId, videoPagination } from './video';
import authentication from '../middleware/auth';

const resolvers = {
  Query: {
    videos: async () => await videoAllData(),
    video: async (_, { id, videoId }, context) => {
      authentication(context);
      let data = await videoAllData();
      if (id === undefined) {
        return getVideoDataByVideoId(data, videoId);
      } else if (videoId === undefined) {
        return getVideoDataById(data, id);
      } else {
        throw new Error('not input');
      }
    },
    videoPagination: async (_, { index, limit }, context) => {
      authentication(context);
      let data = await videoAllData();
      return videoPagination(index, limit, data);
    },
  },
};

export default resolvers;
