import Company from "../../../../../DB/Models/Company/Company.model.js";
import { successResponse } from "../../../../utils/res/success.response.js";

export const approveCompany = async (_, args) => {
  const { companyId } = args;
  const data = await Company.findByIdAndUpdate(
    companyId,
    {
      approvedByAdmin: true,
    },
    {
      new: true,
      projection: "companyName approvedByAdmin",
    }
  );
  return successResponse({ data });
};
