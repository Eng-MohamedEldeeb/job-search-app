import { Types } from "mongoose";
import Company from "../../DB/Models/Company/Company.model.js";
import { roles } from "../../DB/Models/User/Validation/User.validation.js";
import { asnycHandler } from "../../Utils/Errors/asyncHandler.js";
import { generateMessage } from "../../Utils/Messages/messages.generator.js";
import { errorResponse } from "../../Utils/Res/error.response.js";

export const companyAuthentication = ({
  select = "",
  options = {},
  inlcudeIsDeleted = false,
} = {}) => {
  return asnycHandler(async (req, res, next) => {
    // Token :
    const { name, company } = { ...req.params, ...req.query };

    let companyData;

    if (name || (company && !Types.ObjectId.isValid(company))) {
      companyData = await Company.findOne(
        {
          companyName: name || company,
          deletedAt: { $exists: inlcudeIsDeleted },
        },
        select,
        { lean: true, ...options }
      );
    }

    if (company && Types.ObjectId.isValid(company)) {
      companyData = await Company.findOne(
        { _id: company, deletedAt: { $exists: inlcudeIsDeleted } },
        select,
        { lean: true, ...options }
      );
    }

    //! If The Company Wasn't Found:
    if (!companyData) {
      return errorResponse(
        { next },
        {
          error: generateMessage("Company").errors.notFound.error,
          status: 404,
        }
      );
    }

    //! If the User Wasn't The Owner Of The Company Or Admin:
    const authorizationCheck = [
      companyData.createdBy.toString(),
      ...companyData.hrs.map(String),
    ].includes(req.user._id.toString());

    if (!authorizationCheck || req.user.role !== roles.admin)
      return errorResponse(
        { next },
        {
          error: generateMessage("Company").errors.notTheOwner.error,
          status: 403,
        }
      );

    req.company = companyData;

    return next();
  });
};
