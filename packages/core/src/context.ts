import type { LiWebConnection } from "./connection";

export interface User {
  id: string;
  [key: string]: unknown;
}

export interface Context {
  readonly connection: LiWebConnection;
  readonly user: User | null;
  readonly event: string;
  readonly payload: unknown;

  send(event: string, payload: unknown): void;
}
