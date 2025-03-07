import joi from "joi";
import { generalFields } from "../../../Utils/Validation/validators/general.fields.js";

export const editCompanyDataValidation = joi.object().keys({
  company: generalFields.id.required(),
  companyName: generalFields.companyName,
  companyEmail: generalFields.email,
  description: generalFields.description,
  industry: generalFields.industry,
  address: generalFields.address,
  ["authorization"]: generalFields.token.required(),
});
