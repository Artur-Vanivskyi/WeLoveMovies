const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//use of mapProperties
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name"
});

//list movies
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

// function list(is_showing) {
//   return knex("movies as m")
//     .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
//     .select("m.*")
//     .where({ is_showing: true })
//     .groupBy("m.movie_id")
//     .orderBy("m.movie_id");
// }

//endpoint to show movies by ID
function readMovie(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

//endpoint listTheatersPlayingMovie
function listTheatersPlayingMovie(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({ movie_id: movieId, is_showing: true })
    .groupBy("t.theater_id")
    .orderBy("t.theater_id");
}

//endpoint listReviews
function listReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ movie_id: movieId })
    .then(data => data.map(addCritic));
}

//exports
module.exports = {
  list,
  isShowingList,
  readMovie,
  listTheatersPlayingMovie,
  listReviews
};








