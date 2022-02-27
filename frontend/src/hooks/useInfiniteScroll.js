import { useQuery, gql } from '@apollo/client';

const GET_LIST = gql`
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

const useInfiniteScroll = () => {
  const index = 1;
  const limit = 10;

  const { loading, error, data, fetchMore } = useQuery(GET_LIST, {
    variables: { index: index, limit: limit },
  });

  console.log('infinitescroll');
  if (loading) return loading;
  if (error) return error;

  return { loading, error, data, fetchMore };
};

export default useInfiniteScroll;