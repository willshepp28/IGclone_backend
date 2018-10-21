const router = require('express').Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require('../helper');



/**
 * 
 *  /api/v1/comments
 * 
 * 
 *      * This is the api to:
 *          - creates a comment /api/v1/comments
 *          - gets all comments on a specific post /api/v1/comments/:id
 *          
 * 
 */





/*
|--------------------------------------------------------------------------
| POST - creates a new comment on a post
|       * this is user in the HomeComponent
|--------------------------------------------------------------------------
*/
router.post("/", verifyToken, (request, response) => {
   

    // you will need the user.id from the request.userId
    // And you will need the post.id included in the request.body
    var comment = knex("comments")
        .insert({
            comment: request.body.comment,
            userId: request.userId,
            postId: request.body.id
        })
        .then(() => response.status(200).json("comment added"))
        .catch(error => console.log(error));
});






/*
|--------------------------------------------------------------------------
| GET - gets all comments on a specifc post
|       * this is user in the PostComponent
|--------------------------------------------------------------------------
*/
router.route("/:id")
    .get((request, response) => {

        var postId = parseInt(request.params.id);


        knex.select("posts.id", "comments.id AS commentID", "users.id AS userId", "comment", "username")
            .from("posts")
            .where("posts.id", postId)
            .innerJoin("comments", "posts.id", "comments.postId")
            .innerJoin("users", "comments.userId", "users.id")
            .then(comments => { response.status(200).json(comments) })
            .catch(error => console.log(error));

    })
    .post((request, response) => {

    })




module.exports = router;