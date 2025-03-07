import Company from "../../../DB/Models/Company/Company.model.js";
import { defaultValues } from "../../../DB/Options/field.validation.js";
import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { successResponse } from "../../../Utils/Res/success.response.js";
import cloud from "../../../Utils/Upload/Cloudinary/Config/cloud.config.js";
import { folderTypes } from "../../../Utils/Upload/Cloudinary/Config/uploading.options.js";

export const uploadCompanyLogo = asnycHandler(async (req, res, next) => {
  const { logo, _id } = req.company;
  let company;
  const checkDefaultValues = logo.public_id == defaultValues.logo.public_id;

  const fileUpload = await cloud.uploader
    .upload(
      req.file.path,
      checkDefaultValues
        ? {
            folder: `${process.env.APP_NAME}/company/${_id}/${folderTypes.logo}`,
          }
        : { public_id: logo.public_id }
    )
    .then(async (data) => {
      const { secure_url, public_id } = data;

      company = await Company.findByIdAndUpdate(
        _id,
        { logo: { secure_url, public_id } },
        { lean: true, new: true, projection: "logo" }
      );
    });

  return successResponse(
    { res },
    { msg: "logo Uploaded Successfully", status: 200, data: company }
  );
});
