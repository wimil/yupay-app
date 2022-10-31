import merge from "lodash/merge";
import product from "./product";
import business from "./business";
import auth from "./auth";
import office from "./office";
import app from "./app";

//const resolvers = merge(product);

export default merge(
  //
  product,
  business,
  auth,
  office,
  app
);
