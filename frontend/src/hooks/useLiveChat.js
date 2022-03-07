import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useLiveChat = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io.connect(`${process.env.REACT_APP_CHAT_SERVER}`, {
      transports: ['websocket'],
    });
    setSocket(newSocket);
  }, [setSocket]);
  return { socket };
};

export default useLiveChat;
