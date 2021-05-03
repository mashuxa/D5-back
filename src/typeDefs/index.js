const { gql } = require('apollo-server');
const { readFileSync } = require('fs');

const schemaString = readFileSync(`${__dirname}/schema.graphql`, { encoding: 'utf8' });
const typeDefs = gql`${schemaString}`;

module.exports = typeDefs;