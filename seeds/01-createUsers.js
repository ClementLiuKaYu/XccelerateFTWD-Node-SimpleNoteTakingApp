exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([{ username: "admin", password: 1234 }]);
    });
};
