const crypto = require("crypto");

let encrypt = (password => {
  return crypto.pbkdf2Sync(password, "salt", 10, 512, "sha512")
  .toString("base64");
});


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'willshepp44',profilePic: 'https://i.kinja-img.com/gawker-media/image/upload/s--vE_ofLB2--/c_fill,fl_progressive,g_center,h_200,q_80,w_200/gdlhsths0iqnoj5ri4vz.jpg', email: 'willsheppard2@gmail.com', phone_number: '8431234567', password: encrypt('123')},
        { username: 'tomFord', profilePic: 'https://vg-images.condecdn.net/image/JZorwQxPJa9/crop/200/square', email: 'tomford@outlook.com', phone_number: '5551238765', password: encrypt('tomford66')},
        { username: 'danny_ballin1', email: 'dannyballin@gmail.com', phone_number: '9996668888', password: encrypt('555')},
        { username: 'sarahlovin5', email: 'sarahzzzworld@yahoo.com', phone_number: '5551238888', password: encrypt('666')},
        { username: 'tommy_rules', profilePic: 'https://www.mumsnet.com/uploads/talk/201610/large-898199-images.jpg', email: 'tombrown@gmail.com', phone_number:'7776663333', password: encrypt('1234')},
        { username: 'maryjohnson1', profilePic: 'http://rs223.pbsrc.com/albums/dd264/afrodite00/Random%20BW%20People/Cola.jpg~c200', email: 'maryjohnson@gmail.com', phone_number:'2223334444',password: encrypt('1236')}
      ]);
    });
};
