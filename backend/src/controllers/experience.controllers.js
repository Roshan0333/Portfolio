import client from "../config/redis.config.js";
import experienceModel from "../models/experience.model.js";
import ApiError from "../utils/api-errors.js";
import ApiResponse from "../utils/api-response.js";

const addExperience = async (req, res) => {
    try {
        const { _id } = req.user;

        const { companyName, position, joiningDate, leavingDate, description } = req.body;

        if (!companyName || !position || !joiningDate || !leavingDate || !description) {
            return res.status(404).json(new ApiError(404, "All Field is Required"));
        }

        const experienceDetail = experienceModel({
            userId: _id,
            companyName,
            position,
            joiningDate,
            leavingDate,
            description
        });

        if (!experienceDetail) {
            return res.status(400).json(new ApiError(400, "Experience Add is Failed"));
        }

        await client.del("Experience");

        return res.status(200).json(new ApiResponse(200, experienceDetail, "Experience Add Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const updateExperience = async (req, res) => {
    try {
        const { experienceId, companyName, position, joiningDate, leavingDate, description, status } = req.body;

        if (!experienceId) {
            return res.status(404).json(new ApiError(404, "Experience Id is Required"));
        }

        const experienceDetail = await experienceModel.findByIdAndUpdate(
            experienceId,
            {
                companyName,
                position,
                joiningDate,
                leavingDate,
                description,
                status
            });

            if(!experienceDetail){
                return res.status(400).json(new ApiError(400, "Experience Updation Failed"));
            }

            await client.del("Experience");

            return res.status(200).json(new ApiResponse(200, experienceDetail, "Experience Update Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const deleteExperience = async (req, res) => {
    try{
        const {experienceId} = req.body;

        if(!experienceId){
            return res.status(404).json(new ApiError(404, "Experience Id is Required"));
        }

        await experienceModel.findByIdAndDelete(experienceId);

        await client.del("Experience");

        return res.status(200).json(new ApiResponse(200, null, "Experience Remove Successfully"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const getExperience = async (req, res) => {
    try{
        const redisExperienceDetails = await client.get("Experience");

        if(redisExperienceDetails){
            return res.status(200).json(new ApiResponse(200, JSON.parse(redisExperienceDetails), "Successfully"));
        }

        const experienceDetails = await experienceModel.find();

        if(experienceDetails.length === 0){
            return res.status(404).json(new ApiError(404, "No Experience Found"));
        }

        await client.set("Experience", JSON.stringify(experienceDetails));

        return res.status(200).json(new ApiResponse(200, experienceDetails, "Successfully"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

export {addExperience, updateExperience, deleteExperience, getExperience};