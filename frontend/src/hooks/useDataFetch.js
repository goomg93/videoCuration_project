import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import * as gQuery from '../Global_Queries';

const useFirstVideoId = () => {
  const { loading, error, data } = useQuery(gQuery.GET_FIRST_VIDEO_ID, {
    variables: { videoId: 1 },
    fetchPolicy: 'network-only',
  });

  return { loading, error, data };
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

const useVerticalScroll = () => {
  const index = 1;
  const limit = 10;

  const { loading, error, data, fetchMore } = useQuery(gQuery.GET_LIST_SCROLL, {
    variables: { index: index, limit: limit },
  });

  return { loading, error, data, fetchMore };
};
const useCategoryFetch = () => {
  const { loading, error, data } = useQuery(gQuery.GET_LIST);

  if (loading) return loading;
  if (error) return error;

  return { loading, error, data };
};

const useLiveVideo = () => {
  const { loading, error, data, refetch } = useQuery(gQuery.GET_LIVE_VIDEO);

  if (loading) return loading;
  if (error) return error;

  return { loading, error, data, refetch };
};

const Fetchs = {
  useFirstVideoId,
  usePaginationFetch,
  useVerticalScroll,
  useLiveVideo,
  useCategoryFetch,
};

export default Fetchs;
