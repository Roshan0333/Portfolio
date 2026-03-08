import certificateModel from "../models/certificate.model.js";
import {cloudinary} from "../config/cloudinary.config.js";
import ApiError from "../utils/api-errors.js";
import ApiResponse from "../utils/api-response.js";

const addCertificate = async (req, res) => {
    try{
        const {_id} = req.user;

        const {name, date, status, description} = req.body;

        if(!name || !date || !status){
            return res.status(400).json(new ApiError(400, "All Field is Required"));
        }

        if(!req.file){
            return res.status(400).json(new ApiError(400, "Certitifcate Image is Required"));
        }

        const imageUploaded = await cloudinary.uploader.upload(req.file);

        const image =imageUploaded.secure_url;

        const certificateDetail = certificateModel({
            userId: _id,
            name,
            image,
            description,
            date,
            status
        });

        await certificateDetail.save();

        if(!certificateDetail){
            return res.status(400).json(new ApiError(400, "Failed To Add New Certificate."));
        }

        return res.status(200).json(new ApiResponse(200, certificateDetail, "Certificate Add Successfully"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const updateCertidicate = async (req, res) => {
    try{
        const {certificateId, status} = req.body;

        if(!certificateId){
            return res.status(404).json(new ApiError(404, "CertificateId is Reqiuired"));
        }

        const certificateDetail = await certificateModel.findByIdAndUpdate(
            certificateId,
            {
                status
            }
        );

        if(!certificateDetail){
            return res.status(400).json(new ApiError(400, "Certificate Updating is Failed"));
        }

        return res.status(200).json(new ApiResponse(200, certificateDetail, "Certificate Detail Updated Successfully"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const deleteCertificate = async (req, res) => {
    try{
        const {certificateId} = req.body;

        if(!certificateId){
            return res.status(404).json(new ApiError(404, "Certificate Id is Required"));
        }

        await certificateModel.findByIdAndDelete(certificateId);

        return res.status(200).json(new ApiResponse(200, null, "Certificate Remove Successfully"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}


export {addCertificate, updateCertidicate, deleteCertificate};