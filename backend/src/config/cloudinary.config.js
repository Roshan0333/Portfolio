import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.cloudName,
    cloudKey: process.env.cloudKey,
    cloudSecretKey: process.env.cloudSecretKey
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