import { io } from "socket.io-client";


export async function connectSocket() {

    const socketOptions = {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 'Infinity',
        transports: ['websocket'],
    }
        // eslint-disable-next-line no-undef
        const socket = io(import.meta.env.VITE_SERVER_URL,socketOptions);
    }