import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a socket connected', socket.id);
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
});

