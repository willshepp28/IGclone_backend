const router = require('express').Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require('../helper');


// api/v1/comments


    router.post("/", verifyToken, (request, response) => {
        /* 
            This is where users add comments to posts
        
            You will need the user.id from the request.userId
            And you will need the post.id included in the request.body
            Then insert the new comment in the database
        
            })
        */

        console.log(request.body);
        
            var comment = knex("comments")
                .insert({
                    comment: request.body.comment,
                    userId: request.userId,
                    postId: request.body.id
                })
                .then(() => response.status(200).json("comment added"))
                .catch(error => console.log(error));
        });



        

    router.route("/:id")
        .get((request, response) => {
            
            console.log("**********");
            console.log(request.params.id);
            console.log("**********");

            var userId = parseInt(request.params.id);


            knex.select("posts.id", "comments.id AS commentID", "users.id AS userId", "comment", "username")
                .from("posts")
                .where("posts.id", userId)
                .innerJoin("comments", "posts.id", "comments.postId")
                .innerJoin("users", "comments.userId", "users.id")
                .then(comments => { response.status(200).json(comments)})
                .catch(error => console.log(error));
            
        })
        .post((request, response) => {

        })
        
        


module.exports = router;