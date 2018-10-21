const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require("./../helper"),
    knex = require("../db/knex");


/**
 * 
 *  /api/v1/total
 *      * This is the api to get the total amount of:
 *          - posts a user has made /postAmount/:id
 *          - followers a user has /following/:id
 *          - people the user is following /follower/:id
 * 
 */




/*
|--------------------------------------------------------------------------
| GET - get the total Amount of posts a user has created
|       * used in the profile component
|--------------------------------------------------------------------------
*/
router.get("/postAmount/:id", verifyToken,  (request, response) => {

    knex("posts")
        .where("posts.user_id", request.params.id || request.userId )
        .count()
        .then((postsAmount) => { 
            response.status(200).json(postsAmount[0].count)})
        .catch(error => console.log(error));

});




/*
|--------------------------------------------------------------------------
| GET - the total amount of logging in users followers
|        * used in the profile component
|--------------------------------------------------------------------------
*/
router.get("/following/:id", verifyToken, (request, response) => {
    
    knex("follower")
        .where({
            followeeId: request.params.id || request.userId,
            accept_request: true
        })
        .count()
        .then((followingAmount) => { response.status(200).json(followingAmount[0].count)})
        .catch(error => console.log(error));
});



/*
|--------------------------------------------------------------------------
| GET - the total amount of people the user is following
|        * used in the profile component
|--------------------------------------------------------------------------
*/
router.get("/follower/:id", verifyToken, (request, response) => {

    knex("follower")
        .where({
            followerId: request.params.id || request.userId,
            accept_request: true
        })
        .count()
        .then((followerAmount) => { response.status(200).json(followerAmount[0].count)})
        .catch(error => console.log(error));
});

module.exports = router;