import { useEffect, useState, useRef } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { BsEmojiSmileUpsideDown } from 'react-icons/bs';
import styles from './LiveChat.module.css';

const LiveChat = ({ socket, askUser, username, setUsername, joinRoom }) => {
  const [input, setInput] = useState('');
  const [messageList, setMessageList] = useState([]);
  const nickname = useRef(null);

  const sendMessage = e => {
    console.log('LiveChat.js sendmessage');
    e.preventDefault();
    if (input !== '') {
      const msg = input.trim();
      socket.emit('chatMessage', msg);
      setInput('');
    }
  };

  const focusInput = () => {
    nickname.current.focus();
  };

  useEffect(() => {
    console.log('LiveChat.js useeffect');
    socket.on('message', data => {
      console.log(data);
      setMessageList(list => [...list, data]);
    });
  }, [socket]);

  return (
    <section className={styles.LiveChat}>
      {askUser && (
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
      )}
      <article className={styles.chatContentContainer}>
        <div className={styles.chatTitlebar}>
          <h2>LIVE CHAT</h2>
        </div>
        <ScrollToBottom className={styles.chatMessages}>
          {messageList.map((message, index) => (
            <div
              key={index}
              className={styles.message}
              id={message.username === username ? `${styles.you}` : ''}
            >
              <BsEmojiSmileUpsideDown className={styles.avatar} id />
              <div className={styles.messageWrapper}>
                <p className={styles.meta}>
                  <span className={styles.username}>{message.username}</span>{' '}
                  <span classname={styles.time}>{message.time}</span>
                </p>
                <p className={styles.text}>{message.text}</p>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </article>
      <article className={styles.chatFormContainer}>
        <form id={styles.chatForm}>
          <input
            type="text"
            value={input}
            disabled={askUser ? true : false}
            placeholder="Enter Message"
            onChange={e => setInput(e.target.value)}
            autoComplete="off"
            autoFocus
            required
            onKeyPress={e => {
              e.key === 'Enter' && sendMessage(e);
            }}
          />
          <button
            className={styles.chatBtn}
            onClick={sendMessage}
            onKeyPress={e => {
              e.key === 'Enter' && sendMessage(e);
            }}
          >
            Send
          </button>
        </form>
      </article>
    </section>
  );
};

export default LiveChat;
