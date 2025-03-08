import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { fileType } from "../../../utils/types/file.type.js";
import { allUsersType, userType } from "../../users/types/user.type.js";
import { banActionTypes } from "../../../utils/types/actions.types.js";

export const companyFieldsType = {
  _id: { type: GraphQLID },
  id: { type: GraphQLID },

  companyName: { type: GraphQLString },
  companyEmail: { type: GraphQLString },
  description: { type: GraphQLString },
  industry: { type: GraphQLString },
  address: { type: GraphQLString },

  hrs: { type: allUsersType },
  numberOfEmployees: { type: allUsersType },
  createdBy: { type: userType },

  approvedByAdmin: { type: GraphQLBoolean },

  logo: { type: fileType },
  coverPic: { type: fileType },
  coverPic: { type: fileType },

  createdAt: { type: GraphQLString },
  updatedAt: { type: GraphQLString },
  bannedAt: { type: GraphQLString },
};

export const companyType = new GraphQLObjectType({
  name: "companyType",
  fields: companyFieldsType,
});

export const allCompaniesType = new GraphQLList(companyType);

export const approveCompanyArgsType = {
  companyId: {
    type: new GraphQLNonNull(GraphQLID),
  },
};

export const banCompanyArgsType = {
  companyId: {
    type: new GraphQLNonNull(GraphQLID),
  },
  action: {
    type: new GraphQLNonNull(
      new GraphQLEnumType({
        name: "banCompanyActionType",
        values: banActionTypes,
      })
    ),
  },
};
