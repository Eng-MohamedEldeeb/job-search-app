import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from "graphql";

export const responseType = ({ dataType, name }) => {
  return new GraphQLObjectType({
    name,
    fields: {
      success: {
        type: GraphQLBoolean,
      },
      status: {
        type: GraphQLInt,
      },
      data: {
        type: dataType,
      },
    },
  });
};
