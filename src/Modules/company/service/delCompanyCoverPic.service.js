import Company from "../../../DB/Models/Company/Company.model.js";
import { defaultValues } from "../../../DB/Options/field.validation.js";
import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { generateMessage } from "../../../Utils/Messages/messages.generator.js";
import { errorResponse } from "../../../Utils/Res/error.response.js";
import { successResponse } from "../../../Utils/Res/success.response.js";
import cloud from "../../../Utils/Upload/Cloudinary/Config/cloud.config.js";

export const delCompanyCoverPic = asnycHandler(async (req, res, next) => {
  if (defaultValues.coverPic.public_id === req.company.coverPic.public_id)
    return errorResponse(
      { next },
      { error: "No Cover Pic To Delete!", status: 400 }
    );

  cloud.uploader.destroy(req.company.coverPic.public_id);

  const company = await Company.findByIdAndUpdate(
    req.company._id,
    {
      coverPic: defaultValues.coverPic,
    },
    { lean: true, new: true, projection: "coverPic" }
  );

  return successResponse(
    { res },
    {
      msg: generateMessage("Company coverPic").success.deleted.msg,
      status: 200,
      data: company,
    }
  );
});
