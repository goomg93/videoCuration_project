import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import styles from './Player.module.css';

const Player = ({ data, refetch, isPlaying }) => {
  const { timestamp, videoId } = data;
  const [playerState, setPlayerState] = useState(-1);

  useEffect(() => {
    if (playerState === 1 && !isPlaying.current) {
      console.log('refetched');
      refetch();
    } else if (playerState === 2) {
      console.log('useEffect playerState2');
      isPlaying.current = false;
    } else if (playerState === 3) {
      console.log('useEffect playerState3');
    }
  }, [playerState, isPlaying, refetch]);

  const opts = {
    playerVars: {
      autoplay: 1,
      start: timestamp,
      playlist: videoId,
      disablekb: true,
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

  const onStateChange = e => {
    // setBuffered(false);
    // setUnstarted(false);
    console.log(e.data);
    // if (e.data === -1) {
    // setUnstarted(true);
    // } else if (e.data === 3) {
    //   setBuffered(true);
    // }
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
      onStateChange={onStateChange}
    />
  );
};

export default Player;
