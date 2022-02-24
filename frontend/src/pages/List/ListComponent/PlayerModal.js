import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery, gql, NetworkStatus } from '@apollo/client';
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
  const navigate = useNavigate();

  const [autoPlay, setAutoPlay] = useState(false);

  const { loading, error, data, networkStatus } = useQuery(GET_VIDEO_INFO, {
    variables: { videoId: videoId },
    // notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  if (loading) {
    console.log(`${loading}`);
    return <p>Keep Hovering On Player</p>;
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
      start: data.video.timestamp,
      disablekb: true,
      controls: 0,
      mute: 1,
    },
  };

  const playerOnReady = e => {
    e.target.playVideo();
  };

  const goToDetail = videoId => {
    navigate(`/video/${videoId}`);
  };

  console.log('timeStamp: ', data.video.timestamp);

  return (
    <section
      className={styles.PlayerModalArea}
      onClick={() => goToDetail(videoId)}
    >
      <section className={styles.CoverVideo}></section>
      <YouTube videoId={videoId} opts={opts} onReady={playerOnReady} />
    </section>
  );
}

export default PlayerModal;
