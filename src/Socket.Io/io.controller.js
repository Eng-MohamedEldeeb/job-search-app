import { Server } from "socket.io";
import { isAuthenticated } from "./Middlewares/isAuthenticated.js";
import { isAuthorized } from "./Middlewares/isAuthorized.js";
import { connectedUsers } from "../DB/Models/User/User.model.js";
import { sendMsg } from "./Modules/service/sendMsg.service.js";

export const runIo = (server) => {
  // Starting Io Server:
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  // middleWares:
  io.use(isAuthorized);
  io.use(isAuthenticated({ select: "_id firstName lastName userName" }));

  // starting realTime:
  return io.on("connection", async (socket) => {
    const { id, handshake, user } = socket;
    const { authorization } = handshake.auth;

    connectedUsers.set(user._id.toString(), id);

    io.emit("new_user", { userName: user.userName, id: user._id.toString() });

    console.log(connectedUsers);

    // services:
    await sendMsg(socket, io);

    // Handling Disconnection:
    socket.on("disconnect", () => {
      connectedUsers.delete(user._id);
    });
  });
};
