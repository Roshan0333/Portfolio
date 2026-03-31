import {Server} from "socket.io";

import registerSocketEvents from "./socketHandle.config.js";

let io;

export const initSocket = (server) => {
    io = new Server(server,{
        cors:{
            origin: "*"
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected", socket.id);

        registerSocketEvents(socket);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
}

export const getIO = () => {
    if(!io) throw new Error("Socket not initialized");
    return io
};

