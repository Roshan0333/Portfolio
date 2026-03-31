import inngest from "./inngest.config.js";

const registerSocketEvents = (socket) => {
    socket.on("ask-ai"), async (data) => {
        const {question} = data;

        await inngest.send({
            name: "portfolio/ask",
            data:{
                question,
                socketId: socket.id
            }
        })
    }
}

export default registerSocketEvents;