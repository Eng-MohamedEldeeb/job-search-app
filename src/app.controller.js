// DB:
import { dbConnection } from "./DB/connection.js";

// GraphQL:
import { createHandler } from "graphql-http/lib/use/express";

// Routers:
import authRouter from "./Modules/auth/auth.controller.js";
import userRouter from "./Modules/user/user.controller.js";
import companyRouter from "./Modules/company/company.controller.js";
import applicationRouter from "./Modules/application/application.controller.js";
import chatRouter from "./Socket.Io/Modules/chat/chat.controller.js";

// Utils:
import { globalErrorHandler } from "./Utils/Errors/globalErrorHandler.js";
import { unknownUrlHandler } from "./Utils/Errors/unknownUrlHandler.js";
import schema from "./GraphQL/graphQL.controller.js";
import context from "./GraphQL/graphQL.context.js";
import rateLimit from "express-rate-limit";
import cors from "cors";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

var corsOptions = {
  origin: "*",
};

export const bootstrap = async (app, express) => {
  // DB Connection:
  dbConnection();

  // Parsing Req Body:
  app.use(express.json());

  // Express Limiter:
  app.use(limiter);

  // Cors Origin:
  app.use(cors(corsOptions));

  // Routers:
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/company", companyRouter);
  app.use("/application", applicationRouter);
  app.use("/chat", chatRouter);

  // GraphQL:
  app.use("/graphql", createHandler({ schema, context }));

  // Unknown Url:
  app.all("*", unknownUrlHandler);

  // Global Error Handler:
  app.use(globalErrorHandler);
};
