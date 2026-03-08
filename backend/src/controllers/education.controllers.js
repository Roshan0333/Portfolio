import educationModel from "../models/education.model.js";
import ApiError from "../utils/api-errors.js";
import ApiResponse from "../utils/api-response.js";

const addEducation = async (req, res) => {
    try{
        const {_id} = req.user;

        const {schoolName, standed, grade, subject, description} = req.body;

        if(!schoolName || !standed || !grade || !subject || !description){
            return res.status(400).json(new ApiError(400, "All Field is Required"));
        }

        const educationDetail = educationModel({
            userId: _id,
            schoolName,
            standed,
            grade,
            subject,
            description
        });

        if(!educationDetail){
            return res.status(400).json(new ApiError(400, "Add Education is Failed"));
        }

        return res.status(200).json(new ApiResponse(200, educationDetail, "Education Update Successfully"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const updateEducationDetail = async (req, res) => {
    try{
        const {educationId, grade, subject, description} = req.body;

        if(!educationId){
            return res.status(404).json(new ApiError(404, "Education Id is Required"));
        }

        const educatioDetail = await educationModel.findByIdAndUpdate(
            educationId,
            {
                grade,
                subject,
                description
            }
        );

        if(!educatioDetail){
            return res.status(400).json(new ApiError(400, "Education Detail Updatation Failed"));
        }

        return res.status(200).json(new ApiResponse(200, educatioDetail, "Education Detail Update Successfully"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const deleteEducation = async (req, res) => {
    try{
        const {educationId} = req.body;

        if(!educationId){
            return res.status(404).json(new ApiError(404, "Education Id is Required"));
        }

        await educationModel.findByIdAndDelete(educationId);

        return res.status(200).json(new ApiResponse(200, null, "Education Remove Successfully"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

export {addEducation, updateEducationDetail, deleteEducation};