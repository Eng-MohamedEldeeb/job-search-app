import joi from "joi";
import { generalFields } from "../../../Utils/Validation/validators/general.fields.js";
import { fileTypes } from "../../../Utils/Upload/Cloudinary/Config/uploading.options.js";

export const addCompanyValidation = joi.object().keys({
  companyName: generalFields.companyName.required(),
  companyEmail: generalFields.email.required(),
  description: generalFields.description,
  industry: generalFields.industry.required(),
  address: generalFields.address.required(),
  ["authorization"]: generalFields.token.required(),

  files: joi.object().keys({
    legalAttachment: joi.array().items(
      joi.object().keys({
        ...generalFields.file,
        mimetype: generalFields.fileType.mimetype.valid(...fileTypes.pdf),
      })
    ),
    logo: joi.array().items(
      joi.object().keys({
        ...generalFields.file,
        mimetype: generalFields.fileType.mimetype.valid(...fileTypes.img),
      })
    ),
    cover: joi.array().items(
      joi.object().keys({
        ...generalFields.file,
        mimetype: generalFields.fileType.mimetype.valid(...fileTypes.img),
      })
    ),
  }),
});
