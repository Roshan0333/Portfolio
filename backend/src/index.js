import databaseConfig from "./config/db.config.js";
import app from "./app.js";
import http from "http";
import dotenv from "dotenv";
import {initSocket} from "./config/socket.config.js";

dotenv.config();

const PORT = 3000;

databaseConfig();

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, console.log(`Server running on PORT: ${PORT}`))