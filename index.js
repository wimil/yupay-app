//Index Fastify with apollo
import Fastify from "fastify";
import cors from "@fastify/cors";
import schema from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import "#root/services/mongodb";

import { ApolloServer } from "@apollo/server";
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from "@as-integrations/fastify";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import dateScalar from "#graphql/scalars/dateScalar";
import { apolloContext } from "./services/apollo";
import floatString from "./graphql/scalars/floatString";

dayjs.extend(utc);

//console.log(schema);

const Port = process.env.FASTIFY_PORT || 4500;

const fastify = Fastify({ logger: process.env.APP_DEBUG });

fastify.register(cors, {
  origin: "*",
  methods: ["POST"],
});

const apollo = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    ...resolvers,
    Date: dateScalar,
    FloatString: floatString,
  },
  plugins: [fastifyApolloDrainPlugin(fastify)],
});

await apollo.start();

await fastify.register(fastifyApollo(apollo), {
  context: apolloContext,
});

/*await fastify.listen({
  port: Port,
});*/

const start = async () => {
  try {
    await fastify.listen({ port: 4600 });
  } catch (err) {
    fastify.log.error(err);
    //process.exit(1);
  }
};
start();
