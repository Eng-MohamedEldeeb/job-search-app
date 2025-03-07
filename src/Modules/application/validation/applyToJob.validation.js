import joi from "joi";
import { generalFields } from "../../../Utils/Validation/validators/general.fields.js";
import { fileTypes } from "../../../Utils/Upload/Cloudinary/Config/uploading.options.js";
export const applyToJobValidation = joi.object().keys({
  file: joi.object().keys({
    ...generalFields.file,
    mimetype: generalFields.fileType.mimetype
      .valid(...fileTypes.pdf)
      .required(),
  }),
  jobId: generalFields.id.required(),
  ["authorization"]: generalFields.token.required(),
});
