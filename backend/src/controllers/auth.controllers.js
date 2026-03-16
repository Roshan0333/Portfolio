import authModel from "../models/auth.model.js";
import userCookies from "../utils/userCookies.js";
import ApiError from "../utils/api-errors.js";
import ApiResponse from "../utils/api-response.js";
import { passwordDecrypt, passwordEncrypt } from '../utils/bcrypt.js';
import { brevo } from "../config/brevo.config.js";
import client from "../config/redis.config.js";

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json(new ApiError(404, "Email and Password Both are Required"));
        }

        const hashPassword = await passwordEncrypt(password);

        const userDetail = await authModel({
            email,
            password: hashPassword
        });

        await userDetail.save();

        userDetail.password = undefined

        await userCookies(res, userDetail);

        await client.set("userEmail", email, {EX: 20});

        return res.status(200).json(new ApiResponse(200, userDetail, "Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]))
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json(new ApiError(404, "Email and Password Both are Required"));
        }

        const userDetail = await authModel.findOne({email: email});

        const passwordVerify = await passwordDecrypt(password, userDetail.password);

        if (!passwordVerify) {
            return res.status(401).json(new ApiError(401, "Password Incorrect"));
        }

        userDetail.password = undefined;

        await userCookies(res, userDetail);

        return res.status(200).json(new ApiResponse(200, userDetail, "Success Granted"));

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const forgetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json(new ApiError(404, "Email and Password are Both is Required"));
        }

        const hashPassword = await passwordEncrypt(password);

        const userDetail = await authModel.findOne(
            { email: email },
            { password: hashPassword }
        );

        userDetail.password = undefined;

        await userCookies(res, userDetail);

        return res.status(200).json(new ApiResponse(200, userDetail, "Password Forget Successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.messagem, [{ message: err.message, name: err.name }]));
    }
}

const signupOpt = async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json(new ApiError(400, "Email is Required"));
        }

        const otp = await parseInt(Math.random() * 10000);

        const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Email Verification</title>
  </head>

  <body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr>
  <td align="center">

  <table width="600" cellpadding="0" cellspacing="0"
  style="background:#ffffff;border-radius:10px;padding:30px;border:1px solid #e5e7eb;">

  <tr>
  <td align="center" style="padding-bottom:20px;">
  <h2 style="margin:0;color:#111827;">Verify Your Email</h2>
  </td>
  </tr>

  <tr>
  <td style="color:#374151;font-size:15px;line-height:1.6;text-align:center;">
  Thank you for signing up. Please use the verification code below to verify your email address.
  </td>
  </tr>

  <tr>
  <td align="center" style="padding:30px 0;">
  <div style="
  background:#111827;
  color:#ffffff;
  font-size:28px;
  letter-spacing:6px;
  font-weight:bold;
  padding:15px 30px;
  border-radius:8px;
  display:inline-block;
  ">
  ${otp}
  </div>
  </td>
  </tr>

  <tr>
  <td style="text-align:center;color:#6b7280;font-size:14px;">
  This OTP will expire in <b>5 minutes</b>. Please do not share this code with anyone.
  </td>
  </tr>

  <tr>
  <td style="padding-top:30px;text-align:center;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px;">
  Roshan Ansari<br>
  MERN Stack Developer
  </td>
  </tr>

  </table>

  </td>
  </tr>
  </table>

  </body>
  </html>
  `
        const result = await brevo(email, "Email Verification OTP", htmlContent);

        if(!result){
            return res.status(400).json(new ApiError(400, "Otp sending failed"));
        }

        return res.status(200).json(new ApiResponse(200, otp, "Otp send on Email your Successfully"));

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const forgetPasswordOtp = async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json(new ApiError(400, "Email is Required"));
        }

        const otp = await parseInt(Math.random() * 10000);

        const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Forget Password Email Verification</title>
  </head>

  <body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr>
  <td align="center">

  <table width="600" cellpadding="0" cellspacing="0"
  style="background:#ffffff;border-radius:10px;padding:30px;border:1px solid #e5e7eb;">

  <tr>
  <td align="center" style="padding-bottom:20px;">
  <h2 style="margin:0;color:#111827;">Verify Your Email</h2>
  </td>
  </tr>

  <tr>
  <td style="color:#374151;font-size:15px;line-height:1.6;text-align:center;">
  Thank you for signing up. Please use the verification code below to verify your email address.
  </td>
  </tr>

  <tr>
  <td align="center" style="padding:30px 0;">
  <div style="
  background:#111827;
  color:#ffffff;
  font-size:28px;
  letter-spacing:6px;
  font-weight:bold;
  padding:15px 30px;
  border-radius:8px;
  display:inline-block;
  ">
  ${otp}
  </div>
  </td>
  </tr>

  <tr>
  <td style="text-align:center;color:#6b7280;font-size:14px;">
  This OTP will expire in <b>5 minutes</b>. Please do not share this code with anyone.
  </td>
  </tr>

  <tr>
  <td style="padding-top:30px;text-align:center;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px;">
  Roshan Ansari<br>
  MERN Stack Developer
  </td>
  </tr>

  </table>

  </td>
  </tr>
  </table>

  </body>
  </html>
  `
        const result = await brevo(email, "Forget Password Email Verification OTP", htmlContent);

        if(!result){
            return res.status(400).json(new ApiError(400, "Otp sending failed"));
        }

        return res.status(200).json(new ApiResponse(200, otp, "Otp send on Email your Successfully"));

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

export {signup, login, forgetPassword, signupOpt, forgetPasswordOtp}