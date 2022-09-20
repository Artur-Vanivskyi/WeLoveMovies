const knex = require("../db/connection");
const mapPropeties = require("../utils/map-properties");

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function list(){
  return knex("reviews")
  .select("*")
}

const addCritic = mapPropeties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    prganizatiob_name: "critic.organization_name"
});



function update(updatedReview){
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({review_id: updatedReview.review_id})
    .update(updatedReview, "*")
    .then(addCritic)
}

module.exports = {
  list,
  read,
  destroy,
  update,
};
