import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import YouTube from 'react-youtube';
import styles from './PlayerModal.module.css';

const GET_VIDEO_INFO = gql`
  query VideoInfo($videoId: String!) {
    video(videoId: $videoId) {
      timestamp
    }
  }
`;

function PlayerModal({ videoId }) {
  const [autoPlay, setAutoPlay] = useState(true);

  const { loading, error, data, networkStatus } = useQuery(GET_VIDEO_INFO, {
    variables: { videoId: videoId },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    console.log(`${loading}`);
    return <p>Loading....</p>;
  }
  if (error) {
    console.log(`${error}`);
    return <p>error to render....</p>;
  }

  const opts = {
    width: 384,
    height: 216,
    playerVars: {
      // autoPlay => true: 자동재생
      // disablekb => true: 플레이어 컨트롤 block
      // controls => 0: 플레이어 컨트롤 unvisible
      autoplay: autoPlay,
      disablekb: true,
      controls: 1,
      mute: 1,
    },
  };

  const playerOnReady = (e, timestamp) => {
    e.target.seekTo(timestamp);
  };

  console.log('data: ', data);
  console.log('timeStamp: ', data.video.timestamp);

  return (
    <section className={styles.PlayerModalArea}>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={playerOnReady.bind(data.video.timestamp)}
      />
    </section>
  );
}

export default PlayerModal;
