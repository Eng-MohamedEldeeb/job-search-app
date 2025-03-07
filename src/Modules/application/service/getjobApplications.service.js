import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { successResponse } from "../../../Utils/Res/success.response.js";

export const getJobApplications = asnycHandler(async (req, res, next) => {
  return successResponse(
    { res },
    { msg: "done", status: 200, data: { applications: req.job.applications } }
  );
});
