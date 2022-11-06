import { GraphQLScalarType, Kind } from "graphql";
import dayjs from "dayjs";

export default new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    //return value.getTime(); // Convert outgoing Date to integer for JSON
    return dayjs(value).utc().toISOString();
  },
  parseValue(value) {
    //return new Date(value); // Convert incoming integer to Date
    return dayjs(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});
