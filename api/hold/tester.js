// https://z3y3d1enr5.execute-api.us-east-1.amazonaws.com/dev/graphql
// https://ys8teebjh2.execute-api.us-west-2.amazonaws.com/Prod/graphql
// graphql.js

const knex = require("knex");
const knexfile = require("./knexfile");
const db = require("./db");

exports.handler = async event => {
  const user = await db("user")
    .where("username", "hankw")
    .first();

  const response = {
    statusCode: 200,
    body: JSON.stringify(user)
  };

  return response;
};
