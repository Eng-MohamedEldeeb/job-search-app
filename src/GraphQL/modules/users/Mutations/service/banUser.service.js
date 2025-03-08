import User from "../../../../../DB/Models/User/User.model.js";
import { successResponse } from "../../../../utils/res/success.response.js";
import { banActionTypes } from "../../../../utils/types/actions.types.js";

export const banUser = async (_, args) => {
  const { userId, action } = args;
  console.log(action == banActionTypes.ban.value);
  const data = await User.findByIdAndUpdate(
    userId,
    {
      ...(action == banActionTypes.ban.value
        ? {
            $set: { bannedAt: Date.now() },
          }
        : {
            $unset: { bannedAt: "" },
          }),
    },
    {
      new: true,
      projection: "userName firstName lastName bannedAt",
    }
  );
  return successResponse({ data });
};
