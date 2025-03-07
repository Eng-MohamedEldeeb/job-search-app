import Job from "../../../DB/Models/Job/Job.model.js";
import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { generateMessage } from "../../../Utils/Messages/messages.generator.js";
import { successResponse } from "../../../Utils/Res/success.response.js";

export const deleteJob = asnycHandler(async (req, res, next) => {
  const deletedJob = await Job.findByIdAndDelete(req.job._id);
  return successResponse(
    { res },
    {
      msg: generateMessage("Job").success.deleted.msg,
      status: 200,
      data: { deletedJob },
    }
  );
});
