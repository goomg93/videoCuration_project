const users = [];

const userJoin = (id, username, room) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

const getUsersId = username => {
  if (users.username === username) {
    return false;
  }
};

const getCurrentUser = id => {
  return users.find(user => user.id === id);
};

const userLeave = id => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getRoomUsers = room => {
  return users.filter(user => user.room === room);
};

export { userJoin, getCurrentUser, userLeave, getRoomUsers, getUsersId };
