import projectModel from "../models/project.model.js";
import { cloudinary } from "../config/cloudinary.config.js";
import ApiError from "../utils/api-errors.js";
import ApiResponse from "../utils/api-response.js";

const addProject = async (req, res) => {
    try {
        const { _id } = req.user;

        const { projectName, technology, durationTime, role, shortBrifing, description, section, socialMedia, status, faviourate } = req.body;

        if (!projectName || !technology || !durationTime || !role || !shortBrifing || !description || !section) {
            return res.status(400).json(new ApiError(400, "All Field are Required"));
        }

        if (!req.files) {
            return res.status(400).json(new ApiError(400, "Project Image is Required"));
        }

        const homeImageUpload = await cloudinary.uploader.upload(req.files[0].path, {
            folder: "portfolio/projects"
        });

        const homeImage = homeImageUpload.secure_url;

        const sectionImageFiles = req.files.slice[1];

        let parsedSection = [];

        if (section) {
            const sectionData = JSON.parse(section);

            parsedSection = await Promise.all(
                sectionData.map(async (item, index) => {
                    let imageUrl = "";

                    if (sectionImageFiles[index]) {
                        const upload = await cloudinary.uploader.upload(req.files[index].path, {
                            folder: "portfolio/project/sections"
                        });

                        imageUrl = upload.secure_url;
                    }

                    return {
                        image: imageUrl,
                        description: item.description
                    }
                })
            )
        }

        const projectDetail = projectModel({
            usedId: _id,
            projectName,
            homeImage,
            technology,
            durationTime,
            role,
            shortBrifing,
            description,
            section: parsedSection,
            socialMedia,
            status,
            faviourate
        });

        await projectDetail.save();

        return res.status(200).json(new ApiResponse(200, projectDetail, "Project Add Successfully"));


    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const updateProject = async (req, res) => {
    try {
        const { projectId, status, faviourate } = req.body;

        if (!projectId) {
            return req.status(400).json(new ApiError(400, err.message, [{ message: err.message, name: err.name }]));
        }

        const projectDetail = await projectModel.findByIdAndUpdate(
            projectId,
            {
                status,
                faviourate
            });

            if(!projectDetail){
                return res.status(400).json(new ApiError(400, "Failed to Update Project Status."));
            }

            return res.status(200).json(new ApiResponse(200, projectDetail, "Project Update Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const deleteProject = async (req, res) => {
    try{
        const {projectId} = req.body;

        if(!projectId){
            return res.status(404).json(new ApiError(404, "Project Id is Required"));
        }

        await projectModel.findByIdAndDelete(projectId);

        return res.status(200).json(new ApiResponse(200, null, [{message: err.message, name: err.name}]));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

export {addProject, updateProject, deleteProject};