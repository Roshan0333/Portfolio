import profileModel from "../models/profile.model.js"
import { cloudinary, deleteImage } from "../config/cloudinary.config.js"
import ApiError from "../utils/api-errors.js";
import ApiResponse from "../utils/api-response.js";
import client from "../config/redis.config.js";

const createProfile = async (req, res) => {
    try {
        const { _id } = req.user;

        const { name, email, contact, profession, skill, introduction, dob, address, socialMediaLink } = req.body;

        if (!name || !contact || !profession || !skill) {
            return res.status(400).json(new ApiError(400, "Name, Contact, Professional and Skill is Required."));
        }

        let profileImage;

        if (req.file) {
            profileImage = await cloudinary.uploader.upload(req.file, { folder: "PortFolio" });
        }

        const userDetail = profileModel({
            userId: _id,
            name,
            profileImage,
            email,
            contact,
            profession,
            skill,
            introduction,
            dob,
            address,
            socialMediaLink
        });

        await userDetail.save();

        return res.status(200, userDetail, "Profile Create Successfully");
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const updateProfile = async (req, res) => {
    try {
        const { _id } = req.user;

        const userDetail = await profileModel.findOne({ userId: _id });

        const {email, contact, profession, skill, introduction, address, socialMediaLink } = req.body;

        let newProfileImage = null;

        if (req.file) {
            if (userDetail.profileImage) {
                await deleteImage(userDetail.profileImage);
                newProfileImage = await cloudinary.uploader.upload(req.file, { folder: "PortFolio" });
            }
        }

        const updateDetail=await profileModel.findOne({ userId: _id },
            {
                profileImage: newProfileImage,
                email,
                contact,
                profession,
                skill,
                introduction,
                dob,
                address,
                socialMediaLink
            }
        )

        await client.del("Profile")

        return res.status(200).json(new ApiResponse(200,updateDetail, "Successfull"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const getProfile = async (req, res) => {
    try{
        const redisProfileDetails = await client.get("Profile");

        if(redisProfileDetails){
            return res.status(200).json(new ApiResponse(200, JSON.parse(redisProfileDetails), "Successfully"));
        }

        const profileDetails = await profileModel.find();

        if(profileDetails.length === 0){
            return res.status(404).json(new ApiError(404, "No Profile Details Found"));
        }

        await client.set("Profile", JSON.stringify(profileDetails));

        return res.status(200).json(new ApiResponse(200, profileDetails, "Successfully"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

export {createProfile, updateProfile, getProfile};