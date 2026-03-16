import {Router} from "express";
import {addEducation, updateEducationDetail, deleteEducation, getEducation} from "../controllers/education.controllers.js";
import requiredToLogin from "../middlewares/requiredToLogin.middleware.js";

const router = Router();

router.route("/add").post(requiredToLogin, addEducation);
router.route("/update").put(requiredToLogin, updateEducationDetail);
router.route("/delete").delete(requiredToLogin, deleteEducation);
router.route("get").get(getEducation)

export default router;