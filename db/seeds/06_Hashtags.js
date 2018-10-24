
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('hashtags').del()
    .then(function () {
      // Inserts seed entries
      return knex('hashtags').insert([
        { name: "#yolo" }
      ]);
    });
};
