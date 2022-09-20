const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function list(req, res, next) {
  const { is_showing = false } = req.query;
  if (is_showing) {
    service
      .isShowingList()
      .then((data) => res.json({ data }))
      .catch(next);
  } else {
    service
      .list()
      .then((data) => res.json({ data }))
      .catch(next);
  }
}

async function movieExists(req, res, next) {
  const {movieId} = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  } else {
    next({
      status: 404,
      message: "Movie cannot be found.",
    });
  }
}

function read(req, res, next) {
  const movie = res.locals.movie;
  res.json({ data: movie });
}

// async function listTheatersPlayingMovie(req, res, next) {
//   const { movie_id } = res.locals.movie;
//   const theaters = await service.listTheatersPlayingMovie(movie_id);
//   res.json({ data: theaters });
// }

async function listTheatersPlayingMovie(req, res, next) {
  const { movie } = res.locals;
  const data = await service.listTheatersPlayingMovie(movie);
  res.json({ data });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(movieExists), read],
  listTheatersPlayingMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheatersPlayingMovie),
  ],
};
