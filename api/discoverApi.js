const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require("./../helper"),
    knex = require("../db/knex");



/**
 * 
 *  /api/v1/discover
 * 
 * 
 *      * This is the api to:
 *          - Helps the user discover new content by displaying new posts /api/v1/discover/posts
 *          - Suggests new people for the user to potentially follow /api/v1/discover/users
 *          
 * 
 */





/*
|--------------------------------------------------------------------------
| GET - gets a random set of posts for the user to see
|       * this is user in the explore component
|--------------------------------------------------------------------------
*/
router.get("/posts", (request, response) => {

    knex.select("id", "photo")
        .from("posts")
        .orderByRaw("RANDOM()")
        .then(post => response.status(200).json(post))
        .catch(error => console.log(error));

});





/*
|--------------------------------------------------------------------------
| GET - gets a random set of people for the user to potentially follower
|       * this is user in the explore component
|--------------------------------------------------------------------------
*/
router.get("/users", verifyToken, async (request, response) => {

    /*
        Goal: Show logged in user, new users they can follow
 
        Requirements:
        - Do not show currently logged in user
        - Do not show users that the logged in user has either already request, or is currently following
 
 
    */

    await knex.select("id", "username", "profilePic")
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

                    for (let i = 0; i < user.length; i++) {

                        if (limit <= 3) {
                            for (let x = 0; x < follower.length; x++) {

                                if (user[i].id !== follower[x].followeeId) {
                                    newUsers.push(user[i])
                                    limit++;
                                    console.log(limit);
                                }
                            }
                        }

                    }

                    response.status(200).json(user);
                })
                .catch(error => { console.log("follower", + error) });



        })
        .catch(error => console.log("user", + error));
});



module.exports = router;