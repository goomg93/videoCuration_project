import { useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { BsPlayBtn, BsPauseBtn } from 'react-icons/bs';
import dataFetch from '../../hooks/useDataFetch';
import styles from './PlayerLayer.module.css';

const PlayerLayer = () => {
  const { loading, error, data, refetch } = dataFetch.useLiveVideo();
  const youtubePlayer = useRef(null);
  const [playtime, setPlaytime] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  const opts = {
    playerVars: {
      autoplay: 1,
      start: data?.video.listTimestamp,
      playlist: data?.video.videoId,
      disablekb: true,
      loop: 1,
      rel: 0,
      mute: 1,
      // controls: 0,
      modestbranding: 1,
      origin: 'http://localhost:3000/',
    },
  };

  const handlePlayer = () => {
    if (isPlaying) {
      youtubePlayer.current.internalPlayer.pauseVideo();
      setIsPlaying(false);
    } else if (!isPlaying) {
      refetch();
      youtubePlayer.current.internalPlayer.playVideo();
      setIsPlaying(true);
    }
  };

  const onReady = e => {
    e.target.playVideo();
    e.target.unMute();
    setIsPlaying(true);
  };

  const onEnd = e => {
    e.target.playVideo();
  };

  const handlePlaybackRate = e => {
    e.target.setPlaybackRate(1);
  };

  return (
    <div className={styles.playerContainer}>
      <div className={styles.playerClickArea} onClick={handlePlayer}>
        {isPlaying ? (
          <BsPauseBtn className={styles.playButton} />
        ) : (
          <BsPlayBtn className={styles.playButton} />
        )}
      </div>
      <YouTube
        containerClassName={styles.youtubeWrapper}
        className={styles.youtube}
        videoId={data?.video.videoId}
        opts={opts}
        onReady={onReady}
        onEnd={onEnd}
        onPlaybackRateChange={handlePlaybackRate}
        ref={youtubePlayer}
      />
    </div>
  );
};

export default PlayerLayer;
