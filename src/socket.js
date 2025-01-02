import { io } from "socket.io-client";


export async function connectSocket() {

    const socketOptions = {
        forceNew: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 'Infinity',
        transports: ['websocket'],
    };

        return io(import.meta.env.VITE_SERVER_URL,socketOptions);
};
