
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('hash_posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('hash_posts').insert([
        // { hashId: 1, postId: 1},
        // { hashId: 1, postId: 3}
      ]);
    });
};
