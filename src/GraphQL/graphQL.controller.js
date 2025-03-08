import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { getAllUsersController } from "./modules/users/Queries/getAllUsers.controller.js";
import { getAllCompaniesController } from "./modules/companies/Queries/getAllCompanies.controller.js";
import { banUserController } from "./modules/users/Mutations/banUser.controller.js";
import { banCompanyController } from "./modules/companies/Mutation/banCompany.controller.js";
import { approveCompanyController } from "./modules/companies/Mutation/approveCompany.controller.js";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "mainRootQuery",
    fields: {
      ...getAllUsersController,
      ...getAllCompaniesController,
    },
  }),

  mutation: new GraphQLObjectType({
    name: "mainRootMutation",
    fields: {
      ...banUserController,
      ...banCompanyController,
      ...approveCompanyController,
    },
  }),
});

export default schema;
