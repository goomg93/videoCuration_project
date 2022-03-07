import { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

import Player from '../../components/Player/Player';
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
  const [username, setUsername] = useState('');
  const [askUser, setAskUser] = useState(true);

  useEffect(() => {
    console.log('Detail.js useEffect- type');
    if (type === 'playlist' && !videoId) {
      setPlaylist(true);
      isPlaying.current = true;
    } else if (type === 'youtube') {
      setPlayer(true);
    }
    return () => {
      setPlaylist(false);
      setPlayer(false);
    };
  }, [type, videoId]);

  const joinRoom = () => {
    if (username !== '') {
      socket.emit('joinRoom', { username, room: 'PLAYLISTID' });
      setAskUser(false);
    }
  };

  return (
    <>
      <div className={styles.background}>
        <h1 className={styles.logo}>
          <Link className={styles.logoLink} to="/">
            BZZNBYD
          </Link>
        </h1>
        <IoClose className={styles.closeBtn} onClick={() => navigate('/')} />
      </div>
      {playlist && (
        <section className={styles.Detail}>
          <main className={styles.mainWrapper}>
            <PlayerLayer className={styles.player} />
            <LiveChat
              socket={socket}
              askUser={askUser}
              username={username}
              setUsername={setUsername}
              joinRoom={joinRoom}
            />
          </main>
        </section>
      )}

      {player && (
        <section className={styles.Detail}>
          <h1 className={styles.heading}>JUST-YOUTUBE</h1>
          <main className={styles.mainWrapper}>
            <Player className={styles.player} videoId={videoId} />
          </main>
        </section>
      )}
    </>
  );
};

export default DetailLive;
