const { ApolloServer, gql } = require("apollo-server-lambda");
const schema = require("./src/schema");
const server = new ApolloServer({ schema });

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    methods: "POST",
    allowedHeaders: ["Content-Type", "Origin", "Accept"]
  }
});
