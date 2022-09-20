const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
      res.locals.review = review
      return next()
  }
  return next({ status: 404, message: "Review cannot be found." })
}
async function update(req, res) {
  const time = new Date().toISOString()
  const reviewId = res.locals.review.review_id
  const updatedReview = {
      ...req.body.data,
      review_id: reviewId,
  }
  await service.update(updatedReview)
  const rawData = await service.updateCritic(reviewId)
  const data = { ...rawData[0], created_at: time, updated_at: time }
  res.json({ data })
}
async function destroy(req, res) {
  const data = await service.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

// async function list(req, res, next) {
//   const data = await service.list();
//   res.json({ data });
// }

// async function reviewExists(req, res, next) {
//   const review = await service.read(req.params.reviewId);
//   if (review) {
//     res.locals.review = review;
//     return next();
//   }
//   next({
//     status: 404,
//     message: "Review cannot be found",
//   });
// }

// function read(req, res, next) {
//   const review = res.locals.review;
//   res.json({ data: review });
// }

// async function destroy(req, res, next) {
//   const { review } = res.locals;
//   await service.destroy(review.review_id);
//   res.sendStatus(204);
// }

// async function update(req, res) {
//   const time = new Date().toISOString()
//   const reviewId = res.locals.review.review_id
//   const updatedReview = {
//       ...req.body.data,
//       review_id: reviewId,
//   }
//   await service.update(updatedReview)
//   const rawData = await service.updateCritic(reviewId)
//   const data = { ...rawData[0], created_at: time, updated_at: time }
//   res.json({ data })
// }

// async function update(req, res, next) {
//   const updatedReview = {
//     ...req.body.data,
//     review_id: res.locals.review.review_id,
//   };
//   await service.update(updatedReview);
//   const data = await service.updateCritic(updatedReview.review_id);
//   res.json({ data });
// }

module.exports = {
  //list: asyncErrorBoundary(list),
  //read: [asyncErrorBoundary(reviewExists), read],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
