import joi from "joi";
import { generalFields } from "../../../Utils/Validation/validators/general.fields.js";

export const editJobDataValidation = joi.object().keys({
  jobTitle: generalFields.jobTitle,
  jobLocation: generalFields.jobLocation,
  jobDescription: generalFields.jobDescription,
  workingTime: generalFields.workingTime,
  seniorityLevel: generalFields.seniorityLevel,
  technicalSkills: generalFields.technicalSkills,
  softSkills: generalFields.softSkills,

  id: generalFields.id.required(),
  ["authorization"]: generalFields.token.required(),
});
