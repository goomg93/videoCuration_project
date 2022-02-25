import { formatMessage } from './utils/messages';
import { userJoin, getCurrentUser, userLeave, getRoomUsers, getUsersId } from './utils/users';
const botName = 'Chat Bot';

const realTimeChat = io => {
  io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
      socket.join(user.room);
      socket.emit('message', formatMessage(botName, `${user.username}님 환영합니다. 😀`));
      socket.broadcast
        .to(user.room)
        .emit('message', formatMessage(botName, `${user.username}님이 참가하셨습니다.`));
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);
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
          users: getRoomUsers(user.room),
        });
      }
    });
  });
};

export default realTimeChat;
