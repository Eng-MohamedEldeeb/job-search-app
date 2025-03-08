import joi from "joi";
import { generalFields } from "../../../../Utils/Validation/validators/general.fields.js";

export const getChatValidation = joi.object().keys({
  userId: generalFields.id.required(),
  ["authorization"]: generalFields.token.required(),
});
