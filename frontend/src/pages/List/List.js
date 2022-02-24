import { useEffect, useRef, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Thumbnail from './ListComponent/Thumbnail';
import styles from './List.module.css';

const GET_LIST = gql`
  query VideoPagination($index: Int!, $limit: Int!) {
    videoPagination(index: $index, limit: $limit) {
      id
      videoId
      thumbnails
    }
  }
`;

function List() {
  const [hasMore, setHasMore] = useState(false);
  const index = useRef(1);
  const limit = 15;

  const { loading, error, data, fetchMore } = useQuery(GET_LIST, {
    variables: { index: 1, limit: 15 },
    notifyOnNetworkStatusChange: true,
  });
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error To Render</p>;
  if (data) {
    const dataLength = data?.videoPagination.length;
    index.current = index.current + dataLength;
    if (dataLength < limit) {
      setHasMore(false);
    }
  }
  return (
    <section className={styles.ListArea}>
      {data?.videoPagination.map((data, index) => (
        <Thumbnail
          className={styles.Thumbnail}
          thumbnails={data.thumbnails}
          videoId={data.videoId}
          key={index}
        />
      ))}
    </section>
  );
}

export default List;
