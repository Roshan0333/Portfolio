import {Router} from "express";
import {addCertificate, updateCertidicate, deleteCertificate, getCertificate} from "../controllers/certificate.controllers.js";
import requiredToLogin from "../middlewares/requiredToLogin.middleware.js";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

router.route("/add").post(requiredToLogin, upload.single("Certificate"), addCertificate);
router.route("/update").patch(requiredToLogin, updateCertidicate);
router.route("/delete").delete(requiredToLogin, deleteCertificate);
router.route("/get").get(getCertificate);

export default router;
