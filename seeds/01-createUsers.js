const bcrypt = require("bcrypt");
let hashedPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
};

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  const password = await hashedPassword("1234");
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([{ username: "admin", password: 1234 }]);
    });
};
