const knex = require("knex");

exports.up = knex => {
  return knex.schema
    .createTable("user", tbl => {
      tbl.increments("user_id");
      tbl.string("username", 32).notNullable();
      tbl.string("password", 128).notNullable();
      tbl.string("email", 256).notNullable();
      tbl.timestamps(true, true);

      tbl.unique("username");
      tbl.unique("email");
    })
    .createTable("property", tbl => {
      tbl.increments("property_id");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable();
      tbl.timestamps(true, true);
      tbl.string("mls_num", 32).notNullable();
      tbl.string("main_image_url", 512).notNullable();
      tbl.string("street_1", 256).notNullable();
      tbl.string("street_2", 256);
      tbl.string("city", 256).notNullable();
      tbl.string("state", 2).notNullable();
      tbl.string("zipcode", 5).notNullable();
      tbl.string("neighborhood", 256);
      tbl.float("sales_price", 10, 2).notNullable();
      tbl.date("date_listed").notNullable();
      tbl.integer("bedrooms").notNullable();
      tbl.float("bathrooms", 2, 1).notNullable();
      tbl.integer("garage_size");
      tbl.integer("square_feet").notNullable();
      tbl.float("lot_size", 6, 2);
      tbl.string("description", 1000).notNullable();

      tbl.foreign("user_id").references("user.user_id");
      tbl.unique("mls_num");
    })
    .createTable("image", tbl => {
      tbl.increments("image_id");
      tbl
        .integer("property_id")
        .unsigned()
        .notNullable();
      tbl.string("url", 512).notNullable();
      tbl.string("caption", 512);
      tbl.timestamps(true, true);

      tbl.foreign("property_id").references("property.property_id");
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists("image")
    .dropTableIfExists("property")
    .dropTableIfExists("user");
};
