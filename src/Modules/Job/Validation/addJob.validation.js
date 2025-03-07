import joi from "joi";
import { generalFields } from "../../../Utils/Validation/validators/general.fields.js";

export const addJobValidation = joi.object().keys({
  jobTitle: generalFields.jobTitle.required(),
  jobLocation: generalFields.jobLocation.required(),
  jobDescription: generalFields.jobDescription.required(),
  workingTime: generalFields.workingTime.required(),
  seniorityLevel: generalFields.seniorityLevel.required(),
  technicalSkills: generalFields.technicalSkills.required(),
  softSkills: generalFields.softSkills.required(),

  companyId: generalFields.id.required(),
  ["authorization"]: generalFields.token.required(),
});
