const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservations) => createdReservations[0]);
}

function list(reservation_date) {
    return knex("reservations")
    .select("*")
    .where({reservation_date})
    .orderBy("reservation_time");
  }

function read(reservation_id){
    return knex("reservations")
    .select("*")
    .where({reservation_id})
    .first();
}

function updateStatus(reservation_id, status){
  return knex("reservations")
  .select("*")
  .where({reservation_id})
  .update({status: status},"*")
  .then((createdReservations)=> createdReservations[0]);
}


module.exports = {
    create,
    list,
    read,
    updateStatus,
  };