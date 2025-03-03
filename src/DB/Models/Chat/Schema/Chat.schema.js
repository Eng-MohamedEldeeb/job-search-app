import { Schema, Types } from "mongoose";

const chatSchema = new Schema(
  {
    senderId: { type: Types.ObjectId, ref: "User" },
    receiverId: { type: Types.ObjectId, ref: "User" },
    messages: [
      { message: String, senderId: { type: Types.ObjectId, ref: "User" } },
    ],
  },
  { timestamps: true }
);

export default chatSchema;
