import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Player from '../../components/Player/Player';
import PlayerLive from '../../components/PlayerLive/PlayerLive';
import PlayerLayer from '../../components/PlayerLayer/PlayerLayer';

import useLiveChat from '../../hooks/useLiveChat';
import LiveChat from '../../components/LiveChat/LiveChat';

import styles from './Detail.module.css';
import '../../styles/reset.css';
import '../../styles/common.css';

const DetailLive = () => {
  const { socket } = useLiveChat();
  const navigate = useNavigate();
  const params = useParams();
  const type = params.type;
  const videoId = params.videoId;
  const [player, setPlayer] = useState(false);
  const [playlist, setPlaylist] = useState(false);
  const isPlaying = useRef(false);

  useEffect(() => {
    if (type === 'playlist') {
      setPlaylist(true);
      isPlaying.current = true;
    } else if (type === 'video') {
      setPlayer(true);
    }
  }, [type]);

  return (
    <>
      <div className={styles.background} onClick={() => navigate('/')} />
      {playlist && (
        <section className={styles.Playlist}>
          <h1 className={styles.heading}>PLAYLIST</h1>
          <main className={styles.mainWrapper}>
            {/* <PlayerLive className={styles.player} isPlaying={isPlaying} /> */}
            <PlayerLayer className={styles.player} />
            <LiveChat socket={socket} room={videoId} />
          </main>
        </section>
      )}

      {player && (
        <section className={styles.Detail}>
          <h1 className={styles.heading}>USING NPM REACT-YOUTUBE</h1>
          <main className={styles.mainWrapper}>
            <Player className={styles.player} videoId={videoId} />
          </main>
        </section>
      )}
    </>
  );
};

export default DetailLive;
