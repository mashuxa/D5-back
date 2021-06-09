import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";
import schema from './src/schema';

dotenv.config();

const server = new ApolloServer({ schema });
const { MONGO_USER, MONGO_PSWD, MONGO_DB_NAME } = process.env;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PSWD}@${MONGO_DB_NAME}.jbann.mongodb.net/pickby?retryWrites=true&w=majority`;

// Connects to database
mongoose
  .connect(uri)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

mongoose.connection.on('error', () => {
  console.log('error');
});
mongoose.connection.once('open', () => {
  console.log('open');
});

process.on('exit', () => {
  server.stop();
});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
