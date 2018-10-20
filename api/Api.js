/*
|--------------------------------------------------------------------------
|  Dependencies
|--------------------------------------------------------------------------
*/

const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    { JWT_SECRET_KEY } = require('../secret/config'),
    verifyToken = require("../helper"),
    crypto = require("crypto"),
    knex = require("../db/knex.js");



let encrypt = (password => {
    return crypto.pbkdf2Sync(password, "salt", 10, 512, "sha512")
        .toString("base64");
});


  




router.get("/", (request, response) => {

    var decrypt = crypto.pbkdf2Sync("123", 'salt', 10, 512, 'sha512').toString('base64');


});


/*
|--------------------------------------------------------------------------
|  Login Api - Page where users login 
|--------------------------------------------------------------------------
*/


router.post("/login", (request, response) => {

    console.log(request.body)


    var decrypt = crypto.pbkdf2Sync(request.body.password, 'salt', 10, 512, 'sha512').toString('base64');

    if (request.body.username && request.body.password) {

        let user = knex.select()
            .from("users")
            .where({ username: request.body.username, password: decrypt })
            .then(user => {

                console.log(user);
                console.log(user === 0);



                if (user == false) {
                    console.log('no users')
                    response.status(401).send("No user")
                } else {
                    console.log('issa user')
                    let token = jwt.sign({ user }, process.env.JWT_SECRET)
                    response.status(200).send({ token });
                }

            })
            .catch(error => {
                console.log(error);
                response.status(401).send("Invalid password")
            });
    }


});





/*
|--------------------------------------------------------------------------
|  Signup Api - Page where users login 
|--------------------------------------------------------------------------
*/

router.post("/signup", (request, response) => {

    console.log(request.body);


    var userData = knex("users")
        .insert({
            username: request.body.username,
            email: request.body.email,
            password: encrypt(request.body.password)
        })
        .returning('id')
        .then(user => {

            console.log(user);

            let token = jwt.sign({ user }, process.env.JWT_SECRET)
            let payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            response.status(200).send({ token });
        })
        .catch(error => {
            console.log(error);
        })
});






router.post("/comments", verifyToken, (request, response) => {
/* 
    This is where users add comments to posts

    You will need the user.id from the request.userId
    And you will need the post.id included in the request.body
    Then insert the new comment in the database

    })
*/

    var comment = knex("comments")
        .insert({
            comment: request.body.comment,
            userId: request.userId,
            postId: request.body.id
        })
        .then(() => response.status(200).json("comment added"))
        .catch(error => console.log(error));
});



router.get("/profile/:id", verifyToken, ( request ,response) => {

    console.log(request.params.id)

    var userId = parseInt(request.params.id);
    console.log( request.params.id);
    console.log( userId)
    console.log(typeof userId)



    // let user = knex("users")
    //     .where("users.id", userId)


       // knex.select("posts.id", "users.id AS mainUserId", "photo", "username", "caption", "profilePic")
    //     .from("posts")
    //     .where('posts.id', userId)
    //     .innerJoin("users", "posts.user_id", "users.id")

    // let user = knex.select("users.id", "username" , "posts.id AS _postId", "photo", "profilePic")
    //     .from("users")
    //     .where("users.id", userId)
    //     .innerJoin("posts", "users.id", "posts.user_id")

    let user = knex.select("users.id", "username","profilePic" )
        .from("users")
        .where("users.id", userId)
        .then( user => {

            console.log(user)
            
            var userData = {
                username: user[0].username,
                profilePic: user[0].profilePic,
                posts: []
            };


            async function getPosts(){

                knex("posts")
                    .where("posts.id", userId)
                    .then(posts => {

                        for(var i = 0; i < posts.length; i++) {
                            userData.posts.push({ postId: user[i].postId, photo: user[i].photo})
                        }

                    })
                    .then(done => {
                        console.log(userData)
                        response.status(200).json(userData) })
                    
            }

            getPosts();


            

            // for(let i = 0; i < user.length; i++) {
            //     userData.posts.push({ postId: user[i]._postId, photo: user[i].photo})
            // } 

           }
        )
        .catch( error => console.log(error));

})




router.route("/addPost", verifyToken, (request, response) => {

    /*
        This route is where the user adds a new post

        DATA MODEL
             { photo: 'http://maltisudhatravels.com/wp-content/uploads/2015/05/dubai-22.jpg', caption: 'Iam living my life baby', user_id: 1},

        NEEDED
            photo off of request.body.photo,
            caption off of request.body.caption
            userId off of request.userId

    */

    var posts = knex("posts")
        .insert({
            photo: request.body.photo,
            caption: request.body.caption,
            user_id: request.userId
        })
        .then(() => response.status(200) )
        .catch(error => console.log(error))
})












module.exports = router;