import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import styles from './Player.module.css';

const Player = ({ data, refetch, isPlaying }) => {
  const { timestamp, videoId } = data;
  const [playerState, setPlayerState] = useState(-1);

  useEffect(() => {
    if (playerState === 1 && !isPlaying.current) {
      console.log('useEffect playerState1');
      refetch();
    } else if (playerState === 2) {
      console.log('useEffect playerState2');
      isPlaying.current = false;
    }
  }, [playerState, isPlaying, refetch]);

  const opts = {
    playerVars: {
      autoplay: 1,
      start: timestamp,
      playlist: videoId,
      loop: 1,
      rel: 0,
      mute: 1,
      modestbranding: 1,
      origin: 'http://localhost:3000/',
    },
  };

  const onReady = e => {
    e.target.playVideo();
    e.target.unMute();
  };

  const handlePlaybackRate = e => {
    e.target.setPlaybackRate(1);
  };

  return (
    <YouTube
      containerClassName={styles.youtubeWrapper}
      className={styles.youtube}
      videoId={videoId}
      opts={opts}
      onReady={onReady}
      onPlay={e => {
        setPlayerState(e.data);
      }}
      onPause={e => {
        setPlayerState(e.data);
      }}
      onEnd={e => {
        e.target.playVideo();
      }}
      onPlaybackRateChange={handlePlaybackRate}
      onStateChange={e => console.log(e.data)}
    />
  );
};

export default Player;
