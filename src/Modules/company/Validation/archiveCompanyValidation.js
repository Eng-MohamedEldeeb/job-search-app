import joi from "joi";
import { generalFields } from "../../../Utils/Validation/validators/general.fields.js";

export const archiveCompanyValidation = joi.object().keys({
  company: generalFields.id.required(),
  ["authorization"]: generalFields.token.required(),
});
