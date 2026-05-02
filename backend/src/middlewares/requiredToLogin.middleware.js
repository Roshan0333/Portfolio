import jwt from "jsonwebtoken";
import userCookies from "../utils/userCookies.js";
import ApiError from "../utils/api-errors.js";

const securityKey = process.env.securityKey;

const requiredToLogin = async (req, res, next) => {
    try {

        const accessToken = req?.cookies?.AccessToken;
        const refreshToken = req?.cookies?.RefreshToken;

        if (accessToken) {
            const jwtVerify = await jwt.verify(accessToken, securityKey);
            if (!jwtVerify) {
                return res.status(401).json(new ApiError(401, "Please Login"));
            }

            req.user = jwtVerify.user
            return next();
        }
        else if (refreshToken) {
            const jwtVerify = await jwt.verify(refreshToken, securityKey);

            if (!jwtVerify) {
                return res.status(401).json(new ApiError(401, "Please Login"));
            }

            req.user = jwtVerify.user;

            await userCookies(res, req.user);
            return next()
        }
        else {
            return res.status(401).json(new ApiError(401, "Please Login"));
        }
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

export default requiredToLogin;