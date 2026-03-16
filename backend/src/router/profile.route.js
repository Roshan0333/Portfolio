import {Router} from "express";
import {createProfile, updateProfile, getProfile} from "../controllers/profile.controllers.js";
import requiredToLogin from "../middlewares/requiredToLogin.middleware.js";

const router = Router();

router.route("/create").post(requiredToLogin, createProfile);
router.route("/update").put(requiredToLogin, updateProfile);
router.route("/get").get(getProfile);

export default router;
