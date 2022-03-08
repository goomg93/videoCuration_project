import { gql } from '@apollo/client';

// Header.js 네브 바에 쇼트컷용 쿼리
export const GET_FIRST_VIDEO_ID = gql`
  query Video($videoId: Int) {
    video(id: $videoId) {
      youtubeId: videoId
    }
  }
`;

// 카테고리 필터 리스트
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
// 가로 무한스크롤
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

//세로 무한스크롤
export const GET_LIST_SCROLL = gql`
  query VideoPagination($index: Int!, $limit: Int!) {
    videoPagination(index: $index, limit: $limit) {
      id
      videoId
      thumbnails
    }
    videos {
      id
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

//실시간 재생중인 영상 쿼리
export const GET_LIVE_VIDEO = gql`
  query {
    video(isNow: true) {
      id
      listTimestamp
      videoId
      title
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    videos {
      category
    }
  }
`;
