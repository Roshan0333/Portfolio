import authModel from "../models/auth.model.js";
import ApiError from '../utils/api-errors.js';

const duplicateEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        const isEmail = await authModel.findOne({ email: email });

        if (isEmail) {
            return res.status(400).json(new ApiError(400, "Email Already Registered"));
        }

        return next();
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message }, { name: err.name }]));
    }
}

export default duplicateEmail;