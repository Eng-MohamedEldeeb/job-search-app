import sendEmail from "../../../../Utils/Emails/email.event.js";
import { emailTypes } from "../../../../Utils/Emails/Handler/sendEmail.handler.js";
import randomstring from "randomstring";
import { hashValue } from "../../../../Utils/Security/hash.js";

export const pre_save = function (next) {
  if (this.isModified("attempts")) return next();

  const otpCode = randomstring.generate({ length: 4, charset: "numeric" });
  this.otp = hashValue({ payload: otpCode });
  const otpType = this.otpType;

  sendEmail.emit("sendEmail", {
    emailType: emailTypes[otpType],
    email: this.email,
    otp: otpCode,
  });
  return next();
};
