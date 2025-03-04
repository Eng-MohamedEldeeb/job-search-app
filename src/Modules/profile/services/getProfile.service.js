import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { successResponse } from "../../../Utils/Res/success.response.js";
import { decryptValue } from "../../../Utils/Security/hash.js";

// Get User's Own Profile:
export const getProfile = asnycHandler(async (req, res, next) => {
  const user = req.user;
  user.phone = decryptValue({ payload: user.phone });

  return successResponse({ res }, { data: { user } });
}); //✅
