const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require("../helper"),
    knex = require("../db/knex");



/*

    1. Get all followers
    2. Request to follow
    3. Accept a follow request
    4. Unfollower a person user is following
*/


router.post("/sendRequest/:followeeId", verifyToken, (request, response) => {
    /*
        Goal: User sent a friend request so we will store it in the database

        Dependencies:
            followeeId = request.params.followerId
            followerId = request.userId

    */

   knex("follower")
    .insert({
        followeeId: parseInt(request.params.followeeId),
        followerId: request.userId
    })
    .then(() => response.status(200).json({ message: "successfully send follow request"}))
    .catch(error => console.log(error))
})

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
                // console.log(follower);

                response.status(200).json(follower)
            })
            .catch(error => console.log(error));
    })




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