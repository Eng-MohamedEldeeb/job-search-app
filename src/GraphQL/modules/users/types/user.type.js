import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { fileType } from "../../../utils/types/file.type.js";
import { banActionTypes } from "../../../utils/types/actions.types.js";

export const userFieldsTypes = {
  _id: { type: GraphQLID },
  id: { type: GraphQLID },

  userName: { type: GraphQLString },
  firstName: { type: GraphQLString },
  lastName: { type: GraphQLString },

  age: { type: GraphQLInt },

  email: { type: GraphQLString },
  phone: { type: GraphQLString },

  profilePic: { type: fileType },
  coverPic: { type: fileType },

  role: { type: GraphQLString },
  gender: { type: GraphQLString },
  provider: { type: GraphQLString },
  createdAt: { type: GraphQLString },
  updatedAt: { type: GraphQLString },
  bannedAt: { type: GraphQLString },
};

export const userType = new GraphQLObjectType({
  name: "userType",
  fields: userFieldsTypes,
});

export const allUsersType = new GraphQLList(userType);

export const banUserArgsType = {
  userId: {
    type: new GraphQLNonNull(GraphQLID),
  },
  action: {
    type: new GraphQLNonNull(
      new GraphQLEnumType({
        name: "banUserActionType",
        values: banActionTypes,
      })
    ),
  },
};
