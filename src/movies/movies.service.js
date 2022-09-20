const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name"
});
function list(is_showing) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ is_showing: true })
    .groupBy("m.movie_id")
    .orderBy("m.movie_id");
}
function readMovie(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}
function readTheaters(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({ movie_id: movieId, is_showing: true })
    .groupBy("t.theater_id")
    .orderBy("t.theater_id");
}
function readReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ movie_id: movieId })
    .then(data => data.map(addCritic));
}
module.exports = {
  list,
  readMovie,
  readTheaters,
  readReviews
};

// const knex = require("../db/connection");
// const mapProperties = require("../utils/map-properties");

// function list() {
//   return knex("movies").select("*");
// }

// function isShowingList() {
//   return knex("movies as m")
//     .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
//     .select("m.*")
//     .where({ "mt.is_showing": true })
//     .groupBy("m.movie_id");
// }

// function read(movieId) {
//   return knex("movies").select("*").where({ movie_id: movieId }).first();
// }

// // function listTheatersPlayingMovie(id) {
// //   return knex("theaters as t")
// //     .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
// //     .select("*")
// //     .where({
// //       "mt.is_showing": true,
// //       "mt.movie_id": id,
// //     });
// // }

// function listTheatersPlayingMovie(movie) {
//   return knex("theaters as t")
//     .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
//     .join("movies as m", "m.movie_id", "mt.movie_id")
//     .select("t.*", "mt.is_showing", "m.movie_id")
//     .where({ "m.movie_id": movie.movie_id });
// }


// const addCritic = mapProperties({
//   critic_id: "critic.critic_id",
//   preferred_name: "critic.preferred_name",
//   surname: "critic.surname",
//   organization_name: "critic.organization_name",
//   //created_at: "critic.created_at",
//   ///updated_at: "critic.updated_at",
// })


// function listReviews(movieId){
//   return knex("reviews as r")
//   .join("critics as c", "c.critic_id", "r.critic_id")
//   .select("*")
//   .where({movie_id: movieId})
//   .then((data) => data.map(addCritic))
// }

// module.exports = {
//   list,
//   isShowingList,
//   read,
//   listTheatersPlayingMovie,
//   listReviews,
// };
