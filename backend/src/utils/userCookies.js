import jwtToken from "./jwt";
import ApiError from "./api-errors.js";

const userCookies = async (res, user) => {
    try{
        const {accessToken, refreshToken} = await jwtToken(user);

        res.cookie(accessToken, "AccessToken", {
            http: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 60*60*1000
        })

        res.cookie(refreshToken, "RefreshToken", {
            http: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 24*60*60*1000
        })
    }
    catch(err){
        return res.status(500).json(new ApiError(500, "Token generation failed"))
    }
}

export default userCookies;