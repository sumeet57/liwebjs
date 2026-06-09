
# LiWebjs

**Lightweight realtime backend framework for Node.js.**

A structured, developer-friendly alternative to Socket.IO — built on WebSockets with channels, rooms, shared state, authentication, heartbeat reliability, and presence tracking built in.

[![npm version](https://img.shields.io/npm/v/liwebjs)](https://www.npmjs.com/package/liwebjs)
[![license](https://img.shields.io/npm/l/liwebjs)](LICENSE)
[![tests](https://img.shields.io/github/actions/workflow/status/sumeet57/liwebjs/ci.yml?label=tests)](https://github.com/sumeet57/liwebjs/actions)

---

## Why liwebjs?

Every realtime project ends up re-implementing the same patterns from scratch:

```
Raw WebSocket              liwebjs
─────────────────          ──────────────────────────────────
ws.on("message", fn)  →   liweb.handle("chat:message", fn)
manual room tracking  →   channel("chat").room("general")
manual auth logic     →   options.auth = { secret: "..." }
manual state sync     →   room.state.set / get / push / patch
manual heartbeat      →   options.ping = { pingInterval: 25000 }
manual presence       →   room.presence.online() / lastSeen()
```

liwebjs standardises all of these as first-class framework features.

---

## Installation

```bash
npm install liwebjs
```

Requires Node.js 20+.

---

## Quick Start

```typescript
import http from "http";
import { createLiWebServer } from "liwebjs";

const httpServer = http.createServer();
const liweb = createLiWebServer(httpServer);

const general = liweb.channel("chat").room("general");

liweb.on("connection", (ctx) => {
  general.join(ctx.connection, ctx.user);
  ctx.send("welcome", {
    id: ctx.connection.id,
    onlineCount: general.presence.count(),
    presence: general.presence.snapshot(),
  });
});

liweb.handle("message", (ctx) => {
  general.state.push("messages", ctx.payload);
  general.emit("message", ctx.payload);
});

liweb.on("disconnect", (ctx) => {
  general.leave(ctx.connection);
  general.emit("user:left", { onlineCount: general.presence.count() });
});

httpServer.listen(3001);
```

---

## Features

| Feature | API |
|---|---|
| Event routing | `liweb.handle("event", fn)` |
| Channels | `liweb.channel("chat")` |
| Rooms | `channel.room("general")` |
| Broadcast | `room.emit / emitExcept / emitTo` |
| Shared state | `room.state.get/set/push/patch/increment/snapshot` |
| Authentication | `options.auth = { secret }` |
| Heartbeat | `options.ping = { pingInterval }` |
| Presence Engine | `room.presence.online/lastSeen/setActivity/snapshot` |
| Auto-reconnect | Built into liwebjs-client |

---

## Packages

| Package | Description |
|---|---|
| [`liwebjs`](https://www.npmjs.com/package/liwebjs) | Server-side Node.js framework |
| [`liwebjs-client`](https://www.npmjs.com/package/liwebjs-client) | Browser WebSocket client SDK |

---

## Documentation

Full API reference, guides, and examples:

**👉 [liwebjs.sumeet.app](https://liwebjs.sumeet.app)**

---

## Example App

See [`examples/chat`](https://github.com/sumeet57/liwebjs/tree/main/examples/chat) — full-stack chat app with **Express + React + Vite** demonstrating every feature.

```bash
# Terminal 1 — server
cd examples/chat/server
npm install && npm run dev

# Terminal 2 — client
cd examples/chat/client
npm install && npm run dev
```

---

## Roadmap

```
v0.0.1  ✅  Core framework — events, rooms, state, auth, heartbeat
v0.0.2  ✅  npm publish + documentation
v0.0.3  ✅  Presence Engine — online tracking, last seen, activity
v0.0.4  🔜  Role-based authorization
v1.0.0  🔜  Redis distributed state adapter
Future  🔜  uWebSockets adapter, Edge runtime support
```

---

## Contributing

```bash
git clone https://github.com/sumeet57/liwebjs.git
cd liwebjs && npm install
cd packages/core && npm test
```

See [CONTRIBUTING.md](https://github.com/sumeet57/liwebjs/blob/main/CONTRIBUTING.md) for guidelines.

---

## License

MIT © [Sumeet Umbalkar](https://github.com/sumeet57)
