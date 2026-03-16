import {Router} from "express";
import {addCertificate, updateCertidicate, deleteCertificate, getCertificate} from "../controllers/certificate.controllers.js";
import requiredToLogin from "../middlewares/requiredToLogin.middleware.js";

const router = Router();

router.route("/add").post(requiredToLogin, addCertificate);
router.route("/update").patch(requiredToLogin, updateCertidicate);
router.route("/delete").delete(requiredToLogin, deleteCertificate);
route.route("/get").get(getCertificate);

export default router;
