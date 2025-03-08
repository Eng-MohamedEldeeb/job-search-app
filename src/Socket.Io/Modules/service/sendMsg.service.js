import Chat from "../../../DB/Models/Chat/Chat.model.js";
import { connectedUsers } from "../../../DB/Models/User/User.model.js";

export const sendMsg = (socket, io) => {
  return socket.on("sendMsg", async (data) => {
    const { to, msg } = data;

    console.log(data);
    console.log(connectedUsers.get(to));

    let chat = await Chat.findOne(
      {
        $or: [
          { senderId: to, receiverId: socket.user._id },
          { senderId: socket.user._id, receiverId: to },
        ],
      },
      "_id"
    );

    if (!chat) {
      chat = await Chat.create({
        senderId: socket.user._id,
        receiverId: to,
        messages: [{ message: msg, senderId: socket.user._id }],
      });
    } else {
      chat = await Chat.findByIdAndUpdate(
        chat._id,
        {
          $push: { messages: { message: msg, senderId: socket.user._id } },
        },
        {
          new: true,
          populate: [
            { path: "messages.senderId", select: "firstName lastName" },
          ],
        }
      );
    }

    socket.emit("successMsg", chat);

    io.to(connectedUsers.get(to)).emit("receiveMsg", {
      msg: msg,
      from: socket.user.userName,
    });
  });
};
