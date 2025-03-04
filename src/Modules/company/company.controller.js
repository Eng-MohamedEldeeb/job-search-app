import { Router } from "express";
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

const router = Router();

/**
 * @method GET
 * @link /company?name=(Company's Name)
 * @query ?name=(Company's Name)
 * @description Get Company's Jobs
 **/
router.get(
  "/",
  isAuthorized,
  isAuthenticated(),
  companyAuthentication(),
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
  "/edit/:id",
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
  "/archive/:id",
  isAuthorized,
  isAuthenticated(),
  companyAuthentication(),
  validation({ schema: archiveCompanyValidation, token: true }),
  archiveCompany
);

/**
 * @method DELETE
 * @link /company/:id/logo
 * @param id => Company's Id
 * @description Delete Company's logo
 **/
router.delete(
  "/:id/logo",
  isAuthorized,
  isAuthenticated(),
  companyAuthentication(),
  validation({ schema: archiveCompanyValidation, token: true })
  // delCompanyLogo
);

/**
 * @method DELETE
 * @link /company/:id/cover-pic
 * @param id => Company's Id
 * @description Delete Company's Cover-Pic
 **/
router.delete(
  "/:id/cover-pic",
  isAuthorized,
  isAuthenticated(),
  companyAuthentication(),
  validation({ schema: archiveCompanyValidation, token: true })
  // delCompanyCoverPic
);

export default router;
