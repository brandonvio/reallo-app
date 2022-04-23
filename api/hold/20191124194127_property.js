const knex = require("knex");

exports.up = knex =>
  knex.schema.createTable("property", tbl => {
    tbl.increments("property_id");
    tbl.string("mls_num", 32).notNullable();
    tbl.string("street_1", 256).notNullable();
    tbl.string("street_2", 256).notNullable();
    tbl.integer("user_id").notNullable();
    tbl.timestamps();

    tbl.unique("mls_num");
  });

exports.down = knex => knex.schema.dropTableIfExists("property");
