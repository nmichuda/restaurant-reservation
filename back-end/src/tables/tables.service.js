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


function read(table_id){
    return knex("tables")
    .select("*")
    .where({table_id})
    .first();
}

function update(reservation_id, table_id) {
  return knex.transaction(async (trx) => {
    await knex("reservations")
      .where({ reservation_id })
      .update({ status: "seated" })
      .transacting(trx);

    return knex("tables")
      .select("*")
      .where({ table_id })
      .update({ reservation_id: reservation_id }, "*")
      .update({
        occupied: knex.raw("NOT ??", ["occupied"]),
      })
      .transacting(trx)
      .then((createdRecords) => createdRecords[0]);
  });
}


module.exports = {
    create,
    list,
    read,
    update,
  };