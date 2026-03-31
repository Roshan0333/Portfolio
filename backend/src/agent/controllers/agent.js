import {createAgent} from "@inngest/agent-kit";
import {tools} from "./tool.js";
import model from "../config/gemini.config.js";

export const agent = createAgent({
    name: "Portfolio AI Agent",
    model,
    tools,
    system:`
You are a professional portfolio assistant.

You must:
- Answer only using tool data
- Never make up answers
- Be clear and professional
`
})