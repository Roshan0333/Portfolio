import authModel from "../models/auth.model";
import ApiError from "../utils/api-errors";

const emailPresent = async (req, res, next) => {
    try{
        const {email} = req.body;

        const isEmail = await authModel.findOne({email: email});

        if(!isEmail){
            return res.status(404).json(new ApiError(404, "Email is not found."));
        }

        return next();
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message}, {name: err.name}]));
    }
}

export default emailPresent;