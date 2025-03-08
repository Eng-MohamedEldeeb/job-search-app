import { GraphQLObjectType, GraphQLString } from "graphql";

export const fileType = new GraphQLObjectType({
  name: "fileType",
  fields: {
    secure_url: { type: GraphQLString },
  },
});
