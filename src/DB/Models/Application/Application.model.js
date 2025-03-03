import { model } from "mongoose";
import applicationSchema from "./Schema/Application.schema.js";

const Application = model("Application", applicationSchema);

export default Application;
