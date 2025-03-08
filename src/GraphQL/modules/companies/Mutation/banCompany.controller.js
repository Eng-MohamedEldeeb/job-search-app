import { GraphQLObjectType } from "graphql";
import { responseType } from "../../../utils/types/response.type.js";
import {
  banCompanyArgsType,
  companyFieldsType,
} from "../types/company.type.js";
import { banCompany } from "./service/banCompany.service.js";

export const banCompanyController = {
  banCompany: {
    type: responseType({
      dataType: new GraphQLObjectType({
        name: "banCompanyDataType",
        fields: {
          companyName: companyFieldsType.companyName,
          bannedAt: companyFieldsType.bannedAt,
        },
      }),
      name: "banCompanyResponse",
    }),
    args: banCompanyArgsType,
    resolve: banCompany,
  },
};
