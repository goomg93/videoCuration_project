import { useEffect, useState, useRef } from 'react';
import useDataFetch from '../../hooks/useDataFetch';
import Thumbnail from './SubComponent/Thumbnail';
import styles from './Sub.module.css';

function Sub() {
  const { loading, error, data, fetchMore } = useDataFetch();
  const newIndex = useRef(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (loading === false && data) {
      newIndex.current = data.videoPagination.length + 1;
      if (data.videoPagination.length === data.videos.length) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [data, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && !loading) {
      if (hasMore) {
        fetchMore({ variables: { index: newIndex.current } });
      }
    }
  };

  return (
    <section className={styles.ListArea}>
      <section className={styles.ThumbnailList} align="left">
        {data?.videoPagination.map((data, index) => (
          <Thumbnail
            thumbnails={data.thumbnails}
            videoId={data.videoId}
            key={index}
          />
        ))}
      </section>
    </section>
  );
}

export default Sub;
