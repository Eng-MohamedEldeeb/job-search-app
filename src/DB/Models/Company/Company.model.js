import { model } from "mongoose";
import companySchema from "./Schema/Company.schema.js";

companySchema.virtual("companyJobs", {
  ref: "Job",
  localField: "_id",
  foreignField: "companyId",
});
const Company = model("Company", companySchema);

export default Company;
