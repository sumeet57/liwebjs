import type { Adapter } from "./adapters/adapter.interface";
import { wsAdapter } from "./adapters/ws";
import type { Context } from "./context";
import { LiWebConnection } from "./connection";

type ServerEvent = "connection" | "disconnect";
type Handler = (ctx: Context) => void;

export interface LiWebServer {
  on(event: ServerEvent, handler: Handler): void;
}

export interface LiWebServerOptions {
  adapter?: Adapter;
}

export function createLiWebServer(
  server: unknown,
  options: LiWebServerOptions = {},
): LiWebServer {
  const adapter = options.adapter ?? wsAdapter();

  const handlers: Record<ServerEvent, Handler[]> = {
    connection: [],
    disconnect: [],
  };

  function emit(event: ServerEvent, ctx: Context) {
    for (const handler of handlers[event]) {
      handler(ctx);
    }
  }

  adapter.attach(
    server,
    (conn: LiWebConnection) => {
      emit("connection", {
        connection: conn,
        user: null,
        event: "connection",
        payload: null,
        send: conn.send.bind(conn),
      });
    },
    () => {
      // message routing later
    },
    (conn: LiWebConnection) => {
      emit("disconnect", {
        connection: conn,
        user: null,
        event: "disconnect",
        payload: null,
        send: conn.send.bind(conn),
      });
    },
  );

  return {
    on(event, handler) {
      handlers[event].push(handler);
    },
  };
}
