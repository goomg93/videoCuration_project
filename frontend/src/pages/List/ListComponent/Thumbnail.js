import React, { useState } from 'react';
import PlayerModal from './PlayerModal';
import styles from './Thumbnail.module.css';

function Thumbnail({ title, thumbnails, videoId }) {
  const [playerState, setPlayerState] = useState(false);

  const playerStateHandler = () => {
    return setPlayerState(!playerState);
  };

  return (
    <section
      className={styles.ThumbnailArea}
      onMouseEnter={playerStateHandler}
      onMouseLeave={playerStateHandler}
    >
      <section className={styles.ThumbnailContainer}>
        <img className={styles.Thumbnails} src={thumbnails} alt="thumbnails" />
        <p>{title}</p>
        {playerState ? (
          <PlayerModal
            videoId={videoId}
            playerState={playerState}
            setPlayerState={setPlayerState}
          />
        ) : null}
      </section>
    </section>
  );
}

export default Thumbnail;
