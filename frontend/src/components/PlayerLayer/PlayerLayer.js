import { useRef, useState } from 'react';
import YouTube from 'react-youtube';
import styles from './PlayerLayer.module.css';

const PlayerLayer = ({ data, refetch }) => {
  const { timestamp, videoId } = data;
  const youtubePlayer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const opts = {
    playerVars: {
      autoplay: 1,
      start: timestamp,
      playlist: videoId,
      disablekb: true,
      loop: 1,
      rel: 0,
      mute: 1,
      controls: 0,
      modestbranding: 1,
      origin: 'http://localhost:3000/',
    },
  };

  const handlePlayer = () => {
    console.log('clicked');
    if (isPlaying) {
      youtubePlayer.current.internalPlayer.pauseVideo();
      setIsPlaying(false);
    } else if (!isPlaying) {
      refetch();
      youtubePlayer.current.internalPlayer.playVideo();
      setIsPlaying(true);
    }
    console.log(youtubePlayer.current);
  };
  const onReady = e => {
    e.target.playVideo();
    e.target.unMute();
    setIsPlaying(true);
  };

  const onPlay = e => {
    // setIsPlaying(true);
    // console.log(e);
    // const currentPlayTime = e.target.getCurrentTime();
    // e.target.seekTo(currentPlayTime);
  };

  // const onPause = () => {
  //   handlePlayer();
  // };

  const onEnd = e => {
    e.target.playVideo();
  };

  const handlePlaybackRate = e => {
    e.target.setPlaybackRate(1);
  };

  return (
    <>
      <div className={styles.playerClickArea} onClick={handlePlayer} />
      <YouTube
        containerClassName={styles.youtubeWrapper}
        className={styles.youtube}
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onPlay={onPlay}
        // onPause={onPause}
        onEnd={onEnd}
        onPlaybackRateChange={handlePlaybackRate}
        ref={youtubePlayer}
      />
    </>
  );
};

export default PlayerLayer;
