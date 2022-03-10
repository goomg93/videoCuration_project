import React, { useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import dataFetch from '../../hooks/useDataFetch';
import Thumbnail from './ListComponent/Thumbnail';
import styles from './List.module.css';

function List() {
  const observer = useRef();
  const dispatch = useDispatch();

  // state 정의
  const index = useSelector(state => state.ListStates.index);
  const limit = useSelector(state => state.ListStates.limit);
  const pagination = useSelector(state => state.ListStates.pagination);

  const {
    loading,
    error,
    data: datas,
    fetchMore,
  } = dataFetch.usePaginationFetch(index, limit);

  const ref = useCallback(
    node => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && pagination) {
          fetchMore({ variables: { index: index + 10, limit: limit } });
          dispatch({ type: 'List/setIndex' });
        }
      });
      if (node) node && observer.current.observe(node);
    },
    [pagination, dispatch, fetchMore, index, limit]
  );

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error To Render....</p>;

  return createPortal(
    <section className={styles.listBody}>
      <section className={styles.listArea}>
        <section className={styles.lists}>
          {datas?.videoPagination.map((data, index) => {
            if (datas.videoPagination.length - 3 === index) {
              return (
                <section className={styles.refSection} ref={ref} key={index}>
                  <Thumbnail
                    title={data.title}
                    thumbnails={data.thumbnails}
                    videoId={data.videoId}
                  />
                </section>
              );
            } else {
              return (
                <section className={styles.refSection} key={index}>
                  <Thumbnail
                    title={data.title}
                    thumbnails={data.thumbnails}
                    videoId={data.videoId}
                  />
                </section>
              );
            }
          })}
        </section>
      </section>
    </section>,
    document.getElementById('list-wrap')
  );
}

export default List;
