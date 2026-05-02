import certificateModel from "../models/certificate.model.js";
import { cloudinary } from "../config/cloudinary.config.js";
import ApiError from "../utils/api-errors.js";
import ApiResponse from "../utils/api-response.js";
import client from "../config/redis.config.js"

const addCertificate = async (req, res) => {
    try {
        const { _id } = req.user;

        const { name, date,description } = req.body;

        if (!name || !date) {
            return res.status(400).json(new ApiError(400, "All Field is Required"));
        }

        if (!req.file) {
            return res.status(400).json(new ApiError(400, "Certitifcate Image is Required"));
        }

        const image = await new Promise((resolve, reject) => {
            const imageUpload = cloudinary.uploader.upload_stream(
                {folder:"Certificate"},
                (err, result) => {
                    if(err) reject(err);
                    else resolve(result.secure_url)
                }
            );
            imageUpload.end(req.file.buffer);
        })

        const certificateDetail = certificateModel({
            userId: _id,
            name,
            image,
            description,
            date
        });

        await certificateDetail.save();

        if (!certificateDetail) {
            return res.status(400).json(new ApiError(400, "Failed To Add New Certificate."));
        }

        await client.del("Certificate")

        return res.status(200).json(new ApiResponse(200, certificateDetail, "Certificate Add Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const updateCertidicate = async (req, res) => {
    try {
        const { certificateId, status } = req.body;

        if (!certificateId) {
            return res.status(404).json(new ApiError(404, "CertificateId is Reqiuired"));
        }

        const certificateDetail = await certificateModel.findByIdAndUpdate(
            certificateId,
            {
                status
            }
        );

        if (!certificateDetail) {
            return res.status(400).json(new ApiError(400, "Certificate Updating is Failed"));
        }

        await client.del("Certificate")

        return res.status(200).json(new ApiResponse(200, certificateDetail, "Certificate Detail Updated Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const deleteCertificate = async (req, res) => {
    try {
        const { certificateId } = req.body;

        if (!certificateId) {
            return res.status(404).json(new ApiError(404, "Certificate Id is Required"));
        }

        await certificateModel.findByIdAndDelete(certificateId);

        await client.del("Certificate")

        return res.status(200).json(new ApiResponse(200, null, "Certificate Remove Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const getCertificate = async (req, res) => {
    try {
        const redisCertificateDetails = await client.get("Certificate");

        if (redisCertificateDetails) {
            return res.status(200).json(new ApiResponse(200, JSON.parse(redisCertificateDetails), "Successfully"));
        }

        const certificateDetails = await certificateModel.find();

        if (certificateDetails.length === 0) {
            return res.status(404).json(new ApiError(404, "Not Certificate Details"));
        }

        await client.set("Certificate", JSON.stringify(certificateDetails));

        return res.status(200).json(new ApiResponse(200, certificateDetails, "Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}


export { addCertificate, updateCertidicate, deleteCertificate, getCertificate };