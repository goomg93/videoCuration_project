import { gql } from 'apollo-server-express';
import dotenv from 'dotenv';

dotenv.config();

const typeDefs = gql`
  type Query {
    videos: [Video]!
    video(id: Int, videoId: String): Video!
    videoPagination(index: Int!, limit: Int!): [Video]
  }

  type Video {
    id: Int!
    timestamp: Int!
    durationSeconds: Int!
    publishedAt: String!
    description: String!
    videoId: String!
    likeCount: String!
    nations: [String]!
    dailyViewCount: Int!
    title: String!
    commentCount: String!
    viewCount: String!
    thumbnails: String!
    category: [String]!
    channelId: String!
  }
`;

export default typeDefs;
