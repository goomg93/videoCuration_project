import video from './video';
import { UserInputError } from 'apollo-server-express';

const resolvers = {
  Query: {
    videos: async (_, arg, context) => await video.videoAllData(context),
    video: async (_, { id, videoId, isNow }, context) => {
      let data = await video.videoAllData(context);
      if (!!id) {
        return await video.getVideoDataById(data, id);
      } else if (!!videoId) {
        return video.getVideoDataByVideoId(data, videoId);
      } else if (isNow) {
        return video.getVideoDataByIsNow(data, isNow);
      } else {
        throw new UserInputError('not input');
      }
    },
    videoPagination: async (_, { index, limit }, context) => {
      let data = await video.videoAllData(context);
      return video.videoPagination(index, limit, data);
    },
    videoFilterByCategory: async (_, { category }, context) => {
      let data = await video.videoAllData(context);
      return video.videoFilterByCategory(category, data);
    },
  },
};

export default resolvers;
