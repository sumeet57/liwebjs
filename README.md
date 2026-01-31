# liwebJS

liwebJS is a lightweight JavaScript library for building scalable real-time
applications with clean and predictable patterns.

## Why liwebJS?
- Centralized socket configuration
- Simple room and event management
- Minimal abstraction over # ⚡ LiWebJS

LiWebJS is a protocol-first, room-based realtime framework for the web.

It provides a clean core for building realtime systems by separating:
- transport (protocol)
- connection lifecycle
- event orchestration

LiWebJS is designed to give developers full control over realtime connections,
without being locked into a specific transport or framework.

---

## 🚧 Project Status

Early Development (Core Stable)

Current focus:
- Core server
- Manual WebSocket upgrade handling
- Adapter-based protocol architecture
- Strict TypeScript safety

Higher-level features (rooms, state, presence) are coming next.

---

## ✨ Key Ideas

- Protocol-first architecture  
- Manual connection control  
- Adapter-based design  
- Strict TypeScript  

---

## 📦 Installation

Server (coming soon):
npm install liwebjs

Client (coming soon):
npm install liwebjs-client

---

## 🧠 Architecture Overview

HTTP Server
  |
  |-- upgrade (manual)
  |
Protocol Adapter (ws)
  |
LiWeb Core
  - connection lifecycle
  - event system
  - metadata handling

---

## 🚀 Basic Usage

import http from "http";
import { createLiWebServer } from "liwebjs";

const server = http.createServer();
const liweb = createLiWebServer(server);

liweb.on("connection", (ctx) => {
  console.log("Connected:", ctx.connection.id);
});

liweb.on("disconnect", (ctx) => {
  console.log("Disconnected:", ctx.connection.id);
});

server.listen(3000);

---

## 🔁 Event Format

{
  "event": "ping",
  "payload": { "msg": "hello" }
}

---

## 🔌 Adapter System

Default:
- WebSocket (ws)

Future:
- uWebSockets
- custom polling

---

## 🧩 Connection Metadata

headers
ip
protocol

---

## 🛣 Roadmap

v0.1
- Core server
- WebSocket adapter

v0.2
- Event routing
- Rooms

v0.3
- State
- Presence

v0.4
- Client SDK

---

## 📄 License

MIT © Sumeet Umbalkar


- No framework lock-in

## Status
🚧 Pre-alpha — API not stable yet.

## Roadmap
- [x] Core socket wrapper
- [x] Core basic ws functionality(eastablish conn & basic events)
- [ ] Room utilities
- [ ] Event helpers
- [ ] Examples
- [ ] Documentation

## License
MIT
