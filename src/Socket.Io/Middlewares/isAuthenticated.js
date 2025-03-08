import User from "../../DB/Models/User/User.model.js";
import { generateMessage } from "../../Utils/Messages/messages.generator.js";

export const isAuthenticated = ({
  select = "",
  options = {},
  inlcudeDeacivated = false,
} = {}) => {
  return async (socket, next) => {
    // Token :
    const { _id } = socket.token;

    // User Searching :
    const user = await User.findOne(
      { _id, isDeactivated: { $exists: inlcudeDeacivated } },
      select,
      { ...options }
    );

    //! If The User Wasn't Found:
    if (!user) {
      return next(new Error(generateMessage("User").errors.notFound.error));
    }

    //! If The User's Account Was Deactivated:
    if (user.isDeactivated)
      return next(new Error(generateMessage().errors.unAuthenticated.error));

    //! If The Token Was Expired:
    if (
      socket.token &&
      (socket.token.iat < user.passwordChangedAt?.getTime() / 1000 ||
        socket.token.iat < user.emailChangedAt?.getTime() / 1000)
    ) {
      return next(new Error(generateMessage().errors.expiredToken.error));
    }

    socket.user = user;

    return next();
  };
};
