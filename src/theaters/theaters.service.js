const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

//setting the format of the data that we need to reduce from table / usin=g written function reduceProperties
const addMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies", null, "created_at"],
  updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
});

//return all the `theaters` and, the movies playing at each theatre added to the `movies` key. will need to check the `movies_theaters` table.
function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*", "m.*")
    .then((data) => addMovies(data));
}

//exports 
module.exports = {
  list,
};
