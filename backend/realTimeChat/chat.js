import { formatMessage } from './utils/messages';
import { userJoin, getCurrentUser, userLeave, getRoomUsers, getUsersId } from './utils/users';
import {
  insertUesrInfo,
  insertMsg,
  deleteUserInfo,
  getCurrentUserInfo,
} from '../mongodb/chatDataHandler';
import redisAdapter from 'socket.io-redis';
const botName = 'Chat Bot';

const realTimeChat = io => {
  // io.adapter(redisAdapter({ host: 'redis', port: 6379 }));
  io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
      insertUesrInfo(user);
      socket.join(user.room);
      socket.emit('message', formatMessage(botName, `${user.username}님 환영합니다. 😀`));
      socket.broadcast
        .to(user.room)
        .emit('message', formatMessage(botName, `${user.username}님이 참가하셨습니다.`));
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getCurrentUserInfo(user.room),
      });
    });

    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);
      insertMsg(msg, user);
      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    socket.on('disconnect', () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage(botName, `${user.username}님이 나가셨습니다.`)
        );
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getCurrentUserInfo(user.room),
        });
      }
      user && deleteUserInfo(user);
    });
  });
};

export default realTimeChat;
