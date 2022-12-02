import { GraphQLScalarType, Kind } from "graphql";

export default new GraphQLScalarType({
  name: "FloatString",
  description: "Accept Float in string or float",
  serialize(value) {
    //return value.getTime(); // Convert outgoing Date to integer for JSON
    return value;
  },
  parseValue(value) {
    //return new Date(value); // Convert incoming integer to Date
    return parseFloat(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.FLOAT || ast.kind === Kind.STRING) {
      // Convert hard-coded AST string to integer and then to Date
      return parseFloat(ast.value);
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});
