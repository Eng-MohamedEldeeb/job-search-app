import { Router } from "express";
import { isAuthorized } from "../../../Middlewares/auth/isAuthorized.js";
import { isAuthenticated } from "../../../Middlewares/auth/isAuthenticated.js";
import { validation } from "../../../Utils/Validation/validation.js";
import { getChatValidation } from "./validation/getChat.validation.js";
import { getChat } from "./service/getChat.service.js";

const router = Router();

router.get(
  "/:userId",
  isAuthorized,
  isAuthenticated(),
  validation({ schema: getChatValidation, token: true }, getChat)
);
export default router;
