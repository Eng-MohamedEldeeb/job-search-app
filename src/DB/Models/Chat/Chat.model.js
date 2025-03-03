import { model } from "mongoose";
import chatSchema from "./Schema/Chat.schema.js";

const Chat = model("Chat", chatSchema);

export default Chat;
