import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Thumbnail from './ListComponent/Thumbnail';
import styles from './List.module.css';

const GET_LIST = gql`
  query GetList {
    videos {
      videoId
      thumbnails
    }
  }
`;

function List() {
  const [list, setList] = useState('');
  const [listAmt, setListAmt] = useState(10);

  const { loading, error, data, networkStatus } = useQuery(GET_LIST, {
    variables: listAmt,
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error To Render</p>;

  console.log('networkStatus :', networkStatus);
  console.log('dataLength : ', data?.videos.length);

  return (
    <section className={styles.ListArea}>
      {data?.videos.map((data, index) => (
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
