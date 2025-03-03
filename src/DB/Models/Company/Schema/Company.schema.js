import { Schema, Types } from "mongoose";
import { generateMessage } from "../../../../Utils/Messages/messages.generator.js";
import { maxEemployeesNumber } from "../Validation/Company.validation.js";
import * as fieldValidation from "../../../Options/field.validation.js";
import * as regex from "../../../../Utils/Validation/validators/regex.patterns.js";

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      trim: true,
      unique: [true, generateMessage("companyName").errors.alreadyExist.error],
      required: [true, generateMessage("companyName").errors.required.error],
    },
    companyEmail: {
      type: String,
      trim: true,
      unique: [true, generateMessage("companyEmail").errors.alreadyExist.error],
      required: [true, generateMessage("companyEmail").errors.required.error],
      validate: {
        validator: fieldValidation.validateField(regex.emailRegEx),
        message: generateMessage("companyEmail").errors.invalidFormate.error,
      },
    },
    numberOfEmployees: {
      type: [{ type: Types.ObjectId, ref: "User" }],
      validate: [maxEemployeesNumber, "{PATCH} Can't Be More Then 20 Employee"],
    },

    description: String,
    industry: String,
    address: String,

    logo: {
      secure_url: {
        type: String,
        default: fieldValidation.defaultValues.logo.secure_url,
      },
      public_id: {
        type: String,
        default: fieldValidation.defaultValues.logo.public_id,
      },
    },

    coverPic: {
      secure_url: {
        type: String,
        default: fieldValidation.defaultValues.coverPic.secure_url,
      },
      public_id: {
        type: String,
        default: fieldValidation.defaultValues.coverPic.public_id,
      },
    },

    legalAttachment: {
      secure_url: {
        type: String,
        default: fieldValidation.defaultValues.coverPic.secure_url,
      },
      public_id: {
        type: String,
        default: fieldValidation.defaultValues.coverPic.public_id,
      },
    },

    deletedAt: Date,
    bannedAt: Date,
    approvedByAdmin: Boolean,

    hrs: [{ type: Types.ObjectId, ref: "User" }],

    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default companySchema;
