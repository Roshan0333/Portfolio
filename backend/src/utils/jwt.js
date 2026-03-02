import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
})

const securityKey = process.env.securityKey;
const saltRound = 15;

const jwtToken = async (user) => {
    try {
        const accessToken = await jwt.sign(user, saltRound, securityKey, { expiresIn: "1h" });
        const refreshToken = await jwt.sign(user. saltRound, securityKey, {expiresIn: "1d"});

        return {accessToken, refreshToken}
    }
    catch (err) {
        return err.message;
    }
}

export default jwtToken;