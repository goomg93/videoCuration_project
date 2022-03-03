import { useState, useRef, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

import PlayerPlaylist from '../../components/Player/PlayerPlaylist';

import styles from './DetailLive.module.css';
import '../../styles/reset.css';
import '../../styles/common.css';

const GET_LIST = gql`
  query GetList {
    videos {
      id
      videoId
      title
      thumbnails
      category
      description
      isNow
      listTimestamp
    }
  }
`;

const DetailLive = () => {
  const isPlaying = useRef(false);

  const { loading, error, data: videoData, refetch } = useQuery(GET_LIST);
  if (loading) return <p>Loading....</p>;
  if (error) {
    return <p>Error To Render</p>;
  }

  isPlaying.current = true;

  if (loading) return <p className={styles.message}>Loading....</p>;
  if (error) return <p className={styles.message}>Error To Render</p>;

  const timestampSeconds = videoData.video.timestamp;
  const hour = Math.floor(timestampSeconds / 60 / 60);
  const min = Math.floor((timestampSeconds - 60 * 60 * hour) / 60);
  const sec = Math.floor((timestampSeconds - 60 * 60 * hour - 60 * min) % 60);

  return (
    <section className={styles.Playlist}>
      <h1 className={styles.heading}>PLAYLIST</h1>
      <h2>
        Server Timestamp: {hour && <span>{hour} 시간 </span>} {min} 분 {sec} 초
      </h2>
      <main className={styles.mainWrapper}>
        <PlayerPlaylist
          className={styles.player}
          data={videoData.video}
          refetch={refetch}
          isPlaying={isPlaying}
        />
      </main>
    </section>
  );
};

export default DetailLive;
