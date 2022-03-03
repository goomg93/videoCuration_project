import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import _ from 'lodash';
import styles from './LiveChat.module.css';

const LiveChat = ({ socket, room }) => {
  const [input, setInput] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    function joinRoom(room) {
      socket.emit('joinRoom', { room: String(room) });
    }
    joinRoom(room);
  }, [socket, room]);

  useEffect(() => {
    socket.on('chatMessage', message => {});
  }, [socket]);

  const dateFormat = date => {
    let hour = date.getHours();
    let minute = date.getMinutes();

    hour = hour >= 10 ? hour : '0' + minute;
    minute = minute >= 10 ? minute : '0' + minute;

    return hour + ':' + minute;
  };

  const sendMessage = async e => {
    e.preventDefault();
    if (input !== '') {
      const msg = {
        message: input.trim(),
        room: room,
        time: dateFormat(new Date(Date.now())),
      };

      await socket.emit('chatMessage', msg);
      setMessageList(list => [...list, msg]);
      setInput('');
    }
  };

  // const handleInput = _.debounce(function (e) {
  //   setInput(e.target.value);
  // }, 500);

  return (
    <section className={styles.LiveChat}>
      <article className={styles.chatContentContainer}>
        <div className={styles.chatTitlebar}>
          <h2>Chat for playlistId : {room}</h2>
        </div>
        <ScrollToBottom className={styles.chatMessages}>
          {messageList.map((message, index) => (
            <div key={index} className={styles.message}>
              <p className={styles.text}>{message.message}</p>
              <p className={styles.meta}>
                {message.user} <span>{message.time}</span>
              </p>
            </div>
          ))}
        </ScrollToBottom>
      </article>
      <article className={styles.chatFormContainer}>
        <form id={styles.chatForm}>
          <input
            type="text"
            value={input}
            placeholder="Enter Message"
            onChange={e => {
              setInput(e.target.value);
            }}
            onKeyPress={e => {
              e.key === 'Enter' && sendMessage(e);
            }}
            autoComplete="off"
            autoFocus
            required
          />
          <button className={styles.chatBtn} onClick={sendMessage}>
            Send
          </button>
        </form>
      </article>
    </section>
  );
};

export default LiveChat;
