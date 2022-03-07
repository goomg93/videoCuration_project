import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import useVideoNow from '../../hooks/useVideoNow';
import styles from './PlayerLive.module.css';

const PlayerLive = ({ isPlaying }) => {
  const { loading, error, data, refetch } = useVideoNow();
  const [playtime, setPlaytime] = useState({});

  useEffect(() => {
    const timestampSeconds = data?.video.listTimestamp;
    const hour = Math.floor(timestampSeconds / 60 / 60);
    const min = Math.floor((timestampSeconds - 60 * 60 * hour) / 60);
    const sec = Math.floor((timestampSeconds - 60 * 60 * hour - 60 * min) % 60);
    setPlaytime({ hour, min, sec });
  }, [data]);

  const [playerState, setPlayerState] = useState(-1);

  useEffect(() => {
    if (playerState === 1 && !isPlaying.current) {
      refetch();
    } else if (playerState === 2) {
      isPlaying.current = false;
    } else if (playerState === 3) {
    }
  }, [playerState, isPlaying, refetch]);

  const opts = {
    playerVars: {
      autoplay: 1,
      start: data?.video.listTimestamp,
      playlist: data?.video.videoId,
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

  return (
    <YouTube
      containerClassName={styles.youtubeWrapper}
      className={styles.youtube}
      videoId={data?.video.videoId}
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
      onStateChange={console.log('statechange')}
    />
  );
};

export default PlayerLive;
