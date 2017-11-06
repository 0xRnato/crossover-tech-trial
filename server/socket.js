const _ = require('lodash');

module.exports = (io, users) => {
  io.on('connection', (socket) => {
    socket.on('login', (username) => {
      const sessionId = socket.id;
      const user = users.find(_user => _user.username === username);
      if (user && io.sockets.connected[user.sessionId])
        io.sockets.connected[user.sessionId].emit('alreadyLogged');
      else
        socket.broadcast.emit('welcome', username);
      users.push({ sessionId, username });
    });

    socket.on('forceLogout', (username) => {
      _.remove(users, _user => username === _user.username && socket.id === _user.sessionId);
      socket.disconnect();
    });

    socket.on('logout', (username) => {
      const user = _.find(users, _user => username === _user.username);
      _.remove(users, _user => user.username === _user.username);
      if (user) socket.broadcast.emit('left', user.username);
      else socket.broadcast.emit('left', 'Someone');
      socket.disconnect();
    });

    socket.on('msg', (msg) => {
      socket.broadcast.emit('msg', msg);
    });
  });
};
