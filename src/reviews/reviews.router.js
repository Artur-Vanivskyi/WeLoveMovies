const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//This route will delete a review by ID (### DELETE /reviews/:reviewId)
//This route will allow you to partially or fully update a review. If the ID is incorrect, a `404` will be returned. (### UPDATE /reviews/:reviewId)
router
  .route("/:reviewId")
  //.get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router.route("/").all(methodNotAllowed);

//exports
module.exports = router;
