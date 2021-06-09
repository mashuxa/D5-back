import { SchemaComposer } from 'graphql-compose';
import resolvers from "../resolvers";
import { readFileSync } from "fs";
import { UserQuery, UserMutation } from './user';
import { WishlistQuery, WishlistMutation } from './wishlist';

const queryDefs = readFileSync(`${__dirname}/../typeDefs/query.graphql`, { encoding: 'utf8' });
const movieDefs = readFileSync(`${__dirname}/../typeDefs/movie.graphql`, { encoding: 'utf8' });
const genreDefs = readFileSync(`${__dirname}/../typeDefs/genre.graphql`, { encoding: 'utf8' });
const schemaComposer = new SchemaComposer();

schemaComposer.addTypeDefs(queryDefs);
schemaComposer.addTypeDefs(movieDefs);
schemaComposer.addTypeDefs(genreDefs);
schemaComposer.addResolveMethods(resolvers);
schemaComposer.Query.addFields({
  ...UserQuery,
  ...WishlistQuery,
});
schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...WishlistMutation,
});

export default schemaComposer.buildSchema();