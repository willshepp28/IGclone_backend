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

    var decrypt = crypto.pbkdf2Sync(request.body.password, 'salt', 10, 512, 'sha512').toString('base64');

    if (request.body.username && request.body.password) {

        let user = knex.select()
            .from("users")
            .where({ username: request.body.username, password: decrypt })
            .then(user => {



                if (user === 0) {
                    response.status(401).send("No user")
                } else {
                    let token = jwt.sign({ user }, JWT_SECRET_KEY)
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



    var userData = knex("users")
        .insert({
            username: request.body.username,
            email: request.body.email,
            password: request.body.password
        })
        .returning('id')
        .then(user => {

            console.log(user);

            let token = jwt.sign({ user }, JWT_SECRET_KEY)
            let payload = jwt.verify(token, JWT_SECRET_KEY);
            console.log(payload);
            response.status(200).send({ token });
        })
        .catch(error => {
            console.log(error);
        })
});


// router.get('/posts/:id', verifyToken, (request, response) => {

//     var userId = parseInt(request.params.id);

//     knex.select("posts.id", "users.id AS mainUserId", "photo", "username", "caption", "profilePic")
//         .from("posts")
//         .where('posts.id', userId)
//         .innerJoin("users", "posts.user_id", "users.id")
//         .then(user => {
//             response.status(200).json(user)
//         })
//         .catch(error => console.log(error));

//     // knex("posts")
//     //     .where({
//     //         id: userId
//     //     })
//     //     .then(user => response.status(200).json(user))
//     //     .catch(error => console.log(error));
// })





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


    let user = knex.select("users.id", "username" , "posts.id AS _postId", "photo", "profilePic")
        .from("users")
        .where('users.id', userId)
        .innerJoin("posts", "users.id", "posts.user_id")
        .then( user => {
            
            var userData = {
                username: user[0].username,
                profilePic: user[0].profilePic,
                posts: []
            };

            for(let i = 0; i < user.length; i++) {
                userData.posts.push({ postId: user[i]._postId, photo: user[i].photo})
            } 

            response.status(200).json(userData)}
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



router.get("/users", verifyToken, (request, response) => {

    /*
        Goal: Show logged in user, new users they can follow

        Requirements:
        - Do not show currently logged in user
        - Do not show users that the logged in user has either already request, or is currently following


           // await knex.select("posts.id", "users.id AS userId", "username", "photo", "caption", "profilePic")
    //     .from("posts")
    //     .innerJoin('users', 'posts.user_id', 'users.id')
    //     .then(post => {

        .createTable("follower", (table) => {
        table.increments();
        table.integer("followerId").unsigned().references("id").inTable("users");
        table.integer("followeeId").unsigned().references("id").inTable("users")
        table.boolean("accept_request").defaultTo("false");
    })


    */



    // Get all users that dont have a followeeId attachted to 

    console.log("This is the user route")



/*
    This gets all the users, except the logged in user

    Now we just have to exclude the users the loggin in user has either already requested, or currently following
*/
    knex.select("id","username", "profilePic")
        .from("users")
        .whereNot("id", request.userId)
        .orderByRaw('RANDOM()')
        .limit(3)
        .then(user => {

            var newUsers = [];
            var limit = 0;

            // if user.id is a match with followeeId we delete from db
            knex("follower")
                .whereNot("followeeId", request.userId)
                .then(follower => {

                    // if users longer tha
                    
                    for(let i = 0; i < user.length; i++){

                        if(limit <= 3) {
                            for(let x = 0; x < follower.length; x++) {
                            
                                if(user[i].id !== follower[x].followeeId) {
                                    newUsers.push(user[i])
                                    limit++;
                                    console.log(limit);
                            }
                            
    
                            }
                        }

                        
                    }

                    response.status(200).json(user);
                })
                .catch(error => console.log(error));

          
    
        })
        .catch(error =>  console.log(error));
});



router.get("/post", (request, response) => {

    knex.select("id", "photo")
        .from("posts")
        .orderByRaw("RANDOM()")
        .then(post => response.status(200).json(post))
        .catch(error => console.log(error));

});









module.exports = router;