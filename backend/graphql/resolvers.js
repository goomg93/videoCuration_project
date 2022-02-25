import video from './video';
import authentication from '../middleware/auth';

const resolvers = {
  Query: {
    videos: async () => await video.videoAllData(),
    video: async (_, { id, videoId }, context) => {
      authentication(context);
      let data = await video.videoAllData();
      if (id === undefined) {
        return video.getVideoDataByVideoId(data, videoId);
      } else if (videoId === undefined) {
        return video.getVideoDataById(data, id);
      } else {
        throw new Error('not input');
      }
    },
    videoPagination: async (_, { index, limit }, context) => {
      authentication(context);
      let data = await video.videoAllData();
      return video.videoPagination(index, limit, data);
    },
    videoFilterByCategory: async (_, { category }, context) => {
      authentication(context);
      let data = await video.videoAllData();
      return video.videoFilterByCategory(category, data);
    },
  },
};

export default resolvers;
