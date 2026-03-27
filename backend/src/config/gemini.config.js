import {GoogleGenerativeAI} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.Gemini_Api_Key);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
});

export default model