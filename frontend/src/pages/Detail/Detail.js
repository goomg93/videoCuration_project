import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import Player from '../../components/Player/Player';

import styles from './Detail.module.css';
import '../../styles/reset.css';
import '../../styles/common.css';

const GET_VIDEO_INFO = gql`
  query VideoInfo($videoId: String!) {
    video(videoId: $videoId) {
      title
      videoId
      timestamp
    }
  }
`;

const Detail = () => {
  const params = useParams();
  const videoId = params.videoId;
  const isPlaying = useRef(false);

  const {
    data: videoData,
    loading,
    error,
    refetch,
  } = useQuery(GET_VIDEO_INFO, {
    variables: { videoId: String(videoId) },
    fetchPolicy: 'network-only',
  });

  isPlaying.current = true;

  if (loading) return <p className={styles.message}>Loading....</p>;
  if (error) return <p className={styles.message}>Error To Render</p>;

  const timestampSeconds = videoData.video.timestamp;
  const hour = Math.floor(timestampSeconds / 60 / 60);
  const min = Math.floor((timestampSeconds - 60 * 60 * hour) / 60);
  const sec = Math.floor((timestampSeconds - 60 * 60 * hour - 60 * min) % 60);

  return (
    <section className={styles.Detail}>
      <h1 className={styles.heading}>USING NPM REACT-YOUTUBE</h1>
      <h2>
        Server Timestamp: {hour && <span>{hour} 시간 </span>} {min} 분 {sec} 초
      </h2>
      <main className={styles.mainWrapper}>
        <Player
          className={styles.player}
          data={videoData.video}
          refetch={refetch}
          isPlaying={isPlaying}
        />
      </main>
    </section>
  );
};

export default Detail;
