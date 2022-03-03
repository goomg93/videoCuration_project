import { formatMessage } from './utils/messages';
import { userJoin, getCurrentUser, userLeave, getRoomUsers, getUsersId } from './utils/users';
import redisAdapter from 'socket.io-redis';
import {
  insertUserInfo,
  insertMsg,
  deleteUserInfo,
  getCurrentUserInfo,
} from '../mongodb/chatDataHandler';
import dotenv from 'dotenv';

dotenv.config();

const botName = 'Chat Bot';

const realTimeChat = io => {
  // io.adapter(
  //   redisAdapter({
  //     host: process.env.CONNECT_REDIS_ADAPTER_1 | process.env.CONNECT_REDIS_ADAPTER_2,
  //     port: process.env.CONNECT_REDIS_ADAPTER_PORT,
  //   })
  // );
  io.on('connection', socket => {
    socket.on('joinRoom', async ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
      await insertUserInfo(user);
      socket.join(user.room);
      socket.emit('message', formatMessage(botName, `${user.username}님 환영합니다. 😀`));
      socket.broadcast
        .to(user.room)
        .emit('message', formatMessage(botName, `${user.username}님이 참가하셨습니다.`));
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: await getCurrentUserInfo(),
      });
    });

    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);
      insertMsg(msg, user);
      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    socket.on('disconnect', async () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage(botName, `${user.username}님이 나가셨습니다.`)
        );
        user && deleteUserInfo(user);
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: await getCurrentUserInfo(),
        });
      }
    });
  });
};

export default realTimeChat;
