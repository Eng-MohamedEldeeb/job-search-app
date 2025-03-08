import { Router } from "express";
import { jobAuthentication } from "../../Middlewares/job/jobAuthentication.js";
import { validation } from "../../Utils/Validation/validation.js";
import { addJob } from "./service/addJob.service.js";
import { addJobValidation } from "./Validation/addJob.validation.js";
import { editJobDataValidation } from "./Validation/editJobData.validation.js";
import { editJobData } from "./service/editJobData.service.js";
import { deleteJobValidation } from "./Validation/deleteJob.validation.js";
import { deleteJob } from "./service/deleteJob.service.js";
import { getCompanyJobs } from "./service/getCompanyJobs.service.js";
import { getJobValidation } from "./Validation/getJob.validation.js";

const router = Router({ mergeParams: true });

/**
 * @method GET
 * @link /company/companyName||companyId/jobs/:id?
 * @param id job id
 * @query to apply filter query => /company/companyName||companyId/jobs?filter=true&(filter data)
 * @description Get Company's Jobs
 **/
router.get(
  "/:id?",
  validation({
    schema: getJobValidation,
    token: true,
    query: [
      "jobTitle",
      "jobLocation",
      "workingTime",
      "seniorityLevel",
      "technicalSkills",
    ],
  }),
  getCompanyJobs
);

/**
 * @method POST
 * @link /jobs/add
 * @description Add New Job To DataBase
 **/
router.post(
  "/add",
  validation({ schema: addJobValidation, token: true }),
  addJob
);

/**
 * @method PATCH
 * @link /jobs/edit/:id
 * @param id => Job's Id
 * @description Edit Job's Data
 **/
router.patch(
  "/edit/:id",
  jobAuthentication(),
  validation({ schema: editJobDataValidation, token: true }),
  editJobData
);

/**
 * @method DELETE
 * @link /jobs/edit/:id
 * @param id => Job's Id
 * @description Delete Job
 **/
router.delete(
  "/:id",
  jobAuthentication(),
  validation({ schema: deleteJobValidation, token: true }),
  deleteJob
);

export default router;
