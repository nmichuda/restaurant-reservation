const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasAllProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "people",
  "reservation_time",
  "reservation_date"
);

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const date = req.query.date;
  const data = await service.list(date);
  res.json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

function hasValidDate(req, res, next) {
  const { data = {} } = req.body;
  const date = data["reservation_date"];
  const time = data["reservation_time"];
  const compoundDate = `${date}T${time}`;
  if (isNaN(Date.parse(date))) {
    return next({
      status: 400,
      message: "reservation_date",
    });
  }
  let newDate = new Date(Date.parse(compoundDate));
  let today = new Date();

  if (newDate.getDay() == 2) {
    return next({
      status: 400,
      message: "restaurant is closed on tuesdays",
    });
  }
  if (newDate.getTime() < today.getTime()) {
    return next({
      status: 400,
      message: "must book date in the future",
    });
  }
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  if (hours < 10 || hours > 21) {
    return next({
      status: 400,
      message:
        "Cannot make reseravtion at that time. Operating hours are from 10:30AM to 10:30PM",
    });
  }
  if ((hours === 10 && minutes < 30) || (hours === 21 && minutes > 30)) {
    return next({
      status: 400,
      message:
        "Cannot make reseravtion at that time. Operating hours are from 10:30AM to 10:30PM",
    });
  }

  next();
}
function hasValidPeople(req, res, next) {
  const { data = {} } = req.body;
  const people = data["people"];
  if (!Number.isInteger(people) || people === 0) {
    return next({
      status: 400,
      message: "people",
    });
  }
  next();
}
function hasValidTime(req, res, next) {
  const { data = {} } = req.body;
  const time = data["reservation_time"];
  console.log(time);
  if (!/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(time)) {
    return next({
      status: 400,
      message: "reservation_time",
    });
  }
  next();
}

async function reservationExists(req, res, next) {
  const reservation_id = req.params.reservation_id || (req.body.data || {}).reservation_id;

  const reservation = await service.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  });
} 

async function readReservation(req, res, next) {

  const data = res.locals.reservation;
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasAllProperties,
    hasValidDate,
    hasValidPeople,
    hasValidTime,
    asyncErrorBoundary(create),
  ],
  read: [reservationExists, asyncErrorBoundary(readReservation)],
  reservationExists
};
