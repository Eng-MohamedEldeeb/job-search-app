import { Router } from "express";
import jobRouter from "./../Job/job.controller.js";
import { isAuthenticated } from "../../Middlewares/auth/isAuthenticated.js";
import { isAuthorized } from "../../Middlewares/auth/isAuthorized.js";
import { validation } from "../../Utils/Validation/validation.js";
import { addCompany } from "./service/addCompany.service.js";
import { fileReader } from "../../Utils/Upload/fileReader.js";
import { fileTypes } from "../../Utils/Upload/Cloudinary/Config/uploading.options.js";
import { companyAuthentication } from "../../Middlewares/company/companyAuthentication.js";
import { addCompanyValidation } from "./Validation/addCompany.validation.js";
import { editCompanyDataValidation } from "./Validation/editCompany.validation.js";
import { editCompanyData } from "./service/editCompanyData.service.js";
import { archiveCompanyValidation } from "./Validation/archiveCompanyValidation.js";
import { archiveCompany } from "./service/archiveCompany.service.js";
import { getCompany } from "./service/getCompany.service.js";
import { getCompanySelection } from "./company.select.js";
import { delCompanyCoverPicValidation } from "./Validation/delCompanyCoverPic.validation.js";
import { delCompanyLogoValidation } from "./Validation/delCompanyLogo.validation.js";
import { delCompanyLogo } from "./service/delCompanyLogo.service.js";
import { delCompanyCoverPic } from "./service/delCompanyCoverPic.service.js";
import { uploadCompanyLogo } from "./service/uploadCompanyLogo.service.js";
import { uploadCompanyCoverPic } from "./service/uploadCompanyCoverPic.service.js";
import { uploadCompanyCoverPicValidation } from "./Validation/uploadCompanyCoverPic.validation.js";
import { uploadCompanyLogoValidation } from "./Validation/uploadCompanyLog.validation.js";

const router = Router();

/**
 * @method GET
 * @link /company/companyName||companyId/jobs
 * @param company company's id
 * @description jobs Router
 **/
router.use(
  "/:company/jobs",
  isAuthorized,
  isAuthenticated(),
  companyAuthentication(),
  jobRouter
);
/**
 * @method GET
 * @link /company?name=(Company's Name)
 * @query ?name=(Company's Name)
 * @description Get Company's Jobs
 **/
router.get(
  "/:company?",
  isAuthorized,
  isAuthenticated(),
  companyAuthentication({
    options: getCompanySelection.companyAuthentication.options,
  }),
  getCompany
);

/**
 * @method POST
 * @link /company/add
 * @description Add New Company To DataBase
 **/
router.post(
  "/add",
  fileReader({ fileType: [...fileTypes.pdf, ...fileTypes.img] }).fields([
    { name: "logo", maxCount: 1 },
    { name: "cover", maxCount: 1 },
    { name: "legalAttachment", maxCount: 1 },
  ]),
  isAuthorized,
  isAuthenticated(),
  validation({ schema: addCompanyValidation, token: true }),
  addCompany
);

/**
 * @method PATCH
 * @link /company/edit/:id
 * @param id => Company's Id
 * @description Edit Company's Data
 **/
router.patch(
  "/edit/:company",
  isAuthorized,
  isAuthenticated(),
  companyAuthentication(),
  validation({ schema: editCompanyDataValidation, token: true }),
  editCompanyData
);

/**
 * @method DELETE
 * @link /company/edit/:id
 * @param id => Company's Id
 * @description Soft Delete Company
 **/
router.delete(
  "/archive/:company",
  isAuthorized,
  isAuthenticated(),
  companyAuthentication(),
  validation({ schema: archiveCompanyValidation, token: true }),
  archiveCompany
);

/**
 * @method PUT
 * @link /company/:id/logo
 * @param id => Company's Id
 * @description Delete Company's logo
 **/
router.put(
  "/:company/logo",
  fileReader({ fileType: fileTypes.img }).single("logo"),
  validation({ schema: uploadCompanyLogoValidation, token: true }),
  isAuthorized,
  isAuthenticated(),
  companyAuthentication(),
  uploadCompanyLogo
);

/**
 * @method PUT
 * @link /company/:id/cover-pic
 * @param id => Company's Id
 * @description Delete Company's Cover-Pic
 **/
router.put(
  "/:company/cover-pic",
  fileReader({ fileType: fileTypes.img }).single("coverPic"),
  validation({ schema: uploadCompanyCoverPicValidation, token: true }),
  isAuthorized,
  isAuthenticated(),
  companyAuthentication(),
  uploadCompanyCoverPic
);
/**
 * @method DELETE
 * @link /company/:id/logo
 * @param id => Company's Id
 * @description Delete Company's logo
 **/
router.delete(
  "/:company/logo",
  isAuthorized,
  isAuthenticated(),
  companyAuthentication(),
  validation({ schema: delCompanyLogoValidation, token: true }),
  delCompanyLogo
);

/**
 * @method DELETE
 * @link /company/:id/cover-pic
 * @param id => Company's Id
 * @description Delete Company's Cover-Pic
 **/
router.delete(
  "/:company/cover-pic",
  isAuthorized,
  isAuthenticated(),
  companyAuthentication(),
  validation({ schema: delCompanyCoverPicValidation, token: true }),
  delCompanyCoverPic
);

export default router;
