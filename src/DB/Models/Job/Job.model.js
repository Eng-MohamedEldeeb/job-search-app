import { model } from "mongoose";
import jobSchema from "./Schema/Job.schema.js";

const Job = model("Job", jobSchema);

export default Job;
