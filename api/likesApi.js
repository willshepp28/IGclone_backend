const router = require('express').Router()
verifyToken = require("../helper"),
    jwt = require('jsonwebtoken'),
    knex = require('../db/knex');




/**
 * 
 *  /api/v1/likes
 * 
 * 
 *      * This is the api to:
 *          -  adds a new like to a post /api/v1/likes
 *          
 * 
 */




/*
|--------------------------------------------------------------------------
| POST - creates a new like
| * used in the HomeComponent
|--------------------------------------------------------------------------
*/
router.post("/", verifyToken, (request, response) => {


    var postLike = knex("likes")
        .where({
            postId: request.body.id,
            userId: request.userId
        })
        .then(likes => {

            //    console.log(likes);

            console.log(`You have ${likes.length} likes`)


            // if their are posts returned from the database
            // create posts
            if (likes.length === 0) {
                console.log("You dont have likes")

                // adds like
                var addLike = knex("likes")
                    .insert({
                        postId: request.body.id,
                        userId: request.userId
                    })
                    .then(() => { console.log("added like"), response.status(200).json("added like") })
                    .catch(error => console.log(error));
            }


            // if their are posts returned from the database
            // delete posts
            if (likes.length > 0) {
                console.log("You have likes")

                var deleteLike = knex("likes")
                    .where({
                        postId: request.body.id,
                        userId: request.userId
                    })
                    .del()
                    .then(() => {
                        console.log("deleted like")
                        response.status(200).json("Deleted like")
                    })
                    .catch(error => {
                        console.log(error);
                        response.sendStatus(401);
                    })


            }

        })
        .catch(error => console.log(error))

});



module.exports = router;