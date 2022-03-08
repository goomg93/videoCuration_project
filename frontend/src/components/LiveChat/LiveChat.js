import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import {
  BsEmojiSmileUpsideDown,
  BsChevronDown,
  BsChevronUp,
} from 'react-icons/bs';
import JoinChat from './JoinChat';
import UsersDropDown from './UsersDropDown';
import styles from './LiveChat.module.css';

const LiveChat = ({ socket, askUser, username, setUsername, joinRoom }) => {
  const [input, setInput] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [viewUserList, setViewUserList] = useState(false);

  const sendMessage = e => {
    e.preventDefault();
    if (input !== '') {
      const msg = input.trim();
      socket.emit('chatMessage', msg);
      setInput('');
    }
  };

  useEffect(() => {
    socket.on('message', data => {
      setMessageList(list => [...list, data]);
    });
    socket.on('roomUsers', ({ room, users }) => {
      // users = users.filter(user => user.username !== null);
      setUserList([...users]);
    });
  }, [socket]);

  return (
    <section className={styles.LiveChat}>
      {askUser && <JoinChat setUsername={setUsername} joinRoom={joinRoom} />}
      <article className={styles.chatContentContainer}>
        <div
          className={styles.chatTitlebar}
          onClick={() => setViewUserList(viewUserList => !viewUserList)}
        >
          <h2>
            LIVE CHAT{' '}
            <span>
              {userList.length === 0 ? '' : `${userList.length}`}
              {viewUserList ? (
                <BsChevronUp className={styles.chevron} />
              ) : (
                <BsChevronDown
                  className={styles.chevron}
                  // onClick={() => setViewUserList(true)}
                />
              )}
            </span>
          </h2>
        </div>
        <UsersDropDown
          username={username}
          viewUserList={viewUserList}
          userList={userList}
        />
        <ScrollToBottom className={styles.chatMessages}>
          {messageList.map((message, index) => (
            <div
              key={index}
              className={styles.message}
              id={message.username === username ? `${styles.you}` : 'other'}
            >
              <BsEmojiSmileUpsideDown className={styles.avatar} />
              <div className={styles.messageWrapper}>
                <div className={styles.meta}>
                  <span className={styles.username}>{message.username}</span>{' '}
                  <span className={styles.time}>{message.time}</span>
                </div>
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
