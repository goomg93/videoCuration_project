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

  useEffect(() => {
    // document.body.style.cssText = `position: fixed; top: -${window.scrollY}px; right: 0; bottom: 0; left: 0;`;
    document.getElementById('body').style.cssText = `display:none;`;
    return () => {
      // const scrollY = document.body.style.top;
      // document.body.style.cssText = `position: ""; top: "";`;
      document.getElementById('body').style.cssText = `display: block`;
      // window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);

  const joinRoom = () => {
    if (username !== '') {
      socket.emit('joinRoom', { username, room: 'PLAYLISTID' });
      setAskUser(false);
    }
  };

  const handleClose = () => {
    socket.disconnect();
    navigate('/');
  };

  return (
    <>
      <div className={styles.background}>
        <h1 id={styles.logo}>
          <Link id={styles.logoLink} to="/">
            BZZNBYD
          </Link>
        </h1>
        <IoClose className={styles.closeBtn} onClick={handleClose} />
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
