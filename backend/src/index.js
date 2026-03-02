import express from "express";
import databaseConfig from "./config/db.config.js";

const PORT = 3000;

databaseConfig();

const app = express();

app.listen(PORT, console.log(`Server running on PORT: ${PORT}`))