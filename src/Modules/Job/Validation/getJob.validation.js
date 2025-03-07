import joi from "joi";
import { generalFields } from "../../../Utils/Validation/validators/general.fields.js";

export const getJobValidation = joi.object().keys({
  filter: joi.boolean().valid(1, true, "true", "1"),
  jobTitle: generalFields.jobTitle,
  jobLocation: generalFields.jobLocation,
  workingTime: generalFields.workingTime,
  seniorityLevel: generalFields.seniorityLevel,
  technicalSkills: joi.string(),

  id: generalFields.id,
  company: joi.string(),
  ["authorization"]: generalFields.token.required(),
});
