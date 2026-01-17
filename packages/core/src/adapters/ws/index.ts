import { WebSocketServer, type WebSocket } from "ws";
import { randomUUID } from "crypto";
import type { IncomingMessage } from "http";

import type { Adapter } from "../adapter.interface";
import { LiWebConnection } from "../../connection";

const socketMap = new WeakMap<LiWebConnection, WebSocket>();

export function wsAdapter(): Adapter {
  return {
    attach(server, onConnection, onMessage, onClose) {
      if (typeof server !== "object" || server === null || !("on" in server)) {
        throw new Error("wsAdapter requires a Node HTTP server");
      }

      const wss = new WebSocketServer({ noServer: true });

      (server as any).on(
        "upgrade",
        (req: IncomingMessage, socket: any, head: any) => {
          wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
          });
        },
      );

      wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
        const conn = new LiWebConnection(
          randomUUID(),
          {
            headers: req.headers,
            ip: req.socket.remoteAddress,
            protocol: "ws",
          },
          this,
        );

        socketMap.set(conn, ws);
        onConnection(conn);

        ws.on("message", (data) => {
          try {
            const parsed = JSON.parse(data.toString());
            if (typeof parsed?.event === "string") {
              onMessage(conn, parsed.event, parsed.payload);
            }
          } catch {
            // ignore malformed packets
          }
        });

        ws.on("close", () => {
          socketMap.delete(conn);
          onClose(conn);
        });
      });
    },

    send(conn, event, payload) {
      const ws = socketMap.get(conn);
      if (!ws || ws.readyState !== ws.OPEN) return;

      ws.send(JSON.stringify({ event, payload }));
    },

    close(conn) {
      const ws = socketMap.get(conn);
      ws?.close();
    },
  };
}
