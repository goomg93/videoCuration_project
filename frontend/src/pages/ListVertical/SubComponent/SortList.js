import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './SortList.module.css';
import Thumbnail from './Thumbnail';

function SortList() {
  const params = useParams();

  const GET_SORT_LIST = gql`
    query GetList($category: String!) {
      videoFilterByCategory(category: $category) {
        videoId
        thumbnails
        category
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_SORT_LIST, {
    variables: { category: params.category.toUpperCase() },
  });

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error To Render</p>;

  return (
    <section className={styles.ListArea}>
      <section className={styles.ThumbnailList}>
        {data?.videoFilterByCategory.map((data, index) => (
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

export default SortList;
