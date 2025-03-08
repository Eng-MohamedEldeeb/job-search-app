import User from "../../../../../DB/Models/User/User.model.js";
import { successResponse } from "../../../../utils/res/success.response.js";

export const getAllUsers = async (_, args, context) => {
  const data = await User.find(
    {
      deletedAt: { $exists: false },
      bannedAt: { $exists: false },
    },
    {
      profilePic: {
        public_id: 0,
      },
      coverPic: {
        public_id: 0,
      },
      password: 0,
      passwords: 0,
    }
  );

  return successResponse({ data });
};
