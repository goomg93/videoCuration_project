import { gql } from 'apollo-server-express';
import dotenv from 'dotenv';

dotenv.config();

const typeDefs = gql`
  type Query {
    videos: [Video]!
    video(id: Int!): Video!
  }

  type Video {
    id: Int!
    ts: Int!
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
