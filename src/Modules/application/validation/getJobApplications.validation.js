import joi from "joi";
import { generalFields } from "../../../Utils/Validation/validators/general.fields.js";
export const getJobApplicationsValidation = joi.object().keys({
  jobId: generalFields.id.required(),
  ["authorization"]: generalFields.token.required(),
});
