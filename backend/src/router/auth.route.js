import {Router} from "express";
import {signup, signupOpt, login, forgetPassword, forgetPasswordOtp} from "../controllers/auth.controllers.js";
import duplicateEmail from "../middlewares/duplicateEmail.middleware.js";
import emailPresent from "../middlewares/emailPresent.middleware.js";

const router = Router();

router.route("/signupOtp").post(duplicateEmail, signupOpt);
router.route("/signup").post(signup);
router.route("/login").post(emailPresent, login);
router.route("/forgetPasswordOtp").post(emailPresent, forgetPasswordOtp);
router.route("/forgetPassword").patch(forgetPassword);

export default router
