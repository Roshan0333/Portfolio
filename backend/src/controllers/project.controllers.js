import projectModel from "../models/project.model.js";
import { cloudinary } from "../config/cloudinary.config.js";
import ApiError from "../utils/api-errors.js";
import ApiResponse from "../utils/api-response.js";
import client from "../config/redis.config.js";

const deleteProjectCacheByVersion = async (version) => {
    try {
        if (!client || !client.isOpen) return;

        const versionStr = String(version || "1");
        const keys = [];

        for await (const key of client.scanIterator({
            MATCH: `projects:v${versionStr}:*`
        })) {
            if (key) keys.push(key);
        }

        if (keys.length > 0) {
            for (const key of keys) {
                try {
                    await client.del(key);
                } catch (e) {
                    console.error(`Failed to delete key ${key}:`, e.message);
                }
            }
        }
    } catch (err) {
        console.error("Non-fatal Redis Error:", err.message);
    }
};

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

        const homeImageUpload = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "portfolio/projects" },
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result.secure_url);
                }
            );

            stream.end(req.files[0].buffer)
        })

        const homeImage = homeImageUpload;

        const sectionImageFiles = req.files.slice(1);

        let parsedSection = [];
        const sectionParasd = JSON.parse(section);

        console.log(sectionParasd)

        if (section) {
            const sectionData = JSON.parse(section);

            parsedSection = await Promise.all(
                sectionData.map(async (item, index) => {
                    let imageUrl = "";
                    const currentFile = sectionImageFiles[index];

                    if (currentFile && currentFile.buffer) {
                        imageUrl = await new Promise((resolve, reject) => {
                            const stream = cloudinary.uploader.upload_stream(
                                { folder: "portfolio/project/sections" },
                                (err, result) => {
                                    if (err) reject(err);
                                    else resolve(result.secure_url)
                                });

                            stream.end(currentFile.buffer)
                        })
                    }

                    return {
                        image: imageUrl,
                        description: sectionParasd[index]
                    }
                })
            )
        }

        const socialMediaParsed = JSON.parse(socialMedia);
        const technologyParsed = JSON.parse(technology);
        const durationParsed = JSON.parse(durationTime);

        const projectDetail = new projectModel({
            usedId: _id,
            projectName,
            homeImage,
            technology: technologyParsed,
            durationTime: { start: durationParsed.start, end: durationParsed.end },
            role,
            shortBrifing,
            description,
            section: parsedSection,
            socialMedia: socialMediaParsed,
            status,
            faviourate
        });

        await projectDetail.save();

        const rawVersion = await client.get("projects:version");
        const versionToClear = rawVersion ? String(rawVersion) : "1";
        await deleteProjectCacheByVersion(versionToClear);
        await client.incr("projects:version");

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

        if (!projectDetail) {
            return res.status(400).json(new ApiError(400, "Failed to Update Project Status."));
        }

        const currentVersion = await client.get("projects:version") || 1;

        await deleteProjectCacheByVersion(currentVersion);

        await client.incr("projects:version");

        return res.status(200).json(new ApiResponse(200, projectDetail, "Project Update Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.body;

        if (!projectId) {
            return res.status(404).json(new ApiError(404, "Project Id is Required"));
        }

        await projectModel.findByIdAndDelete(projectId);

        const currentVersion = await client.get("projects:version") || 1;

        await deleteProjectCacheByVersion(currentVersion);

        await client.incr("projects:version");

        return res.status(200).json(new ApiResponse(200, null, [{ message: err.message, name: err.name }]));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const getProject = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const version = await client.get("projects:version") || 1;
        const cacheKey = `projects:v${version}:page:${page}`;
        const redisProjectDetails = await client.get(cacheKey);

        if (redisProjectDetails) {
            return res.status(200).json(new ApiResponse(200, JSON.parse(redisProjectDetails), "Successfully"));
        }

        const skip = (page - 1) * limit;

        const projectDetails = await projectModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        if (projectDetails.length === 0) {
            return res.status(404).json(new ApiError(404, "No Project Found"));
        }

        await client.set(cacheKey, JSON.stringify(projectDetails));

        return res.status(200).json(new ApiResponse(200, projectDetails, "Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!projectId) {
            return res.status(400).json(new ApiError(400, "Project Id is Required"));
        }

        const projectDetail = await projectModel.findById(projectId);

        if (!projectDetail) {
            return res.status(404).json(new ApiError(404, "Project not found"));
        }

        return res.status(200).json(new ApiResponse(200, projectDetail, "Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]))
    }
}

export { addProject, updateProject, deleteProject, getProject, getProjectById };