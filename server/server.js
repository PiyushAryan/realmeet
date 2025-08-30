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
  origin: 'https://realmeet.studio',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);


const aiHintLimiter = rateLimit({ windowMs: 60 * 1000, max: 10 });

app.post("/api/ai-hint", aiHintLimiter, async (req, res) => {
  try {
    const { prompt, suffix } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const response = await axios.post(
      "https://codestral.mistral.ai/v1/fim/completions",
      {
        model: "codestral-latest",
        prompt: prompt,
        suffix: suffix || "",
        max_tokens: 128,
        
        temperature: 0.2,
        stop: ["\n\n"] 
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const hintText = response.data.choices?.[0]?.message?.content || "";
    res.json({ hint: hintText });

  } catch (err) {
    console.error("AI hint error:", err.response?.status, err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch AI hint" });
  }
});

app.post("/api/ai-hints", aiHintLimiter, async (req, res) => {
  try {
    const { code, beforeCursor, afterCursor } = req.body;
    
    if (!code || !process.env.MISTRAL_API_KEY) {
      return res.status(400).json({ error: "Missing code or API key", hints: [] });
    }

    const suggestions = [];
    
    // Generate suggestions based on cursor position
    if (beforeCursor && afterCursor) {
      const response = await axios.post(
        "https://codestral.mistral.ai/v1/fim/completions",
        {
          model: "codestral-latest",
          prompt: beforeCursor,
          suffix: afterCursor,
          max_tokens: 64,
          
          temperature: 0.3,
          stop: ["\n\n"],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      const hint = response.data.choices?.[0]?.message?.content || "";
      if (hint.trim()) {
        suggestions.push(hint.trim());
      }
    }

    // Generate general completion suggestion
    const response2 = await axios.post(
      "https://codestral.mistral.ai/v1/fim/completions",
      {
        model: "codestral-latest",
        prompt: code,
        suffix: "",
        max_tokens: 64,
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    const hint2 = response2.data.choices?.[0]?.message?.content || "";
    if (hint2.trim()) {
      suggestions.push(hint2.trim());
    }

    const uniqueSuggestions = [...new Set(suggestions)].slice(0, 5);
    res.json({ hints: uniqueSuggestions });

  } catch (err) {
    console.error("AI hints error:", err.message);
    res.status(500).json({ error: "Failed to fetch AI hints", hints: [] });
  }
});


// Socket.io connection handlers

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
  // console.log(`Server is running on http://localhost:${PORT}`);
});

