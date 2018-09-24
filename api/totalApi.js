const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require("./../helper"),
    knex = require("../db/knex");



/*
|--------------------------------------------------------------------------
| Get the total Amount of posts a user has created
|--------------------------------------------------------------------------
*/

router.get("/postAmount", verifyToken,  (request, response) => {

    knex("posts")
        .where("posts.id", request.userId )
        .count()
        .then((postsAmount) => { response.status(200).json(postsAmount[0].count)})
        .catch(error => console.log(error));

});


/*
|--------------------------------------------------------------------------
| Get the total amount of people following the current user
|--------------------------------------------------------------------------
*/

    // .createTable("follower", (table) => {
    //     table.increments();
    //     table.integer("followerId").unsigned().references("id").inTable("users");
    //     table.integer("followeeId").unsigned().references("id").inTable("users")
    //     table.boolean("accept_request").defaultTo("false");
    // })

router.get("/following", verifyToken, (request, response) => {
    
    knex("follower")
        .where({
            followeeId: request.userId,
            accept_request: true
        })
        .count()
        .then((followingAmount) => { response.status(200).json(followingAmount[0].count)})
        .catch(error => console.log(error));
});


/*
|--------------------------------------------------------------------------
| Get the total amount of people the current user is following
|--------------------------------------------------------------------------
*/


router.get("/follower", verifyToken, (request, response) => {

    knex("follower")
        .where({
            followerId: request.userId,
            accept_request: true
        })
        .count()
        .then((followerAmount) => { response.status(200).json(followerAmount[0].count)})
        .catch(error => console.log(error));
});

module.exports = router;