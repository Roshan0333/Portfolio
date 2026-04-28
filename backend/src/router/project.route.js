import {Router} from "express";
import {addProject, updateProject, deleteProject, getProject, getProjectById} from "../controllers/project.controllers.js";
import requiredToLogin from "../middlewares/requiredToLogin.middleware.js";
import multer from "multer"

const router = Router();

const storage = multer.memoryStorage();

const upload = multer({storage})

router.route("/add").post(requiredToLogin, upload.array("Project"), addProject);
router.route("/update").patch(requiredToLogin, updateProject);
router.route("/delete").delete(requiredToLogin, deleteProject);
router.route("/get").get(getProject);
router.route("/get/:id").get(getProjectById)

export default router;
