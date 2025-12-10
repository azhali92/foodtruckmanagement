// socketUtil.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (url: string, opts: any = {}, onSuccess?: () => void, onError?: (err: any) => void) => {
  if (socket) return socket;

  socket = io(url, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    ...opts,
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket?.id);
    onSuccess?.();
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
    onError?.(err);
  });

  return socket;
};

export const onConnect = (successCb?: () => void) => {
  if (!socket) return console.warn("Socket not initialized");

  if (socket.connected) {
    successCb?.();
  } else {
    socket.once("connect", () => successCb?.());
  }
};

export const getSocket = () => socket;

/**
 * Emit event with success/error callback support
 */
export const emitEvent = (
  event: string,
  payload: any,
  onSuccess?: (response?: any) => void,
  onError?: (err?: any) => void
) => {
  if (!socket) return console.warn("Socket not initialized");

  socket.timeout(5000).emit(event, payload, (err: any, response: any) => {
    if (err) {
      onError?.(err);
    } else {
      onSuccess?.(response);
    }
  });
};

/**
 * Listen to events with a success callback
 */
export const subscribeEvent = (event: string, successCb: (...args: any[]) => void) => {
  if (!socket) return console.warn("Socket not initialized");

  const handler = (...args: any[]) => successCb(...args);

  socket.on(event, handler);

  // return unsubscribe function
  return () => {
    socket?.off(event, handler);
  };
};

export const closeSocket = () => {
  socket?.disconnect();
  socket = null;
};
