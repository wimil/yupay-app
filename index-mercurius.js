import Fastify from "fastify";
import cors from "@fastify/cors";
import schema from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import "#root/services/mongodb";
import Auth from "./services/auth";
import { ApolloServer } from "@apollo/server";
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from "@as-integrations/fastify";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import dateScalar from "#graphql/scalars/dateScalar";
import mercurius from "mercurius";

dayjs.extend(utc);

//console.log(schema);

const Port = process.env.FASTIFY_PORT || 4500;

const fastify = Fastify({ logger: process.env.APP_DEBUG });

fastify.register(cors, {
  origin: "*",
  methods: ["POST"],
});

await fastify.register(mercurius, {
  schema,
  resolvers: {
    ...resolvers,
    Date: dateScalar,
  },
  context: async (request) => {
    return {
      auth: await Auth(request),
    };
  },
});

const start = async () => {
  try {
    await fastify.listen({ port: 4600 });
  } catch (err) {
    //fastify.log.error(err);
    //process.exit(1);
  }
};
start();
