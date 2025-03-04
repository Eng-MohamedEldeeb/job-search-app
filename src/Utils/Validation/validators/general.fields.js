import joi from "joi";
import * as regex from "./regex.patterns.js";
import { validateObjID } from "./objectId.validation.js";
import { passwordLength } from "../../../DB/Models/User/Validation/User.validation.js";

import { otpLength } from "../../../DB/Models/OTP/Validation/OTP.validation.js";

export const generalFields = {
  // User
  email: joi.string().email(),
  password: joi
    .string()
    .pattern(regex.passwordRegEx)
    .min(passwordLength.min)
    .max(passwordLength.max),
  phone: joi.string().pattern(regex.phoneRegEx),

  // Company
  companyName: joi.string(),
  description: joi.string(),
  industry: joi.string(),
  address: joi.string(),

  // OTP
  otp: joi.string().max(otpLength.max),

  // Token
  token: joi.string(),

  // ObjID
  id: joi.string().custom(validateObjID),

  // Files
  file: {
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required(),
    size: joi.number().required(),
  },
  fileType: {
    mimetype: joi.string(),
  },
  files: joi.array().items(joi.ref("file")),
};
