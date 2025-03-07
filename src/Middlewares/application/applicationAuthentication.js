import Application from "../../DB/Models/Application/Application.model.js";
import Job from "../../DB/Models/Job/Job.model.js";
import { roles } from "../../DB/Models/User/Validation/User.validation.js";
import { asnycHandler } from "../../Utils/Errors/asyncHandler.js";
import { generateMessage } from "../../Utils/Messages/messages.generator.js";
import { errorResponse } from "../../Utils/Res/error.response.js";

export const applicationAuthentication = ({
  select = "",
  options = {},
  inlcudeIsDeleted = false,
} = {}) => {
  return asnycHandler(async (req, res, next) => {
    // Token :
    const { id } = req.params;

    // User Searching :
    const application = await Application.findById(id, select, {
      lean: true,
      ...options,
    });

    const { hrs } = application.jobId.companyId;

    //! If The job Wasn't Found:
    if (!application) {
      return errorResponse(
        { next },
        {
          error: generateMessage("Application").errors.notFound.error,
          status: 404,
        }
      );
    }

    //! If the User Wasn't In The Hrs List:
    if (!hrs.map(String).includes(req.user._id.toString()))
      return errorResponse(
        { next },
        {
          error: generateMessage("job").errors.notAllowed.error,
          status: 403,
        }
      );

    req.application = application;

    return next();
  });
};
