import profileModel from "../models/profile.model.js"
import { cloudinary, deleteImage } from "../config/cloudinary.config.js"
import ApiError from "../utils/api-errors.js";
import ApiResponse from "../utils/api-response.js";
import client from "../config/redis.config.js";
import { supabase } from "../config/supabase.config.js";

const createProfile = async (req, res) => {
    try {
        const { _id } = req.user;

        const { name, email, contact, profession, introduction, dob, addressObject, } = req.body;

        if (!name || !contact || !profession) {
            return res.status(400).json(new ApiError(400, "Name, Contact, Professional and Skill is Required."));
        }

        let profileImage;

        if (req.file) {
            profileImage = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "Portfolio" },
                    (err, result) => {
                        if (err) reject(err);
                        else resolve(result.secure_url)
                    }
                )
                stream.end(req.file.buffer);
            });
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
            address: {
                street: addressObject.street,
                pincode: addressObject.pincode,
                city: addressObject.city,
                country: addressObject.country
            }
        });

        await userDetail.save();

        return res.status(200).json(new ApiResponse(200, userDetail, "Profile Create Successfully"));
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const updateProfile = async (req, res) => {
    try {
        const { _id } = req.user;

        const userDetail = await profileModel.findOne({ userId: _id });

        const { email, contact, profession, skill, introduction, address } = req.body;

        let newProfileImage = null;

        if (req.file) {
            if (userDetail.profileImage) {
                await deleteImage(userDetail.profileImage);
                newProfileImage = await new Promise((resolve, reject) => {
                    const steam = cloudinary.uploader.upload_stream(
                        { folder: "Portfolio" },
                        (err, result) => {
                            if (err) reject(err);
                            else resolve(result.secure_url)
                        }
                    )
                });
            }
        }

        const updateDetail = await profileModel.findOne({ userId: _id },
            {
                profileImage: req.file ? newProfileImage : userDetail.profileImage,
                email,
                contact,
                profession,
                skill,
                introduction,
                dob,
                address
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
    try {
        const { _id } = req.user;

        const { skill, category } = req.body;

        console.log(req.body)


        if (!req.file) {
            return res.status(400).json(new ApiError(400, "Skill Icon or Image is Required."));
        }

        if (!skill || skill === "") {
            return res.status(400).json(new ApiError(400, "Skill Name is Required."));
        }

        const iconUrl = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "Portfolio" },
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result.secure_url);
                }
            );
            stream.end(req.file.buffer);
        })

        const categoryPresent = await profileModel.exists({
            userId: _id,
            "skill.category": category
        })

        const skillObject = {
            name: skill,
            icon: iconUrl
        }

        let profileDetails;

        if (categoryPresent) {
            profileDetails = await profileModel.findOneAndUpdate(
                {
                    userId: _id,
                    "skill.category": category
                },
                {
                    $addToSet: {
                        "skill.$.items": skillObject
                    }
                },
                { new: true }
            )
        }
        else {
            profileDetails = await profileModel.findOneAndUpdate(
                { userId: _id },
                {
                    $addToSet: {
                        skill: {
                            category: category,
                            items: [skillObject]
                        }
                    }
                },
                { new: true }
            )
        }

        if (profileDetails.modifiedCount === 0) {
            return res.status(409).json(new ApiError(409, "Skill Alredy Present."));
        }

        if (!profileDetails) {
            return res.status(400).json(new ApiError(400, "Profile Updatation Failed"));
        }

        return res.status(200).json(new ApiResponse(200, profileDetails, "Successful"))

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const deleteSkills = async (req, res) => {
    try {
        const { _id } = req.user;

        const { category, skill } = req.body;

        if (!category || !skill) {
            return res.status(400).json(new ApiError(400, "Category and skill name both are required for remove skill."));
        }

        const profileDetails = await profileModel.findOneAndUpdate(
            {
                userId: _id,
                "skill.category": category
            },
            {
                $pull: {
                    "skill.$[elem].items": {
                        name: skill
                    }
                }
            },
            {
                arrayFilters: [{ "elem.category": category }],
                new: true
            }
        );

        if (!profileDetails) {
            return res.status(404).json(new ApiError(404, "Skill Remove is Failed"));
        }

        return res.status(200).json(new ApiResponse(200, profileDetails, "Skill set updated successfully."));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const uploadResume = async (req, res) => {
    try {

        const { _id } = req.user;

        if (!req.file) {
            return res.status(404).json(new ApiError(404, "Please Upload Resume"));
        }

        const resumeDetails = await profileModel.findOne({ userId: _id });

        if (resumeDetails && resumeDetails.resume) {
            const oldFileName = resumeDetails.resume.split("/").pop();
            await supabase.storage
                .from("resumes")
                .remove([oldFileName])
        }

        const fileName = req.file.originalname;


        const { data, error } = await supabase.storage
            .from("resumes")
            .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
            });

        if (error) {
            return res.status(500).json(new ApiError(500, error.message));
        }

        const { data: publicUrl } = supabase.storage
            .from("resumes")
            .getPublicUrl(fileName)

        await profileModel.findOneAndUpdate(
            { userId: _id },
            { resume: publicUrl.publicUrl },
            { new: true, upsert: true }
        )

        return res.status(200).json(new ApiResponse(200, "Resume Upload is Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const addSocialMedia = async (req, res) => {
    try {
        const { name, link } = req.body;
        const { _id } = req.user;

        if (!req.file) {
            return res.status(400).json(new ApiError(400, "Media App or Website Icon is Required"));
        }

        if (!name || name === "") {
            return res.status(400).json(new ApiError(400, "Media name is Reqired"));
        }

        const iconUrl = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "Portfolio" },
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result.secure_url);
                }
            );

            stream.end(req.file.buffer);
        })

        const socialObject = {
            name: name,
            link: link,
            icon: iconUrl
        }

        const profileDetails = await profileModel.findOneAndUpdate(
            { userId: _id },
            {
                $addToSet: {
                    socialMediaLink: socialObject
                }
            }
        );

        if (profileDetails.modifiedCount === 0) {
            return res.status(409).json(new ApiError(409, "This Social Media is Already Present."));
        }

        if (!profileDetails) {
            return res.status(404).json(new ApiError(404, "Social Media Link is Adding Failed."));
        }

        return res.status(200).json(new ApiResponse(200, profileDetails, "Social Media is Add Successfully."));

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const deleteSocialMedia = async (req, res) => {
    try {
        const { _id } = req.user;

        const { name } = req.body;

        if (!name || name === "") {
            return res.status(400).json(new ApiError(400, "Social media name is required."));
        }

        const profileDetails = await profileModel.findOneAndUpdate(
            { userId: _id },
            {
                $pull: {
                    socialMediaLink: {
                        name: name
                    }
                }
            },
            { new: true }
        );

        if (!profileDetails) {
            return res.status(404).json(new ApiError(404, "Media link is not remove."))
        }

        return res.status(200).json(new ApiResponse(200, profileDetails, "Successful"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

export { createProfile, updateProfile, getProfile, uploadResume, addSkills, deleteSkills, addSocialMedia, deleteSocialMedia };