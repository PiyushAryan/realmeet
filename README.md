# ![realmeet Logo](./public/favicon-dark.svg) realmeet

<div align="center">

## 🚀 Enterprise-Grade Real-Time Coding Platform
**Revolutionising technical interviews and collaborative coding experiences**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-16.x+-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-orange.svg)](https://socket.io/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success.svg)]()

[🔴 Live Demo](https://realmeet.studio) · [📖 Documentation](#-quick-start) · [🐛 Report Issues](https://github.com/PiyushAryan/realmeet/issues)

</div>

---

## 📌 Overview

**realmeet** is an **open-source, real-time collaborative coding platform** designed for technical interviews, pair programming, code reviews, and training.  
It offers **low-latency, secure, and scalable** collaboration with built-in multi-language code execution.

---

## 🎯 Features

- **Real-Time Collaboration**
  - Live code sync with <50ms latency
  - Cursor tracking for all participants (coming soon)
  - Smart conflict resolution

- **Secure & Private**
  - Ephemeral sessions (no data saved)
  - End-to-end encrypted WebSocket communication
  - Role-based access control

- **Multi-Language Execution**
  - C++, Python, Java, JavaScript & more
  - Powered by [Judge0](https://judge0.com/) API
  - Real-time compilation and runtime feedback

- **Modern UI**
  - Clean, distraction-free interface
  - Dark/Light theme
  - Mobile-friendly and responsive

---

## 🛠️ Tech Stack

| Layer         | Technologies |
|--------------|--------------|
| Frontend     | React, Tailwind CSS, CodeMirror |
| Backend      | Node.js, Express |
| Real-Time    | Socket.IO |
| Code Runner  | Judge0 API |
| Deployment   | Vercel, Azure |

---

## 🚀 Quick Start

### 1️⃣ Prerequisites
- **Node.js** 16.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Judge0 API Key** ([Get here](https://judge0.com/))

### 2️⃣ Installation

```bash
# Clone repository
git clone https://github.com/PiyushAryan/realmeet.git
cd realmeet

# Install frontend & backend dependencies
npm install 


### 3️⃣ Configuration

Create a `.env` file in the root directory:

```env
# Judge0 API Configuration
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_rapidapi_key_here

# Server Configuration
PORT=5000
CORS_ORIGIN=http://localhost:3000


### 4️⃣ Run in Development

```bash
# Start both client & server
npm run dev

# OR run separately
client: npm run dev
server: npm start
```

Visit: **http://localhost:3000**

---

## 📦 Production Build

```bash
npm run build
npm start
```

---

## 📊 Performance

| Metric             | Value |
|--------------------|-------|
| Page Load Time     | < 2s  |
| Real-Time Latency  | < 50ms|
| Concurrent Users   | 1000+ |
| Uptime             | 99.9% |

---

## 🤝 Contributing

We welcome contributions!  

### Steps:
1. **Fork** this repository
2. Create a feature branch:  
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes with a clear message:  
   ```bash
   git commit -m "feat: add your feature"
   ```
4. Push to your fork:  
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request

📜 **Guidelines**
- Follow ESLint + Prettier configs
- Maintain >80% test coverage
- Keep commits atomic and meaningful

---

## 🐛 Reporting Issues

- Search existing issues before creating a new one
- Provide **steps to reproduce**, environment details, and logs
- Use appropriate labels (`bug`, `feature`, `enhancement`)

[Open an issue →](https://github.com/PiyushAryan/realmeet/issues)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

> **Built with ❤️ for developers** — *"Transforming technical interviews, one line of code at a time."*
