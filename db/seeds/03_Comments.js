
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        { comment: "@Will Wussup man" , userId: 2, postId: 1},
        { comment: "Live your best life dude", userId: 3, postId: 1}
      ]);
    });
};
