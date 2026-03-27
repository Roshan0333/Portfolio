import inggest from "../config/inngest.config.js";
import model from "../config/gemini.config.js";
import { getIO } from "../config/socket.config.js";

import profileModel from "../models/profile.model.js";
import certificateModel from "../models/certificate.model.js";
import educationModel from "../models/education.model.js";
import experienceModel from "../models/experience.model.js";
import projectModel from "../models/project.model.js";

export const portfolioAgent = inggest.createFunction(
    { id: "portfolio-agent" },
    { event: "portfolio-ask" },

    async ({ event, step }) => {
        const { question, socketId } = event.data;

        const intent = await step.run("intent", async () => {
            const res = await model.generateContent(
                `Classify query into:
profile, skills, education, experience, projects, certificates, general

Query: ${question}`
            );

            return res.response.text.trim().toLowerCase();
        });


        const data = await step.run("db", async () => {
            switch (intent) {
                case "profile":
                case "skills":
                    return await profileModel.findOne();

                case "education":
                    return await educationModel.find();

                case "experience":
                    return await experienceModel.find();

                case "projects":
                    return await projectModel.find();

                case "certificates":
                    return await certificateModel.find();

                default:
                    return {
                        profile: await profileModel.findOne(),
                        projects: await projectModel.find()
                    };
            }
        });

        const answer = await step.run("ai", async () => {
            const res = await model.generateContent(
                `
You are a professional portfolio assistant.

Answer ONLY using the data below.
If not found say: "I don't have that information yet."

Question:
${question}

Data:
${JSON.stringify(data)}
`
            );

            return res.response.text();
        })

        const io = getIO();

        io.to(socketId).emit("ai-response", {answer});

        return {answer}
    }
)