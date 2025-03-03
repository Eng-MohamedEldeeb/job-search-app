// DB Models :
import OTP from "../../../DB/Models/OTP/OTP.model.js";
import User from "../../../DB/Models/User/User.model.js";

// Utils :
import { otpTypes } from "../../../DB/Models/OTP/Validation/OTP.validation.js";
import { asnycHandler } from "../../../Utils/Errors/asyncHandler.js";
import { generateMessage } from "../../../Utils/Messages/messages.generator.js";
import { errorResponse } from "../../../Utils/Res/error.response.js";
import { successResponse } from "../../../Utils/Res/success.response.js";

export const confirmEmail = asnycHandler(async (req, res, next) => {
  // E-mail Data :
  const { email } = req.body;

  // Search For Existed OTP With The Same E-mail :
  const existOtp = await OTP.findOne({
    email,
    otpType: otpTypes.confirmation,
  })
    .lean()
    .select({ otp: 1 });

  //! If The E-mail Already Requested an OTP Before :
  if (existOtp)
    return errorResponse(
      { next },
      { error: generateMessage().errors.codeAlreadySent.error, status: 400 }
    );

  // Search If The User Was Already Having An Acc Before With The Same Email :
  const user = await User.findOne({ email }).lean().select({ _id: 1 });

  //! If The User Already Existed :
  if (user)
    return errorResponse(
      { next },
      { error: generateMessage("User").errors.alreadyExist.error, status: 409 }
    );

  const data = await OTP.create({ email, otpType: otpTypes.confirmEmail });

  return successResponse(
    { res },
    {
      msg: generateMessage().success.sendOTP.msg,
      status: 201,
      data,
    }
  );
});
