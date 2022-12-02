import Auth from "./auth";

export const apolloContext = async (request) => {
  //console.log(request.headers);
  const { headers } = request;
  return {
    auth: await Auth(request),
    businessId: headers["x-business"],
    officeId: headers["x-office"],
  };
};
