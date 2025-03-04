import { dbConnection } from "./DB/connection.js";
import authRouter from "./Modules/auth/auth.controller.js";
import userRouter from "./Modules/user/user.controller.js";
import companyRouter from "./Modules/company/company.controller.js";
import { globalErrorHandler } from "./Utils/Errors/globalErrorHandler.js";
import { unknownUrlHandler } from "./Utils/Errors/unknownUrlHandler.js";

export const bootstrap = async (app, express) => {
  // DB Connection
  dbConnection();

  // Parsing Req Body
  app.use(express.json());

  // Routers
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/company", companyRouter);

  // Unknown Url
  app.all("*", unknownUrlHandler);

  // Global Error Handler
  app.use(globalErrorHandler);
};
