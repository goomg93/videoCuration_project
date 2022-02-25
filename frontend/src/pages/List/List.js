import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Thumbnail from './ListComponent/Thumbnail';
import styles from './List.module.css';

function List() {
  const GET_LIST = gql`
    query GetList {
      videos {
        videoId
        title
        thumbnails
        category
        description
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_LIST);
  if (loading) return <p>Loading....</p>;
  if (error) {
    console.log(error);
    return <p>Error To Render</p>;
  }

  return (
    <section className={styles.ListArea}>
      <section className={styles.ThumbnailList}>
        {data?.videos.map((data, index) => (
          <Thumbnail
            // title={data.title}
            thumbnails={data.thumbnails}
            videoId={data.videoId}
            key={index}
          />
        ))}
      </section>
    </section>
  );
}

export default List;
