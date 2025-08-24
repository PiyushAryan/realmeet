import { config as configDotenv } from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import axios from 'axios';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

configDotenv({ path: './server/.env' });


const app = express();

app.use(helmet());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

app.use("/api/ai-hint", rateLimit({ windowMs: 60 * 1000, max: 10 }));
const server = http.createServer(app);
const io = new Server(server);


app.post("/api/ai-hint", async (req, res) => {
  try {
    const { prompt, suffix } = req.body;
    
    const response = await axios.post(
      "https://codestral.mistral.ai/v1/fim/completions",
      {
        model: "codestral-latest",
        prompt,
        suffix,
        max_tokens: 128,
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          
          "Content-Type": "application/json",
        },
      }
    );

    const hintText = response.data.choices?.[0]?.text || "";
    res.json({ hint: hintText }); //back to pavillion
  } catch (err) {
    console.error("AI hint error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch AI hint" });
    
  }
});

const userSocketMap = {};

function getUsersInRoom(roomId) {

  return Array.from(io.sockets.adapter.rooms.get(roomId) ||
    []).map(socketId => {
      return {
        socketId,
        username: userSocketMap[socketId],
        isOnline: true
      };
    }
    );
}

io.on('connection', (socket) => {
  // console.log('socket connected', socket.id);

  socket.on('join', ({ roomId, username }) => {

    userSocketMap[socket.id] = username;
    socket.join(roomId);


    const users = getUsersInRoom(roomId);
    // console.log(users);  // remove in prod

    users.forEach(({ socketId }) => {
      io.to(socketId).emit('joined', {
        users,
        username,
        socketId: socket.id,
      });
    });
  });

socket.on('code-change', ({roomId, code}) => {
  socket.in(roomId).emit('code-change', { code });
});

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

