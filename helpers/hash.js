import bcrypt from "bcrypt";

export default {
  async make(secret, saltRounds = 10) {
    return await bcrypt.hash(secret, saltRounds);
  },
  async check(secret, hash) {
    return await bcrypt.compare(secret, hash);
  },
};
