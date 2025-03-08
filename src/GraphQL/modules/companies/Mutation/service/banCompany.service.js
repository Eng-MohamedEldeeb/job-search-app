import Company from "../../../../../DB/Models/Company/Company.model.js";
import { successResponse } from "../../../../utils/res/success.response.js";
import { banActionTypes } from "../../../../utils/types/actions.types.js";

export const banCompany = async (_, args) => {
  const { companyId, action } = args;
  console.log(action == banActionTypes.ban.value);
  const data = await Company.findByIdAndUpdate(
    companyId,
    {
      ...(action == banActionTypes.ban.value
        ? {
            $set: { bannedAt: Date.now() },
          }
        : {
            $unset: { bannedAt: "" },
          }),
    },
    {
      new: true,
      projection: "companyName bannedAt",
    }
  );
  return successResponse({ data });
};
