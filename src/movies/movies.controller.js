const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//checking if movie exists 
async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.readMovie(movieId)
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({ status: 404, message: "Movie cannot be found." });
}

//list of the movies
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
//list of the movies
// async function list(req, res) {
//     const data = await service.list(req.query.is_showing)
//     res.json({ data })
// }

//mobie by ID
async function readMovie(req, res) {
    res.json({ data: res.locals.movie })
}

// // async function listTheatersPlayingMovie(req, res, next) {
// //   const { movie_id } = res.locals.movie;
// //   const theaters = await service.listTheatersPlayingMovie(movie_id);
// //   res.json({ data: theaters });
// // }
// async function listTheatersPlayingMovie(req, res, next) {
//   const { movie } = res.locals;
//   const data = await service.listTheatersPlayingMovie(movie);
//   res.json({ data });
// }
async function listTheatersPlayingMovie(req, res) {
    const data = await service.listTheatersPlayingMovie(res.locals.movie.movie_id)
    res.json({ data })
}

// async function listReviews(req, res, next) {
//   const { movie_id } = res.locals.movie;
//   const data = await service.listReviews(movie_id);
//   res.json({ data });
// }
async function listReviews(req, res) {
    const data = await service.listReviews(res.locals.movie.movie_id)
    res.json({ data })
}

//exports
module.exports = {
    list: asyncErrorBoundary(list),
    readMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readMovie)],
    listTheatersPlayingMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheatersPlayingMovie)],
    listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)]

}















