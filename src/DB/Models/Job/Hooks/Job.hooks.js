import Application from "../../Application/Application.model.js";

export const post_findOneAndDelete = async function (doc, next) {
  const { _id } = doc;
  const jobData = { jobId: _id };

  await Promise.allSettled([Application.deleteMany(jobData)]);
};
