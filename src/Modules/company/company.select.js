export const getCompanySelection = {
  companyAuthentication: {
    options: {
      populate: [{ path: "companyJobs" }],
    },
  },
};
