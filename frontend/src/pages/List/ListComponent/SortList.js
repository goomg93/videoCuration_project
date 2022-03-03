import { gql, useQuery } from '@apollo/client';
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SortList.module.css';
import Thumbnail from './Thumbnail';
import * as gQuery from '../../../Global_Queries';

function SortList() {
  const params = useParams();
  const scrollRef = useRef();

  const { loading, error, data } = useQuery(gQuery.GET_SORT_LIST, {
    variables: { category: params.category.toUpperCase() },
  });

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error To Render</p>;

  const onDragStart = e => {
    console.log('pageX :', e.pageX);
    console.log('scrollRef :', scrollRef);
  };

  return (
    <section className={styles.listBody}>
      <section className={styles.listArea} onMouseDown={onDragStart}>
        <section className={styles.lists}>
          {data?.videoFilterByCategory.map((data, index) => (
            <Thumbnail
              thumbnails={data.thumbnails}
              videoId={data.videoId}
              title={data.title}
              key={index}
            />
          ))}
        </section>
      </section>
    </section>
  );
}

export default SortList;
