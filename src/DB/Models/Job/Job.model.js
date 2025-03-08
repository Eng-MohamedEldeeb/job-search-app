import { model } from "mongoose";
import jobSchema from "./Schema/Job.schema.js";
import { applicationsVirtual } from "./Virtuals/job.virtuals.js";
import { post_findOneAndDelete } from "./Hooks/Job.hooks.js";

jobSchema.virtual("applications", applicationsVirtual);

jobSchema.post("findOneAndDelete", post_findOneAndDelete);

const Job = model("Job", jobSchema);

export default Job;
