import Application from "../../../DB/Models/Application/Application.model.js";
import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { errorResponse } from "../../../Utils/Res/error.response.js";
import { successResponse } from "../../../Utils/Res/success.response.js";
import cloud from "../../../Utils/Upload/Cloudinary/Config/cloud.config.js";
import { folderTypes } from "../../../Utils/Upload/Cloudinary/Config/uploading.options.js";

export const applyToJob = asnycHandler(async (req, res, next) => {
  const { jobId } = req.params;
  const { _id: userId } = req.user;

  // if (req.user.role != roles.user)
  //   return errorResponse(
  //     { next },
  //     {
  //       error: generateMessage("job").errors.notAllowed.error,
  //       status: 403,
  //     }
  //   );

  const application = await Application.create({
    jobId,
    userId,
  });
  const folder = `${process.env.APP_NAME}/company/${req.job.companyId.companyName}_${req.job.companyId._id}/job/${req.job._id}/applications/${application._id}/${folderTypes.userCV}`;

  const cvUploader = await cloud.uploader
    .upload(req.file.path, {
      folder,
    })
    .then(async (data) => {
      const { secure_url, public_id } = data;
      application.userCV = { secure_url, public_id };
      await application.save();
    })
    .catch((err) => {
      return errorResponse({ next }, { error: err.message, status: 500 });
    });

  return successResponse(
    { res },
    { msg: "Applied", status: 200, data: application }
  );
});
