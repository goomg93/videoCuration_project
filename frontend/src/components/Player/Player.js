import YouTube from 'react-youtube';
import styles from './Player.module.css';

const Player = ({ data, refetch }) => {
  const { timestamp, videoId } = data;

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

  const handleChange = e => {
    console.log('stateChanged');
    console.log(e);
    if (e.data === 1) {
      console.log('state changed to PLAYING');
      refetch();
      e.target.unMute();
    }
    if (e.data === 2) {
    }
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
      onStateChange={handleChange}
      onPlaybackRateChange={handlePlaybackRate}
    />
  );
};

export default Player;
