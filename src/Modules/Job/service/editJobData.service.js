import Job from "../../../DB/Models/Job/Job.model.js";
import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { generateMessage } from "../../../Utils/Messages/messages.generator.js";
import { successResponse } from "../../../Utils/Res/success.response.js";

export const editJobData = asnycHandler(async (req, res, next) => {
  const { _id: jobId } = req.job;
  const { _id: userId } = req.user;
  const { technicalSkills, softSkills, ...rest } = req.body;

  const editData = await Job.findByIdAndUpdate(
    jobId,
    {
      rest,
      ...(technicalSkills && {
        $addToSet: { technicalSkills: { $each: technicalSkills } },
      }),
      ...(softSkills && { $addToSet: { softSkills: { $each: softSkills } } }),

      updatedBy: userId,
    },
    {
      lean: true,
      new: true,
      projection: Object.keys(req.body).join(" "),
    }
  );
  return successResponse(
    { res },
    {
      msg: generateMessage("Company").success.updated.msg,
      status: 200,
      data: { editData },
    }
  );
});
