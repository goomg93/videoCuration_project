import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { BsPlayBtn, BsPauseBtn } from 'react-icons/bs';
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
      fs: 0,
      // controls: 0,
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
    e.target.unMute();
    setIsPlaying(true);
  };

  const onPlay = e => {
    setInterval(() => {
      if (document.querySelectorAll('.ad-showing').length > 0) {
        const video = document.querySelector('video');
        if (video) {
          video.currentTime = video.duration;
        }
      }
    }, 500);
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
      <div className={styles.playerClickArea} onClick={handlePlayer}>
        {isPlaying ? (
          <BsPauseBtn className={styles.playButton} size="10x" />
        ) : (
          <BsPlayBtn className={styles.playButton} size="10x" />
        )}
        <span className={styles.extendedArea} />
      </div>
    </>
  );
};

export default PlayerLayer;
