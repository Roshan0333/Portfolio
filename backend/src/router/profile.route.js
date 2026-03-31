import {Router} from "express";
import multer from "multer";
import {createProfile, updateProfile, getProfile, uploadResume} from "../controllers/profile.controllers.js";
import requiredToLogin from "../middlewares/requiredToLogin.middleware.js";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limit: {fileSize: 10*1024*1024}
});

const router = Router();

router.route("/create").post(requiredToLogin, createProfile);
router.route("/update").put(requiredToLogin, updateProfile);
router.route("/get").get(getProfile);
router.route("/uploadResume").put(requiredToLogin, upload.single("Resume"), uploadResume);

export default router;
