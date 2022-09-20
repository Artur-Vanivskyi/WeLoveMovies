const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.readMovie(movieId)
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({ status: 404, message: "Movie cannot be found." });
}
async function list(req, res) {
    const data = await service.list(req.query.is_showing)
    res.json({ data })
}
async function readMovie(req, res) {
    res.json({ data: res.locals.movie })
}
async function readTheaters(req, res) {
    const data = await service.readTheaters(res.locals.movie.movie_id)
    res.json({ data })
}
async function readReviews(req, res) {
    const data = await service.readReviews(res.locals.movie.movie_id)
    res.json({ data })
}
module.exports = {
    list: asyncErrorBoundary(list),
    readMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readMovie)],
    readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
    readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviews)]

}

// const service = require("./movies.service");
// const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// function list(req, res, next) {
//   const { is_showing = false } = req.query;
//   if (is_showing) {
//     service
//       .isShowingList()
//       .then((data) => res.json({ data }))
//       .catch(next);
//   } else {
//     service
//       .list()
//       .then((data) => res.json({ data }))
//       .catch(next);
//   }
// }

// async function movieExists(req, res, next) {
//   const { movieId } = req.params;
//   const movie = await service.read(movieId);
//   if (movie) {
//     res.locals.movie = movie;
//     return next();
//   } else {
//     next({
//       status: 404,
//       message: "Movie cannot be found.",
//     });
//   }
// }

// function read(req, res, next) {
//   const movie = res.locals.movie;
//   res.json({ data: movie });
// }

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

// async function listReviews(req, res, next) {
//   const { movie_id } = res.locals.movie;
//   const data = await service.listReviews(movie_id);
//   res.json({ data });
// }

// module.exports = {
//   list,
//   read: [asyncErrorBoundary(movieExists), read],
//   listTheatersPlayingMovie: [
//     asyncErrorBoundary(movieExists),
//     asyncErrorBoundary(listTheatersPlayingMovie),
//   ],
//   listReviews: [
//     asyncErrorBoundary(movieExists),
//     asyncErrorBoundary(listReviews),
//   ],
// };
