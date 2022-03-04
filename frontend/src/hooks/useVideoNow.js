import { useQuery, gql } from '@apollo/client';

const GET_VIDEO_NOW = gql`
  query {
    video(isNow: true) {
      id
      listTimestamp
      videoId
      title
    }
  }
`;
const useVideoNow = () => {
  const { loading, error, data, refetch } = useQuery(GET_VIDEO_NOW);

  if (loading) return loading;
  if (error) return error;

  return { loading, error, data, refetch };
};

export default useVideoNow;
