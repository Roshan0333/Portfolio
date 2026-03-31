import inggest from "../config/inngest.config.js";
import { agent } from "./agent.js";
import {getIO} from "../config/socket.config.js";

export const portfolioAgent = inggest.createFunction(
    {
        id: "portfolio-agent",
        triggers: {event: "portfolio/ask"}
    },

    async ({event, step}) => {
        const {question, socketId} = event.data;

        const result = await step.run("agent-run", async () => {
            return await agent.run({
                message:[
                    {role: "user", content: question}
                ]
            })
        });

        const answer = result.output_text;

        const io = getIO();

        io.to(socketId).emit("ai-response", {answer});

        return {answer}
    }
)