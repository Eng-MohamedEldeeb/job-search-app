import Job from "../../../DB/Models/Job/Job.model.js";
import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { generateMessage } from "../../../Utils/Messages/messages.generator.js";
import { successResponse } from "../../../Utils/Res/success.response.js";

export const addJob = asnycHandler(async (req, res, next) => {
  const { _id: companyId } = req.company;
  const { _id: addedBy } = req.user;

  const jobData = await Job.create({ ...req.body, addedBy, companyId });

  return successResponse(
    { res },
    {
      msg: generateMessage("Job").success.created.msg,
      status: 201,
      data: jobData,
    }
  );
});
