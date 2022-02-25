import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import styles from './PlayerReact.module.css';

const PlayerReact = ({ data, refetch, isPlaying }) => {
  const reactPlayer = useRef(null);
  const [playerState, setPlayerState] = useState(-1);
  const { timestamp, videoId } = data;

  useEffect(() => {
    if (playerState === 1 && !isPlaying.current) {
      console.log('useEffect playerState1');
      refetch();
    } else if (playerState === 2) {
      console.log('useEffect playerState2');
      isPlaying.current = false;
    }
  }, [playerState, isPlaying, refetch]);

  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const config = {
    playerVars: {
      autoplay: 1,
      start: timestamp,
      playlist: videoId,
      loop: 1,
      rel: 0,
      controls: 1,
      volume: 1,
      muted: 1,
      modestbranding: 1,
      origin: 'http://localhost:3000/',
      disablekb: 1,
    },
  };

  const onPlay = () => {
    console.log('played');
  };

  const onPause = () => {
    console.log(reactPlayer.current.getPlayerState);
    console.log(reactPlayer.current.getInternalPlayer());
  };
  return (
    <div className={styles.reactPlayerWrapper}>
      <ReactPlayer
        ref={reactPlayer}
        className="reactPlayer"
        width="100%"
        height="100%"
        url={url}
        config={config}
        playing
        onProgress={(played, loaded) => {
          // console.log(played, loaded);
        }}
        onPlay={onPlay}
        onPause={onPause}
      />
    </div>
  );
};

export default PlayerReact;

// containerClassName={styles.youtubeWrapper}
// className={styles.youtube}
// videoId={videoId}
// opts={opts}
// onReady={onReady}
// onPlay={e => {
//   setPlayerState(e.data);
// }}
// onPause={e => {
//   setPlayerState(e.data);
// }}
// onEnd={e => {
//   e.target.playVideo();
// }}
// onPlaybackRateChange={handlePlaybackRate}
// onStateChange={e => console.log(e.data)}
