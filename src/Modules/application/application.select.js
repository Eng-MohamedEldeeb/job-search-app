export const getJobApplicationsSelection = {
  jobAuthentication: {
    options: {
      projection: "applications hrs addedBy",
      populate: [
        {
          path: "applications",
          populate: [
            {
              path: "userId",
              select: "firstName lastName email age profilePic.secure_url",
            },
          ],
          select: "-userCV.public_id",
        },
      ],
    },
  },
};

export const applyToJobSelection = {
  jobAuthentication: {
    options: {
      populate: [{ path: "companyId", select: "companyName" }],
    },
  },
};

export const acceptApplicationSelection = {
  jobAuthentication: {
    options: {
      populate: [
        {
          path: "jobId",
          select: "companyId",
          populate: [{ path: "companyId", select: "hrs" }],
        },
      ],
    },
  },
};
export const rejectApplicationSelection = {
  jobAuthentication: {
    options: {
      populate: [
        {
          path: "jobId",
          select: "companyId",
          populate: [{ path: "companyId", select: "hrs" }],
        },
      ],
    },
  },
};
