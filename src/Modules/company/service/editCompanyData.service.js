import Company from "../../../DB/Models/Company/Company.model.js";
import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { generateMessage } from "../../../Utils/Messages/messages.generator.js";
import { successResponse } from "../../../Utils/Res/success.response.js";

export const editCompanyData = asnycHandler(async (req, res, next) => {
  const editData = await Company.findByIdAndUpdate(req.company._id, req.body, {
    lean: true,
    new: true,
    projection: `${Object.keys(req.body).join(" ")}`,
  });
  return successResponse(
    { res },
    {
      msg: generateMessage("Company").success.updated.msg,
      status: 200,
      data: { editData },
    }
  );
});
