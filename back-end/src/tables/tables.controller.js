const service = require("./tables.service");
const reservationController = require("../reservations/reservations.controller")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const { as } = require("../db/connection");
const hasAllProperties = hasProperties("table_name", "capacity");
const hasReservationId = hasProperties("reservation_id");


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
  console.log("table controller create called");
  res.status(201).json({ data });
}

async function tableExists(req,res,next){
    const table_id = req.params.table_id;
    const table = await service.read(table_id);
    if(table){
        res.locals.table = table;
        return next();
    }
    else{
        next({
            status: 404,
            message: `Table ${table_id} not found.`
        })
    }
}



function nameIsValid(req,res,next){
    const table_name = req.body.data.table_name;
    if(table_name.length < 2){
        return next({
            status: 400,
            message: "table_name is not long enough. must be at least 2 characters."
        })
    }
    next();
}

function capacityIsValid(req,res,next){
    const capacity = req.body.data.capacity;

    if(capacity < 1 || typeof capacity !== 'number'){
        return next({
            status: 400,
            message: "invalid capacity",
        });
    }
    next();
}

function capacityIsEnough(req,res,next){
    const capacity = res.locals.table.capacity;
    const guests = res.locals.reservation.people;

    if(guests > capacity){
        return next({
            status: 400,
            message: "table capacity is not enough for that number of people"
        })
    }
    next();
    
}

async function update(req,res,next){
    const {reservation_id} = req.body.data;
    const data = await service.update(
        reservation_id, res.locals.table.table_id
    );
    res.status(200).json({data});
}

function isTableFull(req,res,next){
    if(!res.locals.table.occupied){
        return next({
            status: 400,
            message: "table is not occupied"
        })
    }
    next();
}
function isReservationSeated(req,res,next){
    if(res.locals.reservation.status === "seated"){
        return next({
            status: 400,
            message: "reservation is already seated"
        })
    }
    next();
}

function isTableEmpty(req,res,next){
    if(res.locals.table.occupied){
        return next({
            status: 400,
            message: "table is occupied"
        })
    }
    next();
}

async function finishTable(req,res,next){
    const data = await service.finish(res.locals.table.reservation_id, res.locals.table.table_id);
    res.status(200).json({data});
}


module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasAllProperties, nameIsValid, capacityIsValid, asyncErrorBoundary(create)],
  update: [asyncErrorBoundary(tableExists),hasReservationId, reservationController.reservationExists, capacityIsEnough, isReservationSeated, isTableEmpty, asyncErrorBoundary(update)],
  finish: [asyncErrorBoundary(tableExists),isTableFull, asyncErrorBoundary(finishTable)],
};
