import Company from "../../../DB/Models/Company/Company.model.js";
import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { generateMessage } from "../../../Utils/Messages/messages.generator.js";
import { successResponse } from "../../../Utils/Res/success.response.js";

export const getCompany = asnycHandler(async (req, res, next) => {
  return successResponse(
    { res },
    {
      msg: generateMessage("Company").success.updated.msg,
      status: 200,
      data: req.company,
    }
  );
});
