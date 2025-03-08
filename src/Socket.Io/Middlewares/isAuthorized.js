import { generateMessage } from "../../Utils/Messages/messages.generator.js";
import { verifyToken } from "../../Utils/Security/token.js";

const bearerTokens = {
  bearer: "Bearer",
};

export const isAuthorized = (socket, next) => {
  //? Authorization :
  const { authorization } = socket.handshake.auth;
  //! Bearer Missing :
  if (!authorization)
    return next(new Error(generateMessage("Token").errors.required.error));

  // Bearer , token :
  const [bearer, token] = authorization.split(" ");

  //! Bearer Missing :
  if (!bearer || bearer != bearerTokens.bearer)
    return next(
      new Error(generateMessage("Bearer Token").errors.required.error)
    );

  //! Token Missing :
  if (!token)
    return next(new Error(generateMessage().errors.invalidToken.error));

  // Verifing Token Data :
  const tokenData = verifyToken({ token });

  //! If The Token Was Expired :
  if (tokenData.name == "TokenExpiredError")
    return next(new Error(generateMessage().errors.expiredToken.error));

  //! If The Token Was in-valid :
  if (tokenData.name == "JsonWebTokenError")
    return next(new Error(generateMessage().errors.invalidToken.error));

  socket.handshake.auth.authorization = token;
  socket.token = tokenData;

  return next();
};
