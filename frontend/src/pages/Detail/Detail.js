import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import PlayerSingle from '../../components/Player/PlayerSingle';
import PlayerLayer from '../../components/PlayerLayer/PlayerLayer';
import LiveChat from '../../components/LiveChat/LiveChat';

import styles from './Detail.module.css';
import '../../styles/reset.css';
import '../../styles/common.css';

const Detail = () => {
  const params = useParams();
  const type = params.type;
  const videoId = params.videoId;
  const [single, setSingle] = useState(false);
  const [layer, setLayer] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (type === 'video') {
      setSingle(true);
    } else if (type === 'layer') {
      setLayer(true);
    }
  }, [type]);

  useEffect(() => {
    const newSocket = io.connect(`${process.env.REACT_APP_CHAT_SERVER}`, {
      transports: ['websocket'],
    });
    setSocket(newSocket);
  }, [setSocket]);

  return (
    <>
      <div className={styles.background} />
      <section className={styles.Detail}>
        {single && (
          <>
            <h1 className={styles.heading}>USING NPM REACT-YOUTUBE</h1>
            <main className={styles.mainWrapper}>
              <PlayerSingle className={styles.player} videoId={videoId} />
              <LiveChat socket={socket} room={videoId} />
            </main>
          </>
        )}
        {layer && (
          <>
            <h1 className={styles.heading}>LAYER APPROACH </h1>
            <h1 className={styles.heading}>WITH REACT-YOUTUBE</h1>

            <main className={styles.mainWrapper}>
              <div>
                <PlayerLayer className={styles.player} videoId={videoId} />
              </div>
              <div>
                <LiveChat socket={socket} room={videoId} />
              </div>
            </main>
          </>
        )}
      </section>
    </>
  );
};

export default Detail;
