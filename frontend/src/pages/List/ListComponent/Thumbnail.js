import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import PlayerModal from './PlayerModal';
import styles from './Thumbnail.module.css';

function Thumbnail({ title, thumbnails, videoId }) {
  // const dispatch = useDispatch();
  const [player, setPlayer] = useState(false);
  const [ppreview, setPpreview] = useState(true);

  const playerHandler = () => {
    // dispatch({ type: 'PlayerModal/setPreview', payload: true });
    setPpreview(true);
    return setPlayer(!player);
  };

  return (
    <section className={styles.ThumbnailArea}>
      <section className={styles.ThumbnailContainer}>
        <img
          className={styles.Thumbnails}
          src={thumbnails}
          alt="thumbnails"
          onMouseEnter={playerHandler}
        />
        <p className={styles.Title}>{title}</p>
        {player ? (
          <PlayerModal
            videoId={videoId}
            playerHandler={playerHandler}
            ppreview={ppreview}
            setPpreview={setPpreview}
          />
        ) : null}
      </section>
    </section>
  );
}

export default Thumbnail;
