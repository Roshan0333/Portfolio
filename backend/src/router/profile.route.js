import {Router} from "express";
import {createProfile, updateProfile} from "../controllers/profile.controllers.js";
import requiredToLogin from "../middlewares/requiredToLogin.middleware.js";

const router = Router();

router.route("/create").post(requiredToLogin, createProfile);
route.route("/update").put(requiredToLogin, updateProfile);

export default router;
