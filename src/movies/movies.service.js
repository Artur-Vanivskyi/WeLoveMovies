const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function isShowingList() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

// function listTheatersPlayingMovie(id) {
//   return knex("theaters as t")
//     .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
//     .select("*")
//     .where({
//       "mt.is_showing": true,
//       "mt.movie_id": id,
//     });
// }

function listTheatersPlayingMovie(movie) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*", "mt.is_showing", "m.movie_id")
    .where({ "m.movie_id": movie.movie_id });
}
// Also there is a chnace to get something out of this query if work on it
// return knex("movies as m")
//     .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
//     .select("m.*")
//     .where({ is_showing: true })
//     .groupBy("m.movie_id");

module.exports = {
  list,
  isShowingList,
  read,
  listTheatersPlayingMovie,
};
