import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";
import schema from './src/schema';
import { getCookie, getUser } from "./src/utils/common";

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
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PSWD}@${MONGO_DB_NAME}.jbann.mongodb.net/pickby?retryWrites=true&w=majority`;

// Connects to database
mongoose
  .connect(uri)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

mongoose.connection.on('error', server.stop);
mongoose.connection.once('close', server.stop);
process.on('exit', server.stop);

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
