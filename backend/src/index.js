import databaseConfig from "./config/db.config.js";
import app from "./app.js";

const PORT = 3000;

databaseConfig();

app.listen(PORT, console.log(`Server running on PORT: ${PORT}`))