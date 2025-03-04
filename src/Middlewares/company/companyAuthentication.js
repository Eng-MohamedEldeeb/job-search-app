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
    const { id, name } = { ...req.params, ...req.query };

    // User Searching :
    const company = await Company.findOne(
      {
        $or: [{ _id: id }, { companyName: name }],
        deletedAt: { $exists: inlcudeIsDeleted },
      },
      select,
      { lean: true, ...options }
    );

    //! If The Company Wasn't Found:
    if (!company) {
      return errorResponse(
        { next },
        {
          error: generateMessage("Company").errors.notFound.error,
          status: 404,
        }
      );
    }

    //! If the User Wasn't The Owner Of The Company Or Admin:
    if (
      !company.createdBy.equals(req.user._id) ||
      req.user.role !== roles.admin
    )
      return errorResponse(
        { next },
        {
          error: generateMessage().errors.notTheOwner.error,
          status: 403,
        }
      );

    req.company = company;

    return next();
  });
};
