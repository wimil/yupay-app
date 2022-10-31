import fastify from "fastify";
import MercuriusGQLUpload from "mercurius-upload";
import cors from "fastify-cors";
import mercurius from "mercurius";
import schema from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import "./services/mongodb";
import Auth from "./services/auth";

//console.log(schema);

const Port = process.env.FASTIFY_PORT || 4500;

const app = fastify({ logger: process.env.APP_DEBUG });

// Activate plugins below:
app.register(cors, {
  origin: "*",
  methods: ["POST"],
});

app.register(MercuriusGQLUpload, {
  // options passed to processRequest from graphql-upload
});

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
  allowBatchedQueries: true,
  context: async (request, reply) => {
    return {
      auth: await Auth(request),
    };
  },
});

// create server
const start = async () => {
  try {
    await app.listen(Port);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
