
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('saved').del()
    .then(function () {
      // Inserts seed entries
      return knex('saved').insert([
       
      ]);
    });
};
