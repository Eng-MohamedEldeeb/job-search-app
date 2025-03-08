import Company from "../../../../../DB/Models/Company/Company.model.js";
import { successResponse } from "../../../../utils/res/success.response.js";

export const getAllCompanies = async (_, args) => {
  const data = await Company.find(
    {},
    {
      logo: {
        public_id: 0,
      },
      coverPic: {
        public_id: 0,
      },
      legalAttachment: {
        public_id: 0,
      },
    },
    {
      populate: [
        {
          path: "createdBy",
          select: {
            profilePic: {
              public_id: 0,
            },
            coverPic: {
              public_id: 0,
            },
            password: 0,
            passwords: 0,
          },
        },
        {
          path: "hrs",
          select: {
            profilePic: {
              public_id: 0,
            },
            coverPic: {
              public_id: 0,
            },
            password: 0,
            passwords: 0,
          },
        },
        {
          path: "numberOfEmployees",
          select: {
            profilePic: {
              public_id: 0,
            },
            coverPic: {
              public_id: 0,
            },
            password: 0,
            passwords: 0,
          },
        },
      ],
    }
  );

  return successResponse({ data });
};
