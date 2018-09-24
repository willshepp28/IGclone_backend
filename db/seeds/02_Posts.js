
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        { photo: 'http://maltisudhatravels.com/wp-content/uploads/2015/05/dubai-22.jpg', caption: 'Iam living my life baby', user_id: 1},
        { photo: 'https://target.scene7.com/is/image/Target/14549692', caption: "I just wanna be the greatest", user_id: 3},
        { photo: 'https://pbs.twimg.com/profile_images/820357473802612736/qGK_QGPM_400x400.jpg', caption: "I wanna travel", user_id: 2},
        { photo: 'https://res.cloudinary.com/teepublic/image/private/s--yLL35BNK--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1507153197/production/designs/1949635_0.jpg', caption: "Ready for my full beard to come in, so i can be apart of the beard gang lol.", user_id: 5},
        { photo: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F47730312%2F104401535635%2F1%2Foriginal.jpg?w=1000&auto=compress&rect=0%2C25%2C1080%2C540&s=e518c9aa0f026c88e840a5016d7233c6', caption: "My homeboy is bugging me like crazy to go to this party smh lol", user_id: 2},
        { photo: 'https://wl2009.files.wordpress.com/2009/12/atlas.jpg', caption: "The ladies call me chocolate zueus yuppp", user_id: 1},
        { photo:'https://thechive.files.wordpress.com/2018/03/gym-2.jpg?quality=85&strip=info&w=600', caption: "How iam feeling today lol", user_id: 1}
      ]);
    });
};
