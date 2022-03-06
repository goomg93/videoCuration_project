import { useQuery, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import * as gQuery from '../Global_Queries';

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

const useDataFetch = () => {
  const index = 1;
  const limit = 10;

  const { loading, error, data, fetchMore } = useQuery(GET_LIST, {
    variables: { index: index, limit: limit },
  });

  if (loading) return loading;
  if (error) return error;

  return { loading, error, data, fetchMore };
};

const usePaginationFetch = (index, limit) => {
  const dispatch = useDispatch();
  const { loading, error, data, fetchMore } = useQuery(
    gQuery.GET_LIST_PAGINATION,
    {
      variables: { index: index, limit: limit },
    }
  );

  if (loading) return loading;
  if (error) return error;

  if (data?.videoPagination.length - 10 === index) {
    dispatch({ type: 'List/setPagination', payload: true });
  } else dispatch({ type: 'List/setPagination', payload: false });
  return { loading, error, data, fetchMore };
};

const Fetchs = {
  useDataFetch,
  usePaginationFetch,
};

export default Fetchs;
