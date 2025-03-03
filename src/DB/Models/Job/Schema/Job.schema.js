import { Schema, Types } from "mongoose";
import { generateMessage } from "../../../../Utils/Messages/messages.generator.js";
import {
  jobLocationTypes,
  seniorityLevelTypes,
  workingTimeTypes,
} from "../Validation/Job.validation.js";

const jobSchema = new Schema(
  {
    jobTitle: String,
    jobDescription: String,
    technicalSkills: [String],
    softSkills: [String],

    jobLocation: {
      type: String,
      enum: {
        values: Object.values(jobLocationTypes),
        message: generateMessage(jobLocationTypes).errors.enums.error,
      },
      default: jobLocationTypes.hybrid,
    },
    workingTime: {
      type: String,
      enum: {
        values: Object.values(workingTimeTypes),
        message: generateMessage(workingTimeTypes).errors.enums.error,
      },
      default: workingTimeTypes.fullTime,
    },
    seniorityLevel: {
      type: String,
      enum: {
        values: Object.values(seniorityLevelTypes),
        message: generateMessage(seniorityLevelTypes).errors.enums.error,
      },
      default: seniorityLevelTypes.midLevel,
    },

    addedBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, generateMessage("addedBy").errors.required.error],
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, generateMessage("updatedBy").errors.required.error],
    },
    companyId: {
      type: Types.ObjectId,
      ref: "Company",
      required: [true, generateMessage("companyId").errors.required.error],
    },
    closed: Boolean,
  },
  { timestamps: true }
);

export default jobSchema;
