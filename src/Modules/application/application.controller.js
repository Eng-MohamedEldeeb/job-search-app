import { Router } from "express";
import { isAuthorized } from "../../Middlewares/auth/isAuthorized.js";
import { isAuthenticated } from "../../Middlewares/auth/isAuthenticated.js";
import { getJobApplications } from "./service/getjobApplications.service.js";
import { jobAuthentication } from "../../Middlewares/job/jobAuthentication.js";
import { validation } from "../../Utils/Validation/validation.js";
import { getJobApplicationsValidation } from "./validation/getJobApplications.validation.js";
import {
  acceptApplicationSelection,
  applyToJobSelection,
  getJobApplicationsSelection,
  rejectApplicationSelection,
} from "./application.select.js";
import { fileReader } from "../../Utils/Upload/fileReader.js";
import { fileTypes } from "../../Utils/Upload/Cloudinary/Config/uploading.options.js";
import { applyToJobValidation } from "./validation/applyToJob.validation.js";
import { applyToJob } from "./service/applyToJob.service.js";
import { acceptApplication } from "./service/acceptApplication.service.js";
import { applicationAuthentication } from "../../Middlewares/application/applicationAuthentication.js";
import { acceptApplicationValidation } from "./validation/acceptApplication.validation.js";
import { rejectApplication } from "./service/rejectApplication.service.js";
import { rejectApplicationValidation } from "./validation/rejectApplication.validation.js";

const router = Router();

/**
 * @method GET
 * @link /application/for-job/:jobId
 * @param jobId Job's id
 * @description get job's applications
 **/
router.get(
  "/for-job/:jobId",
  validation({ schema: getJobApplicationsValidation, token: true }),
  isAuthorized,
  isAuthenticated(),
  jobAuthentication({
    options: getJobApplicationsSelection.jobAuthentication.options,
  }),
  getJobApplications
);

/**
 * @method POST
 * @link /application/apply/:jobId
 * @param jobId Job's id
 * @description apply to a job
 **/
router.post(
  "/apply/:jobId",
  fileReader({ fileType: fileTypes.pdf }).single("application"),
  validation({ schema: applyToJobValidation, token: true }),
  isAuthorized,
  isAuthenticated(),
  jobAuthentication({
    options: applyToJobSelection.jobAuthentication.options,
  }),
  applyToJob
);

/**
 * @method POST
 * @link /application/for-job/:jobId
 * @param jobId Job's id
 * @description get job's applications
 **/
router.post(
  "/accept-application/:id",
  validation({ schema: acceptApplicationValidation, token: true }),
  isAuthorized,
  isAuthenticated(),
  applicationAuthentication({
    options: acceptApplicationSelection.jobAuthentication.options,
  }),
  acceptApplication
);

/**
 * @method POST
 * @link /application/for-job/:jobId
 * @param jobId Job's id
 * @description get job's applications
 **/
router.delete(
  "/reject-application/:id",
  validation({ schema: rejectApplicationValidation, token: true }),
  isAuthorized,
  isAuthenticated(),
  applicationAuthentication({
    options: rejectApplicationSelection.jobAuthentication.options,
  }),
  rejectApplication
);

export default router;
