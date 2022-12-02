import merge from "lodash/merge";
import product from "./product";
import business from "./business";
import auth from "./auth";
import office from "./office";
import app from "./app";
import subscription from "./subscription";
import warehouse from "./warehouse";
import unit from "./unit";
import category from "./category";
import currency from "./currency";
import kardex from "./kardex";
import entity from "./entity";
import autocomplete from "./autocomplete";
import purchase from "./purchase";

//const resolvers = merge(product);

export default merge(
  //
  product,
  business,
  auth,
  office,
  app,
  subscription,
  warehouse,
  unit,
  category,
  currency,
  kardex,
  entity,
  autocomplete,
  purchase
);
