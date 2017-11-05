module.exports = (io, users) => {
  io.on('connection', (socket) => {
    socket.on('login', (username) => {
      const sessionId = socket.id;
      users.push({ sessionId, username });
      socket.broadcast.emit('welcome', username);
    });

    socket.on('disconnect', () => {
      const user = users.find(_user => socket.id === _user.sessionId);
      if (user) socket.broadcast.emit('left', user.username);
      else socket.broadcast.emit('left', 'Someone');
    });

    socket.on('msg', (msg) => {
      socket.broadcast.emit('msg', msg);
    });
  });
};
