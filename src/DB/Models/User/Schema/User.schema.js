import { Schema, Types } from "mongoose";
import * as regex from "../../../../Utils/Validation/validators/regex.patterns.js";
import * as fieldValidation from "../../../Options/field.validation.js";
import { generateMessage } from "../../../../Utils/Messages/messages.generator.js";
import {
  genders,
  passwordLength,
  providerTypes,
  roles,
} from "../Validation/User.validation.js";

const userSchema = new Schema(
  {
    // User Info :
    firstName: {
      type: String,
      required: [true, generateMessage("First Name").errors.required.error],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, generateMessage("Last Name").errors.required.error],
      trim: true,
    },
    age: Number,

    // Email :
    email: {
      type: String,
      validate: {
        validator: fieldValidation.validateField(regex.emailRegEx),
        message: generateMessage("email").errors.invalidFormate.error,
      },
      unique: [true, generateMessage("email").errors.alreadyExist.error],
      required: [true, generateMessage("email").errors.required.error],
      trim: true,
    },

    tempEmail: {
      type: String,
      validate: {
        validator: fieldValidation.validateField(regex.emailRegEx),
        message: generateMessage("email").errors.invalidFormate.error,
      },
      trim: true,
    },

    // Password :
    password: {
      type: String,
      minlength: [
        fieldValidation.fieldLength({
          fieldName: "Password",
          min: passwordLength.min,
        }).min.value,
        fieldValidation.fieldLength({
          fieldName: "Password",
          min: passwordLength.min,
        }).min.msg,
      ],
      maxlength: [
        fieldValidation.fieldLength({
          fieldName: "Password",
          max: passwordLength.max,
        }).max.value,
        fieldValidation.fieldLength({
          fieldName: "Password",
          max: passwordLength.max,
        }).max.msg,
      ],
      validate: {
        validator: fieldValidation.validateField(regex.passwordRegEx),
        message: generateMessage("Password").errors.invalidFormate.error,
      },
      required: (data) => {
        return data.provider === providerTypes.google ? false : true;
      },
    },
    passwords: [String],

    phone: {
      type: String,
      trim: true,
    },

    profilePic: {
      secure_url: {
        type: String,
        default: fieldValidation.defaultValues.profilePic.secure_url,
      },
      public_id: {
        type: String,
        default: fieldValidation.defaultValues.profilePic.public_id,
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

    // Enums:
    role: {
      type: String,
      enum: {
        values: Object.values(roles),
        message: generateMessage(roles).errors.enums.error,
      },
      default: roles.user,
    },

    gender: {
      type: String,
      enum: {
        values: Object.values(genders),
        message: generateMessage(genders).errors.enums.error,
      },
      default: genders.male,
    },

    provider: {
      type: String,
      enum: {
        values: Object.values(providerTypes),
        message: generateMessage(providerTypes).errors.enums.error,
      },
      default: providerTypes.system,
    },

    // Profile Status :
    isConfirmed: Boolean,
    changeCredentialTime: Date,
    deletedAt: Date,
    bannedAt: Date,

    updatedBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,

    // Virtuals ;
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

export default userSchema;
