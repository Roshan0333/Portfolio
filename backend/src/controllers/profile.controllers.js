import profileModel from "../models/profile.model.js"
import { cloudinary, deleteImage } from "../config/cloudinary.config.js"
import ApiError from "../utils/api-errors.js";
import ApiResponse from "../utils/api-response.js";
import client from "../config/redis.config.js";
import { supabase } from "../config/supabase.config.js";

const createProfile = async (req, res) => {
    try {
        const { _id } = req.user;

        const { name, email, contact, profession, introduction, dob, address, socialMediaLink } = req.body;

        if (!name || !contact || !profession || !skill) {
            return res.status(400).json(new ApiError(400, "Name, Contact, Professional and Skill is Required."));
        }

        let profileImage;

        if (req.file) {
            profileImage = (await cloudinary.uploader.upload(req.file, { folder: "PortFolio" })).secure_url;
        }

        const userDetail = profileModel({
            userId: _id,
            name,
            profileImage,
            email,
            contact,
            profession,
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

        const { email, contact, profession, skill, introduction, address, socialMediaLink } = req.body;

        let newProfileImage = null;

        if (req.file) {
            if (userDetail.profileImage) {
                await deleteImage(userDetail.profileImage);
                newProfileImage = await cloudinary.uploader.upload(req.file, { folder: "PortFolio" });
            }
        }

        const updateDetail = await profileModel.findOne({ userId: _id },
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

        return res.status(200).json(new ApiResponse(200, updateDetail, "Successfull"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const getProfile = async (req, res) => {
    try {
        const redisProfileDetails = await client.get("Profile");

        if (redisProfileDetails) {
            return res.status(200).json(new ApiResponse(200, JSON.parse(redisProfileDetails), "Successfully"));
        }

        const profileDetails = await profileModel.find();

        if (profileDetails.length === 0) {
            return res.status(404).json(new ApiError(404, "No Profile Details Found"));
        }

        await client.set("Profile", JSON.stringify(profileDetails));

        return res.status(200).json(new ApiResponse(200, profileDetails, "Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const addSkills = async (req, res) => {
    try{
        const {_id} = req.user;

        const {skillArray, category} = req.body;

        const totalSkills = skillArray.flat().length;

        if(!req.files || req.files.length === 0){
            return res.status(400).json(new ApiError(400, "Skill Icon or Image is Required."));
        }

        if(skillArray.length !== category.length | req.files.length !== totalSkills){
            return res.status(400).json(new ApiError(400, "At least one skill for each category and Number of files must match number of skills"));
        }

        const skillList = [];

        let num = 0;

        for(let i = 0; i<skillArray.length; i++){

            let items =[];

            for(let j=0; j<skillArray[i].length; j++){
                const icon = (await cloudinary.uploader.upload(req.files[num].path, {folder: "Skills"})).secure_url;
                const name = skillArray[i][j];
                items.push({
                    name: name,
                    icon: icon
                })

                num++;
            }

            skillList.push(
                {
                    category:category[i],
                    items:items
                }
            )
        }

        const profileDetails = await profileModel.findOneAndUpdate(
            {userId:_id},
            {skill: skillList},
            { new: true }
        );

        if(!profileDetails){
            return res.status(400).json(new ApiError(400, "Profile Updatation Failed"));
        }

        return res.status(200).json(new ApiResponse(200, profileDetails, "Successful"))

    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const uploadResume = async (req, res) => {
    try {

        const { _id } = req.user;

        if (!req.file) {
            return res.status(404).json(new ApiError(404, "Please Upload Resume"));
        }

        const resumeDetails = await profileModel.findOne({ userId: _id });

        if (resumeDetails.resume !== null || resumeDetails.resume) {
            const oldFileName = profile.resume_url.split("/").pop();
            await supabase.storage
                .from("resumes")
                .remove([oldFileName])
        }

        const fileName = `${_id}_${Date.now()}_${req.file.originalname}`;

        const { data, error } = await supabase.storage
            .from("resumes")
            .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
            });

        if (error) {
            return res.status(500).json(new ApiError(500, error.message));
        }

        const {data: publicUrl} = supabase.storage
        .from("resumes")
        .getPublicUrl(fileName)

        await profileModel.findOneAndUpdate(
            {userId: _id},
            {resume: publicUrl.publicUrl},
            {new: true, upsert: true}
        )

        return res.status(200).json(new ApiResponse(200, "Resume Upload is Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

export { createProfile, updateProfile, getProfile, uploadResume, addSkills };