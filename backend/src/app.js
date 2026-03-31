import express from "express";
import dotenv from "dotenv";
import cookiesParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./router/auth.route.js";
import profileRoutes from "./router/profile.route.js";
import educationRoutes from "./router/education.route.js";
import projectRoutes from "./router/project.route.js";
import experienceRoutes from "./router/experience.route.js";
import certificationRoutes from "./router/certificate.route.js";
import inquireRoutes from "./router/inquire.route.js";

import inngest from "./agent/config/inngest.config.js";;
import {serve} from 'inngest/express';
import {portfolioAgent} from "./agent/controllers/portfolioAgent.controllers.js";

dotenv.config();

const app = express();

app.use(cors(
    {
        origin:"http://localhost:5173",
        methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],
        credentials:true
    }
))

app.use(cookiesParser());

app.use(express.json())


app.use("/api/v1/portfolio/auth", authRoutes);
app.use("/api/v1/portfolio/profile", profileRoutes);
app.use("/api/v1/portfolio/education", educationRoutes);
app.use("/api/v1/portfolio/project", projectRoutes);
app.use("/api/v1/portfolio/experience", experienceRoutes);
app.use("/api/v1/portfolio/certficate", certificationRoutes);
app.use("/api/v1/portfolio/inquire", inquireRoutes);

app.use("/api/v1/agent", serve({
    client: inngest,
    functions:[portfolioAgent]
}))


export default app;
