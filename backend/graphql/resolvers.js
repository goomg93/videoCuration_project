import { getVideoDataById, videoAllData } from './video';

const resolvers = {
  Query: {
    videos: async () => await videoAllData(),
    video: async (_, { id }, context) => await getVideoDataById(id, context),
  },
};

export default resolvers;
