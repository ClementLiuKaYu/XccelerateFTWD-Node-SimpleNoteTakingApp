const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

const authChallenger = (username, password, callback) => {
  knex("users").then((users) => {
    for (let user of users) {
      if (user.username == username && user.password == password) {
        return callback(null, true);
      }
    }
    return callback(null, false);
  });
};
module.exports = authChallenger;
