import { GraphQLObjectType } from "graphql";
import { responseType } from "../../../utils/types/response.type.js";
import { banUserArgsType, userFieldsTypes } from "../types/user.type.js";
import { banUser } from "./service/banUser.service.js";

export const banUserController = {
  banUser: {
    type: responseType({
      dataType: new GraphQLObjectType({
        name: "banUserDataType",
        fields: {
          firstName: userFieldsTypes.firstName,
          lastName: userFieldsTypes.lastName,
          bannedAt: userFieldsTypes.bannedAt,
        },
      }),
      name: "banUserResponse",
    }),
    args: banUserArgsType,
    resolve: banUser,
  },
};
