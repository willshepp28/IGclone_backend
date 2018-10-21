const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require("../helper"),
    knex = require("../db/knex");




/**
 * 
 *  /api/v1/follower
 * 
 * 
 *      * This is the api to:
 *          -  request to follow another user /api/v1/follower/sendRequest/:followerId
 *          -  get all the followers that, where the user hasnt accepted their follow request yet /api/v1/follower/:id
 *          -  used to accept a users request to follow /api/v1/follower/acceptRequest
 *          -  used to deny a users request to follow /api/v1/follower/denyRequest 
 *          
 * 
 */






/*
|--------------------------------------------------------------------------
| POST - sent when a user request to follow another user
| * used in the ExploreComponent and ProfileComponent
|--------------------------------------------------------------------------
*/
router.post("/sendRequest/:followeeId", verifyToken, (request, response) => {
   
   knex("follower")
    .insert({
        followeeId: parseInt(request.params.followeeId),
        followerId: request.userId
    })
    .then(() => response.status(200).json({ message: "successfully send follow request"}))
    .catch(error => console.log(error))
})


/*
|--------------------------------------------------------------------------
| GET - we use this to get all the followers that, where the user hasnt accepted their follow request yet.
|       * this is user in the AppComponent
|--------------------------------------------------------------------------
*/
router.route("/:id")
    .get((request, response) => {
       

        knex.select("follower.id", "followerId", "followeeId", "username", "profilePic")
            .from("follower")
            .innerJoin("users", "follower.followerId", "users.id")
            .where({
                followeeId: request.params.id,
                accept_request: false
            })

            .then(follower => {
                response.status(200).json(follower)
            })
            .catch(error => console.log(error));
    })


/*
|--------------------------------------------------------------------------
| POST - when another user requests to follow us, we use this to accept their request
|       * used in the 
|--------------------------------------------------------------------------
*/
router.post("/acceptRequest", verifyToken, (request, response) => {

    console.log(request.body.id);

    knex("follower")
    .where({
        followerId: request.body.id,
        followeeId: request.userId
    })
    .update({
        accept_request: true
    })
    .then(() => {response.status(200).json({message: "Accepted request"}), console.log("BURRRR")})
    .catch(error => console.log(error));
});






/*
|--------------------------------------------------------------------------
| POST - when another user request to follow us, we use this to deny the request
|--------------------------------------------------------------------------
*/
router.post("/denyRequest", verifyToken, (request, response) => {

    console.log(request.body.id)

    knex("follower")
        .where({
            followerId: request.body.id,
            followeeId: request.userId
        })
        .del()
        .then(() => {response.status(200).json({ message: "Deny follower request"}), console.log("You denied his request tisk tisk")})
        .catch(error => console.log(error));
})


module.exports = router;