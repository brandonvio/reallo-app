require("dotenv").config();
const { DB_URI } = process.env;

console.error("DB_URI", DB_URI)

module.exports = {
  development: {
    client: "pg",
    connection: DB_URI,
    pool: {
      "min": 2,
      "max": 6,
      "createTimeoutMillis": 3000,
      "acquireTimeoutMillis": 30000,
      "idleTimeoutMillis": 30000,
      "reapIntervalMillis": 1000,
      "createRetryIntervalMillis": 100,
      "propagateCreateError": false // <- default is true, set to false
    },
    migrations: {
      tableName: "knex_migrations"
    },
    seeds: { directory: "./data/seeds" }
  },

  staging: {
    client: "pg",
    connection: DB_URI,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    },
    seeds: { directory: "./data/seeds" }
  },

  production: {
    client: "pg",
    connection: DB_URI,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    },
    seeds: { directory: "./data/seeds" }
  }
};
