import { getAllUsers } from "./service/getAllUsers.service.js";
import { responseType } from "../../../utils/types/response.type.js";
import { allUsersType } from "../types/user.type.js";

export const getAllUsersController = {
  getAllUsers: {
    type: responseType({ dataType: allUsersType, name: "allUsersResponse" }),
    resolve: getAllUsers,
  },
};
