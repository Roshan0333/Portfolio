import InquireModel from "../models/inquire.model.js";
import { ApiError } from "../utils/api-errors.js";
import { ApiResponse } from "../utils/api-response.js";
import { informEmail } from "../utils/informEmail.js";
import { thanksEmail } from "../utils/thankEmail.js";

const addInquire = async (req, res) => {
    try {
        const { name, email, contact, message } = req.body;

        if (!name || !email || !contact) {
            return res.status(400).json(new ApiError(400, "Name, Email and Contact is Required"));
        }

        await InquireModel.create({
            name,
            email,
            contact,
            message
        });

        const thanksResult = await thanksEmail(email);
        const informResult = await informEmail(name, email, contact, message);

        if(!thanksEmail.status){
            const error = thanksResult?.error || ""
            return res.status(400).json(new ApiError(400, error))
        }

        if(!informResult.status){
            const error = informResult?.error || "";
            return res.status(400).json(new ApiError(400, error))
        }

        return res.status(200).json(new ApiResponse(200, null, "Successful"));

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const getInquire = async (req, res) => {
    try {
        const date = new Date();
        let startDate = date.getDate() - 7;

        const inquireDetails = await InquireModel.find({
            createdAt: {
                $gte: startDate,
                $lte: date
            }
        })
            .sort({ createdAt: -1 });

        if (inquireDetails.length === 0) {
            return res.status(404).json(new ApiError(404, "No Inquire Found"));
        }

        return res.status(200).json(new ApiResponse(200, inquireDetails));

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const updateStatus = async (req, res) => {
    try{
        const {inquireId} = req.params;

        const inquireDetails = await InquireModel.findByIdAndUpdate(
            inquireId,
            {
                status:"Applied"
            }
        );

        if(!inquireDetails){
            return res.status(404).json(new ApiError(404, "No inquire found"));
        }

        return res.status(200).json(new ApiResponse(200, null, "Successfully"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const deleteInquire = async (req, res) => {
    try{
        const {inquireId} = req.params;

        const inquireDetail = await InquireModel.findByIdAndDelete(inquireId);

        if(!inquireDetail){
            return res.status(404).json(new ApiError(404, "Inquire not found"));
        }

        return res.status(200).json(new ApiResponse(200, null, "Successful"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

export {addInquire, getInquire, updateStatus, deleteInquire};