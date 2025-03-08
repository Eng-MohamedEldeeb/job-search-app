import { GraphQLObjectType } from "graphql";
import { responseType } from "../../../utils/types/response.type.js";
import {
  approveCompanyArgsType,
  companyFieldsType,
} from "../types/company.type.js";

import { approveCompany } from "./service/approveCompany.service.js";

export const approveCompanyController = {
  approveCompany: {
    type: responseType({
      dataType: new GraphQLObjectType({
        name: "approveCompanyDataType",
        fields: {
          companyName: companyFieldsType.companyName,
          approvedByAdmin: companyFieldsType.approvedByAdmin,
        },
      }),
      name: "approveCompanyResponse",
    }),
    args: approveCompanyArgsType,
    resolve: approveCompany,
  },
};
