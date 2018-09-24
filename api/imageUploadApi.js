const router = require("express").Router(),
    AWS = require("aws-sdk"),
    multer = require("multer"),
    multerS3 = require('multer-s3'),
    jwt = require("jsonwebtoken"),
    verifyToken = require("../helper"),
    knex = require("../db/knex");
    // { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require("../secret/aws-config");



// configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


var s3 = new AWS.S3();


var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ig-clone2019',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, "profilePic/" + Date.now().toString() + '.jpg')
        }
    })
});


var uploadPost = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ig-clone2019',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, "posts/" + Date.now().toString() + '.jpg')
        }
    })
});


// checks file type
function checkFileType(){

    // Allowed ext
    const fileTypes = /jpeg|jpg|png|gif/;

    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Check mime
    const mimeType = filetypes.test(file.mimeType)

    if(mimeType && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
};



router.post("/changeProfile", verifyToken, upload.any(), (request, response) => {

    /*
        1. User adds a new profile picture
        2. We upload the image to amazon s3
        3. Then we replace users.profilePic with new image string
    */
    // knex("users")
    //     .where("users.id", request.userId)
    //     .update({
    //         profilePic: request.files[0].location
    //     })
    //     .then(() => response.status(200))
    //     .catch(() => console.log(error));
    console.log(request.files[0].location);

    var changeProfile = knex('users')
        .where('id', request.userId)
        .update({
            profilePic: request.files[0].location
        })
        .then(() => {
            response.status(200).json({ messgae: "Succesfully added a new profile picture" })
        })
        .catch((error) => console.log(error));
});





router.post("/newPost", verifyToken, uploadPost.any(), (request, response) => {
    /*
      1. User add a new post
      2. We upload the image to amazon s3
      3. Then we add a new post with image string to posts databse

  */

console.log(request.files);
response.status(200).json(request.files[0].location);



});


module.exports = router;