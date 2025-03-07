import joi from "joi";
import { generalFields } from "../../../Utils/Validation/validators/general.fields.js";
import { fileTypes } from "../../../Utils/Upload/Cloudinary/Config/uploading.options.js";

export const uploadCompanyCoverPicValidation = joi.object().keys({
  file: joi.object().keys({
    ...generalFields.file,
    mimetype: generalFields.fileType.mimetype
      .valid(...fileTypes.img)
      .required(),
  }),
  company: generalFields.id.required(),
  ["authorization"]: generalFields.token.required(),
});
