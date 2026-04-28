import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config(
    {path:"./.env"}
);

cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.cloudKey,
    api_secret: process.env.cloudSecretKey
});

const deleteImage = async (url) => {
    try{
        await cloudinary.uploader.destroy(url);
        return true
    }
    catch(err){
        console.log("Error on Cloudinary Config:", err.message);
        return false;
    }
}

export {cloudinary, deleteImage};