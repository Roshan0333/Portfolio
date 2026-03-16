import {Router} from "express";
import {addExperience, updateExperience, deleteExperience, getExperience} from "../controllers/experience.controllers.js";
import requiredToLogin from "../middlewares/requiredToLogin.middleware.js";

const router = Router();

router.route("/add").post(requiredToLogin, addExperience);
router.route("/update").put(requiredToLogin, updateExperience);
router.route("/delete").delete(requiredToLogin, deleteExperience);
router.route("/get").get(getExperience);

export default router;
