import React, { useRef } from 'react';
import { useQuery } from '@apollo/client';
import Thumbnail from './ListComponent/Thumbnail';
import styles from './List.module.css';
import * as gQuery from '../../Global_Queries';
import { useDispatch, useSelector } from 'react-redux';

function List() {
  const scrollRef = useRef();
  const dispatch = useDispatch();

  // state 정의
  const index = useSelector(state => state.ListStates.index);
  const limit = useSelector(state => state.ListStates.limit);

  const { loading, error, data, fetchMore } = useQuery(
    gQuery.GET_LIST_PAGINATION,
    {
      variables: { limit: parseInt(limit), index: parseInt(index) },
    }
  );

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error To Render....</p>;

  const onDragStart = e => {
    console.log('pageX :', e.pageX);
    console.log('scrollRef :', scrollRef);
  };

  const addData = () => {
    fetchMore({ variables: { index: index + 10, limit: limit } });
    dispatch({ type: 'List/setIndex' });
  };

  return (
    <section className={styles.listBody}>
      <section className={styles.listArea} onMouseDown={onDragStart}>
        <section className={styles.lists}>
          {data?.videoPagination.map((data, index) => (
            <Thumbnail
              title={data.title}
              thumbnails={data.thumbnails}
              videoId={data.videoId}
              key={index}
            />
          ))}
        </section>
      </section>
      <button onClick={addData}>데이터 추가</button>
    </section>
  );
}

export default List;
