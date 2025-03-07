import Job from "../../../DB/Models/Job/Job.model.js";
import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { successResponse } from "../../../Utils/Res/success.response.js";

export const getCompanyJobs = asnycHandler(async (req, res, next) => {
  const { id } = req.params;
  const { filter, ...rest } = req.query;

  let job;

  if (id) {
    job = await Job.findById(id, {}, { lean: true });
  } else if (filter) {
    job = await Job.find({
      ...rest,
      ...(rest.technicalSkills && {
        technicalSkills: rest.technicalSkills,
      }),
      // ...(rest.softSkills && {
      //   $addToSet: { softSkills: { $each: softSkills } },
      // })
    });
  } else {
    job = await Job.find({ companyId: req.company._id });
  }
  return successResponse(
    { res },
    {
      msg: "Done",
      status: 200,
      data: job,
    }
  );
});
