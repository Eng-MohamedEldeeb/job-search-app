import { model } from "mongoose";
import jobSchema from "./Schema/Job.schema.js";
import { applicationsVirtual } from "./Virtuals/job.virtuals.js";

jobSchema.virtual("applications", applicationsVirtual);

const Job = model("Job", jobSchema);

export default Job;
