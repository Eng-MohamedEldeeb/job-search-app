import Company from "../../../DB/Models/Company/Company.model.js";
import { defaultValues } from "../../../DB/Options/field.validation.js";
import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { successResponse } from "../../../Utils/Res/success.response.js";
import cloud from "../../../Utils/Upload/Cloudinary/Config/cloud.config.js";
import { folderTypes } from "../../../Utils/Upload/Cloudinary/Config/uploading.options.js";

export const uploadCompanyCoverPic = asnycHandler(async (req, res, next) => {
  const { coverPic, _id } = req.company;
  let company;
  const checkDefaultValues =
    coverPic.public_id == defaultValues.coverPic.public_id;

  const fileUpload = await cloud.uploader
    .upload(
      req.file.path,
      checkDefaultValues
        ? {
            folder: `${process.env.APP_NAME}/company/${_id}/${folderTypes.coverPic}`,
          }
        : { public_id: coverPic.public_id }
    )
    .then(async (data) => {
      const { secure_url, public_id } = data;

      company = await Company.findByIdAndUpdate(
        _id,
        { coverPic: { secure_url, public_id } },
        { lean: true, new: true, projection: "coverPic" }
      );
    });

  return successResponse(
    { res },
    { msg: "coverPic Uploaded Successfully", status: 200, data: company }
  );
});
