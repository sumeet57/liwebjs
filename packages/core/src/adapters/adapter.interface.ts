import type { LiWebConnection } from "../connection";

export interface Adapter {
  attach(
    server: unknown,
    onConnection: (conn: LiWebConnection) => void,
    onMessage: (conn: LiWebConnection, event: string, payload: unknown) => void,
    onClose: (conn: LiWebConnection) => void,
  ): void;

  send(conn: LiWebConnection, event: string, payload: unknown): void;

  close(conn: LiWebConnection): void;
}
