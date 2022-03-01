import { useState } from 'react';
import YouTube from 'react-youtube';
import styles from './Player.module.css';

const PlayerSingle = ({ videoId }) => {
  const opts = {
    playerVars: {
      autoplay: 1,
      playlist: videoId,
      loop: 1,
      rel: 0,
      mute: 1,
      modestbranding: 1,
      origin: 'http://localhost:3000/',
    },
  };

  return (
    <YouTube
      containerClassName={styles.youtubeWrapper}
      className={styles.youtube}
      videoId={videoId}
      opts={opts}
      onReady={e => {
        e.target.playVideo();
        e.target.unMute();
      }}
      onEnd={e => {
        e.target.playVideo();
      }}
    />
  );
};

export default PlayerSingle;
