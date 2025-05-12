# ![RealMeet Logo](./public/logo_64x64.ico)

# realmeet 💻🔴 – *Your live coding arena for interview battles!*

Welcome to **realmeet** – where code meets conversation, and interviews feel less like interrogations!  
This is your **real-time coding playground** built for interviewers and candidates to collaborate, chat, code, and conquer – all in one browser tab. 🎯

Built with speed, simplicity, and sass in mind.
---

## 🚀 Features

- 🔴 **Live Code Collaboration** – Real-time code sharing between interviewer and candidate.
- 🔐 **Secure Rooms** – Private, temporary coding rooms with access control.
- 💬 **Integrated Chat** – In-session communication without switching tabs.
- 📄 **Code Saving** – Export session code as a file or GitHub Gist.

---

## 🛠️ Tech Stack – a full stack of awesome:

- 🖥 **Frontend:** React.js, Tailwind CSS, CodeMirror (for that buttery-smooth editor experience)
- 🧠 **Backend:** Node.js, Express.js
- ⚡ **Real-Time:** Socket.IO (because latency is so 2005)
- ⚙️ **Code Execution:** [Judge0 API](https://judge0.com/) – handles code like a champ
- 🚀 **Deployment:** Vercel (client-side magic), Azure (server-side muscle)

---

## ⚙️ Getting Started

Wanna run it locally? It’s easier than surviving an HR round.

### Prerequisites

- Node.js ≥ 16.x
- A Vercel account (optional, but fancy URLs rock)
- Access to [Judge0 API](https://judge0.com/) – public or self-hosted

---

### 🧰 Installation

1. **Clone the magic:**
   ```bash
   git clone https://github.com/PiyushAryan/realmeet.git
   cd realmeet
   ```
2. **Install dependencies:**
```
npm install
cd client && npm install
```
3. **Set up environment variables:**
   
```
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_rapidapi_key
```
4. **Start server and client:**

```
# Terminal 1
npm run dev   # For client
# Terminal 2
npm start   # For server
```

5. Licensed under the MIT License.
Use it, fork it, remix it – just don’t ghost the credits 😄

“Interviews don’t have to suck. realmeet makes them suck less.”
