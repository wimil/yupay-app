import schema from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import "#root/services/mongodb";
import Auth from "./services/auth";
import { ApolloServer } from "@apollo/server";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import dateScalar from "#graphql/scalars/dateScalar";
import { startStandaloneServer } from "@apollo/server/standalone";

dayjs.extend(utc);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    ...resolvers,
    Date: dateScalar,
  },
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  context: async ({req}) => {
    return {
      auth: await Auth(req),
    };
  },
  listen: {
    port: 4600,
  },
});

console.log(`🚀  Server ready at: ${url}`);
