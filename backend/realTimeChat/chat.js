import { formatMessage } from './utils/messages';
import redisAdapter from 'socket.io-redis';
import {
  insertUserInfo,
  insertMsg,
  deleteUserInfo,
  getCurrentUserInfo,
} from '../mongodb/chatDataHandler';
import dotenv from 'dotenv';
import { logger } from '../winston/logs';

dotenv.config();

const botName = 'Chat Bot';

const realTimeChat = io => {
  io.adapter(
    redisAdapter({
      host: process.env.CONNECT_REDIS_ADAPTER_1,
      port: process.env.CONNECT_REDIS_ADAPTER_PORT,
    })
  );

  io.of('/').adapter.on('error', error => {
    logger.error('Socker.io-redis connected Error');
  });

  io.on('connection', socket => {
    socket.on('joinRoom', async ({ username, room }) => {
      const id = socket.id;
      socket.user = { id, username, room };
      await insertUserInfo(socket.user);
      socket.join(socket.user.room);
      socket.emit('message', formatMessage(botName, `${socket.user.username}님 환영합니다. 😀`));
      socket.broadcast
        .to(socket.user.room)
        .emit('message', formatMessage(botName, `${socket.user.username}님이 참가하셨습니다.`));
      io.to(socket.user.room).emit('roomUsers', {
        room: socket.user.room,
        users: await getCurrentUserInfo(socket.user),
      });
    });

    socket.on('chatMessage', async msg => {
      insertMsg(msg, socket.user);
      io.to(socket.user.room).emit('message', formatMessage(socket.user.username, msg));
    });

    socket.on('disconnect', async () => {
      socket.user && (await deleteUserInfo(socket.user));
      if (socket.user) {
        io.to(socket.user.room).emit(
          'message',
          formatMessage(botName, `${socket.user.username}님이 나가셨습니다.`)
        );

        io.to(socket.user.room).emit('roomUsers', {
          room: socket.user.room,
          users: await getCurrentUserInfo(socket.user),
        });
      }
    });
  });
};

export default realTimeChat;
