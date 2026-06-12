# liwebjs-client

**Browser WebSocket client SDK for [liwebjs](https://www.npmjs.com/package/liwebjs).**

A lightweight, framework-agnostic browser client with auto-reconnect, event routing, and built-in auth support.

[![npm version](https://img.shields.io/npm/v/liwebjs-client)](https://www.npmjs.com/package/liwebjs-client)
[![license](https://img.shields.io/npm/l/liwebjs-client)](LICENSE)

---

## Installation

```bash
npm install liwebjs-client
```

---

## Quick Start

```typescript
import { createLiWebClient } from "liwebjs-client";

const client = createLiWebClient("ws://localhost:3001", {
  reconnect: true,
  auth: {
    secret: "APP_SECRET",
    secure: { id: "user_1", name: "Sumeet", role: "admin" },
  },
});

client.on("connect", () => console.log("connected"));
client.on("disconnect", () => console.log("disconnected — will auto-reconnect"));

client.handle("welcome", (payload) => console.log("welcome:", payload));
client.handle("message", (payload) => console.log("new message:", payload));

client.emit("message", { text: "hello world" });
```

---

## API

| Method | Description |
|---|---|
| `client.on("connect", fn)` | Fires when connection opens |
| `client.on("disconnect", fn)` | Fires when connection closes |
| `client.handle(event, fn)` | Receive a named event from server |
| `client.emit(event, payload)` | Send a named event to server |
| `client.auth({ secret, secure })` | Send auth manually (async credential flow) |
| `client.disconnect()` | Close connection, disable auto-reconnect |

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `reconnect` | `boolean` | `true` | Auto-reconnect on unexpected disconnect |
| `reconnectDelay` | `number` | `2000` | ms between reconnect attempts |
| `auth.secret` | `string` | — | Must match server `auth.secret` |
| `auth.secure` | `object` | — | User data — becomes `ctx.user` on server |

---

## Auto-Reconnect

| Scenario | Reconnects? |
|---|---|
| Network drops unexpectedly | ✅ Yes — after `reconnectDelay` ms |
| Server restarts | ✅ Yes — after `reconnectDelay` ms |
| `client.disconnect()` called | ❌ No |
| Auth fails (`auth:error`) | ❌ No |
| `reconnect: false` in options | ❌ No |

When reconnecting, `__auth` is re-sent automatically if `options.auth` was set.

---

## Browser Compatibility

Uses only the native `WebSocket` API. No polyfills required.

| Browser | Version |
|---|---|
| Chrome | 16+ |
| Firefox | 11+ |
| Safari | 7+ |
| Edge | 12+ |
| iOS Safari | 6+ |
| Android Chrome | 18+ |

---

## Documentation

Full API reference, React hooks, Vanilla JS examples, TypeScript guide:

**👉 [liwebjs.sumeet.app](https://liwebjs.sumeet.app)**

---

## Related

- [`liwebjs`](https://www.npmjs.com/package/liwebjs) — server-side framework
- [GitHub](https://github.com/sumeet57/liwebjs)
- [Examples](https://github.com/sumeet57/liwebjs/tree/main/examples)

---

## License

MIT © [Sumeet Umbalkar](https://github.com/sumeet57)
