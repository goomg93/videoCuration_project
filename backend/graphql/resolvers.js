import video from './video';
import { UserInputError } from 'apollo-server-express';

const resolvers = {
  Query: {
    videos: async (_, arg, context) => await video.videoAllData(context),
    video: async (_, { id, videoId }, context) => {
      let data = await video.videoAllData(context);
      if (id === undefined) {
        return video.getVideoDataByVideoId(data, videoId);
      } else if (videoId === undefined) {
        return await video.getVideoDataById(data, id);
      } else {
        throw new UserInputError('Not Input');
      }
    },
    videoPagination: async (_, { index, limit }, context) => {
      let data = await video.videoAllData();
      return video.videoPagination(index, limit, data);
    },
    videoFilterByCategory: async (_, { category }, context) => {
      let data = await video.videoAllData();
      return video.videoFilterByCategory(category, data);
    },
  },
};

export default resolvers;
