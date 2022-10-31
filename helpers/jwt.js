import jwt from "jsonwebtoken";

export default {
  generate(data) {
    return jwt.sign(data, process.env.APP_KEY);
  },
  decode(token) {
    return jwt.verify(token, process.env.APP_KEY);
  },
};
