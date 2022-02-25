import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import PlayerReact from '../../components/PlayerReact/PlayerReact';
import styles from './DetailReact.module.css';
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

  if (loading) {
    return <h1>Loading...........!</h1>;
  }
  if (error) {
    console.log(error);
  }

  const timestampSeconds = videoData.video.timestamp;

  const hour = Math.floor(timestampSeconds / 60 / 60);
  const min = Math.floor((timestampSeconds - 60 * 60 * hour) / 60);
  const sec = Math.floor((timestampSeconds - 60 * 60 * hour - 60 * min) % 60);

  return (
    <section className={styles.Detail}>
      <h1 className={styles.heading}>USING NPM REACT-PLAYER</h1>
      <h2>
        Server timestamp: {hour && <span>{hour} 시간 </span>} {min} 분 {sec} 초
      </h2>
      <main className={styles.mainWrapper}>
        <PlayerReact
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
