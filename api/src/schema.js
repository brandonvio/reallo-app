const { makeExecutableSchema } = require("graphql-tools");
const { GraphQLDate, GraphQLTime, GraphQLDateTime } = require("graphql-iso-date");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});

module.exports = schema;
