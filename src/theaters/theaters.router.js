const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//route "/" shows list of theaters
router.route("/").get(controller.list).all(methodNotAllowed);

//exports
module.exports = router;