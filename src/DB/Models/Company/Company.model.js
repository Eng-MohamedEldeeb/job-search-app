import { model } from "mongoose";
import companySchema from "./Schema/Company.schema.js";
import { post_findOneAndDelete } from "./Hooks/Company.hooks.js";

companySchema.virtual("companyJobs", {
  ref: "Job",
  localField: "_id",
  foreignField: "companyId",
});

companySchema.post("findOneAndDelete", post_findOneAndDelete);

const Company = model("Company", companySchema);

export default Company;
