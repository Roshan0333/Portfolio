import {Router} from "express";
import multer from "multer";
import {createProfile, updateProfile, getProfile, uploadResume, addSkills, deleteSkills, addSocialMedia, deleteSocialMedia} from "../controllers/profile.controllers.js";
import requiredToLogin from "../middlewares/requiredToLogin.middleware.js";

const storage = multer.memoryStorage();

const upload = multer({
    storage
});

const router = Router();

router.route("/create").post(requiredToLogin, upload.single("ProfileImage"), createProfile);
router.route("/update").put(requiredToLogin, upload.single("ProfileImage"), updateProfile);
router.route("/get").get(getProfile);
router.route("/uploadResume").put(requiredToLogin, upload.single("Resume"), uploadResume);
router.route("/skill").patch(requiredToLogin, upload.single("Skill"), addSkills);
router.route("/skillRemove").patch(requiredToLogin, deleteSkills);
router.route("/media").patch(requiredToLogin, upload.single("media"), addSocialMedia);
router.route("/mediaRemove").patch(requiredToLogin, deleteSocialMedia);

export default router;
