import { useEffect, useState, useRef } from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import Thumbnail from './ListComponent/Thumbnail';
import styles from './Main.module.css';

function Main() {
  const { loading, error, data, fetchMore } = useInfiniteScroll();
  const newIndex = useRef(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (loading === false && data) {
      console.log(data);
      newIndex.current = data.videoPagination.length + 1;
      if (data.videoPagination.length === data.videos.length) {
        setHasMore(false);
      }
    }
  });

  const getMore = () => {
    console.log('fetchmorestart');
    if (hasMore) {
      fetchMore({ variables: { index: newIndex.current } });
    }
  };

  return (
    <section className={styles.MainArea}>
      <section className={styles.ThumbnailList} align="left">
        {data?.videoPagination.map((data, index) => (
          <Thumbnail
            thumbnails={data.thumbnails}
            videoId={data.videoId}
            key={index}
          />
        ))}
      </section>
      <button className={styles.practiceButton} onClick={getMore}>
        get more
      </button>
    </section>
  );
}

export default Main;
