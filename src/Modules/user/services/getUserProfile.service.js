import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { successResponse } from "../../../Utils/Res/success.response.js";

// Get Other User's Own Profile Profile:
export const getUserProfile = asnycHandler((req, res, next) => {
  return successResponse({ res }, { data: req.searchedUser });
}); //✅
