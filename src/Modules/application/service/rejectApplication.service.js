import Application from "../../../DB/Models/Application/Application.model.js";
import { status } from "../../../DB/Models/Application/Validation/Application.validation.js";
import sendEmail from "../../../Utils/Emails/email.event.js";
import { emailTypes } from "../../../Utils/Emails/Handler/sendEmail.handler.js";
import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { successResponse } from "../../../Utils/Res/success.response.js";

export const rejectApplication = asnycHandler(async (req, res, next) => {
  const { id } = req.params;

  const application = await Application.findByIdAndUpdate(
    id,
    { status: status.rejected },
    {
      lean: true,
      new: true,
      projection: "status",
      populate: [{ path: "userId", select: "email" }],
    }
  );

  sendEmail.emit("sendEmail", {
    emailType: emailTypes.applicationRejected,
    email: application.userId.email,
  });

  return successResponse(
    { res },
    { msg: "Rejected", status: 200, data: application }
  );
});
