const socketIO = require('socket.io');

let io;

const initSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    },
    pingTimeout: 60000,
    pingInterval: 25000
  });

  const users = new Map();
  const workers = new Map();

 io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  socket.on('user:join', (userId) => {
    users.set(userId, socket.id);
    socket.join(`user_${userId}`);
    console.log(`👤 User ${userId} joined`);
    socket.emit('connection:confirmed', { userId });
  });

  socket.on('worker:join', (workerId) => {
    workers.set(workerId, socket.id);
    socket.join(`worker_${workerId}`);
    console.log(`👷 Worker ${workerId} joined`);
    socket.emit('connection:confirmed', { workerId });
  });

  // ⭐⭐⭐ ADD CHAT LOGIC HERE ⭐⭐⭐
  socket.on('chat:send', ({ senderId, receiverId, receiverType, message }) => {

    const payload = {
      senderId,
      message,
      timestamp: new Date()
    };

    if (receiverType === 'user') {
      io.to(`user_${receiverId}`).emit('chat:receive', payload);
    }

    if (receiverType === 'worker') {
      io.to(`worker_${receiverId}`).emit('chat:receive', payload);
    }

  });

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);

    for (let [id, sid] of users.entries()) {
      if (sid === socket.id) users.delete(id);
    }

    for (let [id, sid] of workers.entries()) {
      if (sid === socket.id) workers.delete(id);
    }
  });

});

  return io;
};

const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized!');
  return io;
};

const emitToUser = (userId, event, data) => {
  getIO().to(`user_${userId}`).emit(event, data);
};

const emitToWorker = (workerId, event, data) => {
  getIO().to(`worker_${workerId}`).emit(event, data);
};

module.exports = { initSocket, getIO, emitToUser, emitToWorker };
