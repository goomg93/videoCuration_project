import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlayerSingle from '../../components/Player/PlayerSingle';
import PlayerLayer from '../../components/PlayerLayer/PlayerLayer';

import styles from './Detail.module.css';
import '../../styles/reset.css';
import '../../styles/common.css';

const Detail = () => {
  const params = useParams();
  const type = params.type;
  const videoId = params.videoId;
  const [single, setSingle] = useState(false);
  const [layer, setLayer] = useState(false);

  useEffect(() => {
    if (type === 'video') {
      setSingle(true);
    } else if (type === 'layer') {
      setLayer(true);
    }
  }, [type]);

  return (
    <section className={styles.Detail}>
      {single && (
        <>
          <h1 className={styles.heading}>USING NPM REACT-YOUTUBE</h1>
          <main className={styles.mainWrapper}>
            <PlayerSingle className={styles.player} videoId={videoId} />
          </main>
        </>
      )}
      {layer && (
        <>
          <h1 className={styles.heading}>LAYER APPROACH </h1>
          <h1 className={styles.heading}>WITH REACT-YOUTUBE</h1>

          <main className={styles.mainWrapper}>
            <PlayerLayer className={styles.player} videoId={videoId} />
          </main>
        </>
      )}
    </section>
  );
};

export default Detail;
