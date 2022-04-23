const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const schema = require("./src/schema");

const app = express();
app.use(cors());
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(3001, () => {
  console.log("Go to http://localhost:3001/graphiql to run queries!");
});
