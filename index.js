import express from "express";
import { bootstrap } from "./src/app.controller.js";
import { runIo } from "./src/Socket.Io/io.controller.js";

const app = express();
const port = process.env.PORT || 3000;

await bootstrap(app, express);

const server = app.listen(port, () =>
  console.log("Server Is Running On Port =>", port)
);

const io = runIo(server);
