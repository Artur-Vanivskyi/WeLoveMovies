const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

//routes
router.route("/:movieId/reviews").get(controller.listReviews).all(methodNotAllowed);
router.route("/:movieId/theaters").get(controller.listTheatersPlayingMovie).all(methodNotAllowed);
router.route("/:movieId").get(controller.readMovie).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

//exports
module.exports = router;


