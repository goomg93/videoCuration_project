import React, { useRef, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import Thumbnail from './ListComponent/Thumbnail';
import styles from './List.module.css';
import * as gQuery from '../../Global_Queries';
import { useDispatch, useSelector } from 'react-redux';

function List() {
  // const scrollLeft = document.body.offsetWidth;
  const observer = useRef();
  const dispatch = useDispatch();

  // state 정의
  const index = useSelector(state => state.ListStates.index);
  const limit = useSelector(state => state.ListStates.limit);
  const pagination = useSelector(state => state.ListStates.pagination);

  const ref = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && pagination) {
        fetchMore({ variables: { index: index + 10, limit: limit } });
        dispatch({ type: 'List/setIndex' });
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const {
    loading,
    error,
    data: datas,
    fetchMore,
  } = useQuery(gQuery.GET_LIST_PAGINATION, {
    variables: { limit: parseInt(limit), index: parseInt(index) },
  });

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error To Render....</p>;

  return (
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
    </section>
  );
}

export default List;
