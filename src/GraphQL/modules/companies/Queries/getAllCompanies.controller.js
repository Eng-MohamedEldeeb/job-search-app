import { getAllCompanies } from "./service/getAllCompanies.service.js";
import { responseType } from "../../../utils/types/response.type.js";
import { allCompaniesType } from "../types/company.type.js";

export const getAllCompaniesController = {
  getAllCompanies: {
    type: responseType({
      dataType: allCompaniesType,
      name: "allCompaniesResponse",
    }),
    resolve: getAllCompanies,
  },
};
