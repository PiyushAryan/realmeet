import { config as configDotenv } from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import process from 'node:process';



configDotenv();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

function getUsersInRoom(roomId) {

  return Array.from(io.sockets.adapter.rooms.get(roomId) ||
    []).map(socketId => {
      return {
        socketId,
        username: userSocketMap[socketId]
      };
    }
    );
}

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('join', ({ roomId, username }) => {

    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const users = getUsersInRoom(roomId);
    console.log(users);  // remove in prod

    users.forEach(({ socketId }) => {
      io.to(socketId).emit('joined', {
        socketId: socket.id,
        username,
        users,
      });
    });
  });

// socket.on('code-change', ({roomId, code}) => {
//   io.to(roomId).emit('code-change', {code});
// })

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit('left',{
        socketId: socket.id,
        username: userSocketMap[socket.id],
      })
    })
    delete userSocketMap[socket.id];
    socket.leave();
  })
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

