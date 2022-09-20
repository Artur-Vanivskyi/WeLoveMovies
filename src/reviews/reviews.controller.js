const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next){
  const data = await service.list();
  res.json({data})
}

function read(req, res, next){
  const review = res.locals.review
  res.json({review})
}

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found",
  });
}

async function destroy(req, res, next) {
  const { review } = res.locals;
  await service.destroy(review.review_id);
  res.sendStatus(204);
}

async function update(req, res, next){
    const updatedReview = {
        ...res.locals.review,
        ...req.body,
        review_id: res.locals.review.review_id
    }
    const data = await service.update(updatedReview);
    res.json({data})
}



module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
  update:[asyncErrorBoundary(reviewExists), update],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
