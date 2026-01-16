// packages/core/src/context.ts

export interface User {
  id: string;
  [key: string]: unknown;
}

export interface Connection {
  id: string;
  send(event: string, payload: unknown): void;
  close(): void;
}

export interface Context {
  readonly connection: Connection;
  readonly user: User | null;
  readonly room: {
    type: string;
    id: string;
  } | null;
  readonly event: string;
  readonly payload: unknown;
  send(event: string, payload: unknown): void;
}
