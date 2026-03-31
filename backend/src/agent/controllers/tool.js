import profileModel from "../../models/profile.model.js";
import certificateModel from "../../models/certificate.model.js";
import educationModel from "../../models/education.model.js";
import experienceModel from "../../models/experience.model.js";
import projectModel from "../../models/project.model.js";

export const tools = [
    {
        name: "get_profile",
        description: "Get profile, skills and personal info",
        run: async () => await profileModel.findOne(),
    },
    {
        name:"get_education",
        description: "Get education details",
        run: async () => await educationModel.find(),
    },
    {
        name:"get_project",
        description:"Get all project",
        run: async () => await projectModel.find(),
    },
    {
        name:"get_certificate",
        description:"Get certificate",
        run: async () => await certificateModel.find(),
    },
    {
        name:"get_experience",
        description:"Get experience",
        run: async () => await experienceModel.find(),
    }
]