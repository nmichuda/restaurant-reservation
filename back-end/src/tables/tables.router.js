/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./tables.controller");

router
    .route("/")
    .post(controller.create)
    .get(controller.list)
    .all(methodNotAllowed);



module.exports = router;
