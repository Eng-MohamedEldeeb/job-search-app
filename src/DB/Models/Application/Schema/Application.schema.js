import { Schema, Types } from "mongoose";
import { status } from "../Validation/Application.validation.js";
import { generateMessage } from "../../../../Utils/Messages/messages.generator.js";

const applicationSchema = new Schema(
  {
    jobId: { type: Types.ObjectId, ref: "Job" },
    userId: { type: Types.ObjectId, ref: "User" },
    userCV: { secure_url: String, public_id: String },
    status: {
      type: String,
      enum: {
        values: Object.values(status),
        message: generateMessage(status).errors.enums.error,
      },
      default: status.pending,
    },
  },
  { timestamps: true }
);

export default applicationSchema;
