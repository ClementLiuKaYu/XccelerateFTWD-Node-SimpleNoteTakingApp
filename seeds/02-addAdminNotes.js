exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("notes").insert([
        { user_id: 1, content: "Hi, I am Clement." },
        { user_id: 1, content: "How are you?" },
        { user_id: 1, content: "This is my note taking app." },
      ]);
    });
};
