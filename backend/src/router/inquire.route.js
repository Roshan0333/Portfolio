import {Router} from "express";
import requiredToLogin from "../middlewares/requiredToLogin.middleware.js";
import {addInquire, getInquire, updateStatus, deleteInquire} from "../controllers/inquire.controllers.js";

const router = Router();

router.route("/add").post(addInquire);
router.route("/get").get(requiredToLogin, getInquire);
router.route("/update").patch(requiredToLogin, updateStatus);
router.route("/delete").delete(requiredToLogin, deleteInquire);

export default router