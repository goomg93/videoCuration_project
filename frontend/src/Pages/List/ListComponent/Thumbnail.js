import React, { useState } from 'react';

import PlayerModal from './PlayerModal';
import styles from './Thumbnail.module.css';

function Thumbnail({ thumbnails, videoId }) {
  const [playerState, setPlayerState] = useState(false);

  const playerStateHandler = () => {
    if (!playerState) {
      return setPlayerState(true);
    } else return setPlayerState(false);
  };

  return (
    <section
      className={styles.ThumbnailArea}
      onMouseEnter={playerStateHandler}
      onMouseLeave={playerStateHandler}
    >
      <img className={styles.Thumbnails} src={thumbnails} alt="thumbnails" />
      {playerState ? <PlayerModal videoId={videoId} /> : null}
    </section>
  );
}

export default Thumbnail;
