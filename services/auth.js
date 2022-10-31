import User from "../models/user";
import Jwt from "../helpers/jwt";
import { parseBearerToken } from "../helpers/utils";

export default async (request) => {
  const response = {
    check: false,
    user: null,
    id: null,
  };
  const token = parseBearerToken(request.headers.authorization);
  if (token) {
    const payload = Jwt.decode(token);

    if (payload.id) {
      const user = await User.findById(payload.id);
      if (user) {
        response.check = true;
        response.user = user;
        response.id = user.id;
      }
    }
  }

  return response;
};
