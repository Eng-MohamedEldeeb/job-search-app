import { model } from "mongoose";
import companySchema from "./Schema/Company.schema.js";

const Company = model("Company", companySchema);

export default Company;
