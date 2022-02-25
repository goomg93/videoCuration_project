import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Thumbnail from './ListComponent/Thumbnail';
import styles from './List.module.css';
import Category from './ListComponent/Category';
import { useParams } from 'react-router-dom';

const GET_LIST = gql`
  query GetList {
    videos {
      videoId
      thumbnails
      category
    }
  }
`;

function List() {
  const params = useParams();
  console.log('params: ', params);
  const { loading, error, data } = useQuery(GET_LIST);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error To Render</p>;

  console.log('dataLength : ', data?.videos.length);

  const categorys = [];
  if (data?.videos.length > 0) {
    for (let i = 0; i < data.videos.length; i++) {
      for (let j = 0; j < data.videos[i].category.length; j++) {
        categorys.push(data.videos[i].category[j]);
      }
    }
  }

  const checker = [...new Set(categorys)];

  return (
    <section className={styles.ListArea}>
      <Category categorys={checker} />
      <section className={styles.ThumbnailList}>
        {data?.videos.map((data, index) => (
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

export default List;
