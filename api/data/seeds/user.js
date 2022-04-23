const fs = require("fs");
const path = require("path");
console.log(__dirname);
const propJson = JSON.parse(fs.readFileSync(path.join(__dirname, "json/properties.json")));

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user").insert([
        { username: "hankw", password: "frjmsm9sJAg3u3Jt", email: "hankw@gmail.com" },
        { username: "billw", password: "9kTaUwgqKAM4RaDT", email: "billw@gmail.com" },
        { username: "lindaw", password: "ExhU4Mxn9vTC3L87", email: "lindaw@gmail.com" }
      ]);
    })
    .then(async () => {
      const user = await knex("user")
        .where("username", "hankw")
        .first();

      return knex("property").insert(propJson);

      console.log(user);
    });
};
