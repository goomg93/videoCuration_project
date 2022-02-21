import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import YouTube from 'react-youtube';
import styles from './List.module.css';

const GET_LIST = gql`
  query GetList {
    videos {
      videoId
      thumbnails
      durationSeconds
      ts
    }
  }
`;

function List() {
  const [list, setList] = useState([]);
  const { loading, error, data } = useQuery(GET_LIST);
  console.log(data);
  if (loading) console.log(`loading: `, loading);
  if (error) console.log(`error: `, error);

  return (
    <section>
      {data?.videos.map(data => (
        <section className="slist">
          <img src={data.thumbnails} alt="thumbnails" />
          {/* <YouTube videoId={data.videoId} /> */}
        </section>
      ))}
    </section>
  );
}

export default List;
