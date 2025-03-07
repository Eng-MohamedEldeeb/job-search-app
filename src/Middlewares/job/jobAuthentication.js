import Job from "../../DB/Models/Job/Job.model.js";
import { roles } from "../../DB/Models/User/Validation/User.validation.js";
import { asnycHandler } from "../../Utils/Errors/asyncHandler.js";
import { generateMessage } from "../../Utils/Messages/messages.generator.js";
import { errorResponse } from "../../Utils/Res/error.response.js";

export const jobAuthentication = ({
  select = "",
  options = {},
  inlcudeIsDeleted = false,
} = {}) => {
  return asnycHandler(async (req, res, next) => {
    // Token :
    const { id, jobId } = req.params;

    // User Searching :
    const job = await Job.findById(id || jobId, select, {
      lean: true,
      ...options,
    });

    //! If The job Wasn't Found:
    if (!job) {
      return errorResponse(
        { next },
        {
          error: generateMessage("Job").errors.notFound.error,
          status: 404,
        }
      );
    }

    //! If the User Wasn't The Owner Of The job Or Admin:
    if (job.addedBy.toString() != req.user._id.toString())
      return errorResponse(
        { next },
        {
          error: generateMessage("job").errors.notTheOwner.error,
          status: 403,
        }
      );

    req.job = job;

    return next();
  });
};
