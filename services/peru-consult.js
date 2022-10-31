import axios from "axios";

const baseURL = process.env.PERU_CONSULT_URL;
const token = process.env.PERU_CONSULT_TOKEN;

export default {
  async endpoint(type, number) {
    try {
      const { data } = await axios.get(`${baseURL}/${type}/${number}`, {
        params: {
          token,
        },
      });

      return data;
    } catch (error) {
      //console.log(error);
      return null;
    }
  },
  async dni(number) {
    return await this.endpoint("dni", number);
  },
  async ruc(number) {
    return await this.endpoint("ruc", number);
  },
};
