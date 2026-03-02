import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
});

const databaseConfig = async () => {
    try{
        const db = await mongoose.connect(process.env.mongoDB_URL);
        console.log("Database Successfully");
        return db;
    }
    catch(err){
        console.log(err.message);
        return false
    }
}

export default databaseConfig;