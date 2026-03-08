import {Router} from "express";
import {addProject, updateProject, deleteProject} from "../controllers/project.controllers.js";
import requiredToLogin from "../middlewares/requiredToLogin.middleware.js";

const router = Router();

router.route("/add").post(requiredToLogin, addProject);
router.route("/update").patch(requiredToLogin, updateProject);
router.route("/delete").delete(requiredToLogin, deleteProject);

export default router;
