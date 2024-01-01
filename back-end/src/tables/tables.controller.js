const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasAllProperties = hasProperties("table_name", "capacity");


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



function nameIsValid(req,res,next){
    const table_name = req.body.data.table_name;
    if(table_name.length < 2){
        return next({
            status: 400,
            message: "name length is not long enough. must be at least 2 characters."
        })
    }
    next();
}

function capacityIsValid(req,res,next){
    const capacity = req.body.data.capacity;

    if(capacity < 1 || isNaN(capacity)){
        return next({
            status: 400,
            message: "invalid capacity"
        })
    }
    next();
}

function capacityIsEnough(req,res,next){

}



module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasAllProperties, nameIsValid, capacityIsValid, asyncErrorBoundary(create)],
};
