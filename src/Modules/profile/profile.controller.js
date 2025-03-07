// Routers :
import { Router } from "express";

// Services :
import { getProfile } from "./services/getProfile.service.js";
import {
  confirmNewEmail,
  updateProfile,
} from "./services/updateProfile.service.js";
import {
  changePassword,
  confirmNewPassword,
} from "./services/changePassword.service.js";

// Selections :
import * as profileSelection from "./profile.select.js";

// Validations :
import * as profileValidation from "./profile.validation.js";
import { validation } from "../../Utils/Validation/validation.js";
import { validateOTP } from "../../Middlewares/auth/validateOTP.js";
import { otpTypes } from "../../DB/Models/OTP/Validation/OTP.validation.js";

// Files :
import { fileReader } from "../../Utils/Upload/fileReader.js";
import { fileTypes } from "../../Utils/Upload/Cloudinary/Config/uploading.options.js";

// Authorizations :
import { isAuthorized } from "../../Middlewares/auth/isAuthorized.js";
import { isAuthenticated } from "../../Middlewares/auth/isAuthenticated.js";

const router = Router();

/**
 * @method GET
 * @link /user/profile
 * @description Get User's Own Profile
 **/
router.get(
  "/",
  isAuthorized,
  isAuthenticated({
    select: profileSelection.getProfile.select,
  }),
  getProfile
); //✅

/**
 * @method PATCH
 * @link /user/profile/edit
 * @description Edit User's Own Profile
 **/
router.patch(
  "/edit",
  fileReader({ fileType: fileTypes.img }).single("profilePic"),
  validation({
    schema: profileValidation.updateProfile,
    token: "authorization",
  }),
  isAuthorized,
  isAuthenticated({
    select: profileSelection.updateProfile.select,
  }),
  updateProfile
); //✅

/**
 * @method PUT
 * @link /user/profile/confirm-new-email
 * @description Confirm User's New E-mail
 **/

router.put(
  "/confirm-new-email",
  validation({
    schema: profileValidation.confirmNewEmail,
    otp: "confirmation-code",
  }),
  isAuthorized,
  isAuthenticated({
    select: profileSelection.confirmNewEmail.select,
  }),
  validateOTP({
    otpType: otpTypes.verifyEmail,
    otpFieldName: "confirmation-code",
  }),
  confirmNewEmail
); //✅

/**
 * @method Post
 * @link /user/profile/change-password
 * @description request Change Password Confirmation
 **/
router.post(
  "/change-password",
  isAuthorized,
  isAuthenticated({
    select: profileSelection.changePassword.select,
  }),
  changePassword
); //✅

/**
 * @method PUT
 * @link /user/profile/change-password
 * @description request Change Password Confirmation
 **/
router.put(
  "/new-password",
  validation({
    schema: profileValidation.confirmNewPassword,
    otp: "confirmation-code",
  }),
  isAuthorized,
  isAuthenticated({
    select: profileSelection.confirmNewPassword.select,
  }),
  confirmNewPassword
); //✅

export default router;
