const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")
const cors = require("cors")

router.use(cors());
router.route("/:movieId/reviews").get(controller.readReviews).all(methodNotAllowed);
router.route("/:movieId/theaters").get(controller.readTheaters).all(methodNotAllowed);
router.route("/:movieId").get(controller.readMovie).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);
module.exports = router;

// const router = require("express").Router();
// const controller = require("./movies.controller");
// const methodNotAllowed = require("../errors/methodNotAllowed");

// router
//   .route("/:movieId/reviews")
//   .get(controller.listReviews)
//   .all(methodNotAllowed);

// router
//   .route("/:movieId/theaters")
//   .get(controller.listTheatersPlayingMovie)
//   .all(methodNotAllowed);

// router.route("/:movieId").get(controller.read).all(methodNotAllowed);

// router.route("/").get(controller.list).all(methodNotAllowed);

// module.exports = router;
