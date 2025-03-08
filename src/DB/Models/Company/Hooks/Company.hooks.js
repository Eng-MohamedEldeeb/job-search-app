import * as fieldValidation from "../../../Options/field.validation.js";

import cloud from "../../../../Utils/Upload/Cloudinary/Config/cloud.config.js";

import Job from "../../Job/Job.model.js";

export const post_findOneAndDelete = async function (doc, next) {
  const { _id, coverPic, legalAttachment, logo } = doc;
  const companyData = { companyId: _id };

  const coverCheck =
    coverPic.public_id != fieldValidation.defaultValues.coverPic.public_id;
  const logoCheck =
    logo.public_id != fieldValidation.defaultValues.logo.public_id;
  const legalAttachmentCheck =
    legalAttachment.public_id !=
    fieldValidation.defaultValues.legalAttachment.public_id;
  if (coverPic.public_id != fieldValidation.defaultValues.coverPic.public_id)
    await Promise.allSettled([
      Job.deleteMany(companyData),
      coverCheck && cloud.uploader.destroy(coverPic.public_id),
      logoCheck && cloud.uploader.destroy(logo.public_id),
      legalAttachmentCheck && cloud.uploader.destroy(legalAttachment.public_id),
    ]);
};
