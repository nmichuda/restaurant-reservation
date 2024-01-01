const knex = require("../db/connection");

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdTables) => createdTables[0]);
}

function list() {
    return knex("tables")
    .select("*")
    .orderBy("table_name")
  }



module.exports = {
    create,
    list,
  };