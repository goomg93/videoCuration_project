import { useRef } from 'react';
import styles from './JoinChat.module.css';

const JoinChat = ({ setUsername, joinRoom }) => {
  const nickname = useRef(null);
  const focusInput = () => {
    nickname.current.focus();
  };

  return (
    <>
      <div className={styles.joinBackground} onClick={focusInput} />
      <div className={styles.join}>
        <div className={styles.joinModal}>
          <h3>실시간 채팅</h3>
          <input
            ref={nickname}
            type="text"
            placeholder="닉네임을 입력해주세요"
            onChange={event => {
              setUsername(event.target.value);
            }}
            onKeyPress={e => {
              e.key === 'Enter' && joinRoom(e);
            }}
          />
          <button
            onClick={joinRoom}
            onKeyPress={e => {
              e.key === 'Enter' && joinRoom(e);
            }}
          >
            참여하기
          </button>
        </div>
      </div>
    </>
  );
};

export default JoinChat;
