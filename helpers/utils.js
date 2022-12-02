import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

const extensions = [".gql", ".graphql"];

function promiseReadFile(path, options = {}) {
  return new Promise((resolve) => {
    fs.readFile(path, options, (err, data) => resolve(data));
  });
}

export const mergeGraphQLSchemas = async () => {
  const folderPath = `${path.resolve()}/graphql/schemas`;
  const files = fs
    .readdirSync(folderPath)
    .map((file) => `${folderPath}/${file}`)
    .filter((file) => {
      const extension = path.extname(file).toLowerCase();
      if (extensions.includes(extension)) {
        return file;
      }
    });

  const data = await Promise.all(files.map((file) => promiseReadFile(file)));
  return data.join("\n");
};

export const buildSchemas = async () => {
  //
};

export const parseBearerToken = (authorization) => {
  if (!authorization) {
    return null;
  }

  const parts = authorization.split(" ");
  if (parts.length < 2) {
    return null;
  }

  const schema = parts[0].toLowerCase();
  if (schema !== "bearer") {
    return null;
  }
  return parts[1];
};

export const throwGqlError = ({
  message,
  code = "BAD_USER_INPUT",
  data = [],
}) => {
  throw new GraphQLError(message, {
    extensions: {
      code,
      data,
    },
  });
};

export const makeKardexDetail = {
  cpe: () => {
    //
  },
  purchase: (purchaseNum, docType, docSerie, docNumber, voided = false) => {
    return `${
      voided ? "[ANULACION]" : ""
    }[COMPRA ${purchaseNum}] ${docType} ${docSerie}-${docNumber}`;
  },
  transfer: (from, to, detail) => {
    return `[${from} -> ${to}] ${detail}`.toUpperCase();
  },
  cancel: () => {
    //
  },
  adjustment: (detail) => {
    return `[Ajuste] ${detail}`.toUpperCase();
  },
};
