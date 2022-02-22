import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerModal from './PlayerModal';
import styles from './Thumbnail.module.css';

function Thumbnail({ thumbnails, videoId }) {
  const navigate = useNavigate();
  const [playerState, setPlayerState] = useState(false);

  const playerStateHandler = () => {
    if (!playerState) {
      return setPlayerState(true);
    } else return setPlayerState(false);
  };

  const goToDetail = videoId => {
    navigate('/');
  };

  return (
    <section
      className={styles.ThumbnailArea}
      onMouseEnter={playerStateHandler}
      onMouseLeave={playerStateHandler}
      onClick={goToDetail(videoId)}
    >
      <img className={styles.Thumbnails} src={thumbnails} alt="thumbnails" />
      {playerState ? <PlayerModal videoId={videoId} /> : null}
    </section>
  );
}

export default Thumbnail;
