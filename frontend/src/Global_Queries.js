import { gql } from '@apollo/client';

export const GET_LIST_PAGINATION = gql`
  query ($limit: Int!, $index: Int!) {
    videoPagination(limit: $limit, index: $index) {
      id
      videoId
      thumbnails
      title
    }
  }
`;

export const GET_LIST = gql`
  query GetList {
    videos {
      videoId
      title
      thumbnails
      category
      description
    }
  }
`;

export const GET_VIDEO_INFO = gql`
  query VideoInfo($videoId: String!) {
    video(videoId: $videoId) {
      listTimestamp
    }
  }
`;

export const GET_SORT_LIST = gql`
  query GetList($category: String!) {
    videoFilterByCategory(category: $category) {
      videoId
      thumbnails
      category
      title
    }
  }
`;
