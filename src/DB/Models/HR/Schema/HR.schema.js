import { Schema, Types } from "mongoose";
import { generateMessage } from "../../../../Utils/Messages/messages.generator.js";

const hrSchema = new Schema(
  {
    hrId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, generateMessage("hrId").errors.required.error],
    },
    companyId: {
      type: Types.ObjectId,
      ref: "Company",
      required: [true, generateMessage("companyId").errors.required.error],
    },
  },
  { timestamps: true }
);

export default hrSchema;
