import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";
import schema from './src/schema';
import { getCookie, getUser } from "./src/utils/common";
import { PORT } from "./src/constants/constants";

dotenv.config();

const server = new ApolloServer({
  schema,
  context: async ({ res, req }) => {
    const jwtToken = getCookie(req?.headers?.cookie, 'jwttoken');
    const user = await getUser(jwtToken);

    return { res, req, user };
  },
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  },
});
const { MONGO_USER, MONGO_PSWD, MONGO_DB_NAME } = process.env;
const url = `mongodb+srv://${MONGO_USER}:${MONGO_PSWD}@${MONGO_DB_NAME}.jbann.mongodb.net/pickby?retryWrites=true&w=majority`;

// Connects to database
const connectDB = async () => {
  try {
    const { version, connection } = await mongoose.connect(url);

    console.log("DB connected", version);

    connection.on('error', server.stop);
    connection.on('close', server.stop);
  } catch (e) {
    console.error(e);
  }
};

void connectDB();

process.on('exit', server.stop);

server.listen({ port: PORT }).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
