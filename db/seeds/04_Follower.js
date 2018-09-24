
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('follower').del()
    .then(function () {
      // Inserts seed entries
      return knex('follower').insert([
        { followerId: 2, followeeId:1, accept_request: false  },
        { followerId: 3, followeeId: 1, accept_request: false},
        { followerId: 4, followeeId: 1, accept_request: false},
        { followerId: 5, followeeId: 1, accept_request: true}

      ]);
    });
};
