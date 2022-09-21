const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//use of mapProperties
const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name"
});

//endpoint, shows a output by requested ID
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

//endpoint to update the reviews table by ID
//UPDATE /reviews/:reviewId
function update(updatedReview) {
  return knex("reviews as r")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
}

//endpoint to update and output critic data by ID
function updateCritic(reviewId) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .then(data => data.map(addCritic))
}

//endpoint to delete data by ID
//DELETE /reviews/:reviewId
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

//exports
module.exports = {
  read,
  update,
  updateCritic,
  delete: destroy
};






