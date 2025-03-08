import Chat from "../../../../DB/Models/Chat/Chat.model.js";
import { asnycHandler } from "../../../../Utils/Errors/asyncHandler.js";
import { successResponse } from "../../../../Utils/Res/success.response.js";

export const getChat = asnycHandler(async (req, res, next) => {
  const chat = await Chat.findOne(
    { $or: [{ senderId: userId }, { receiverId: userId }] },
    {},
    {
      populate: [
        {
          path: "senderId",
          select: "profilePic.secure_url firstName lastName userName",
        },
        {
          path: "receiverId",
          select: "profilePic.secure_url firstName lastName userName",
        },
        {
          path: "messages.senderId",
          select: "profilePic.secure_url firstName lastName userName",
        },
      ],
    }
  );
  return successResponse(
    { res },
    { msg: "done", status: 200, data: chat ? chat : "No Chat Found" }
  );
});
