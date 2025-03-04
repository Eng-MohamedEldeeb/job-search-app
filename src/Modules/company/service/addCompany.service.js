import Company from "../../../DB/Models/Company/Company.model.js";
import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { generateMessage } from "../../../Utils/Messages/messages.generator.js";
import { successResponse } from "../../../Utils/Res/success.response.js";
import cloud from "../../../Utils/Upload/Cloudinary/Config/cloud.config.js";
import { folderTypes } from "../../../Utils/Upload/Cloudinary/Config/uploading.options.js";

export const addCompany = asnycHandler(async (req, res, next) => {
  const user = req.user;

  if (req.files) {
    const company = await Company.create({
      ...req.body,
      createdBy: user._id,
    });

    const logo = (req.files.logo && req.files.logo[0].path) || null;
    const cover = (req.files.logo && req.files.logo[0].path) || null;
    const legalAttachment = (req.files.logo && req.files.logo[0].path) || null;

    const saveFolderPath = (fieldName) => {
      return (data) => {
        const { secure_url, public_id } = data;
        company[fieldName] = { secure_url, public_id };
      };
    };
    await Promise.allSettled([
      cloud.uploader
        .upload(logo && logo, {
          folder: `${process.env.APP_NAME}/company/${company._id}/${folderTypes.logo}`,
        })
        .then(saveFolderPath("logo")),
      cloud.uploader
        .upload(cover && cover, {
          folder: `${process.env.APP_NAME}/company/${company._id}/${folderTypes.coverPic}`,
        })
        .then(saveFolderPath("coverPic")),
      cloud.uploader
        .upload(legalAttachment && legalAttachment, {
          folder: `${process.env.APP_NAME}/company/${company._id}/${folderTypes.legalAttachment}`,
        })
        .then(saveFolderPath("legalAttachment")),
    ]);
    return successResponse(
      { res },
      {
        msg: generateMessage("Company").success.created.msg,
        status: 201,
        data: { company },
      }
    );
  }

  const company = await Company.create({
    ...req.body,
    createdBy: user._id,
  });

  return successResponse(
    { res },
    {
      msg: generateMessage("Company").success.created.msg,
      status: 201,
      data: { company },
    }
  );
});
