const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require("../helper"),
    knex = require("../db/knex");



/* 
    1. Get all saved posts
    2. Add a saved post
    3. Delete a saved post

*/

// .createTable("savedPost", (table) => {
//     table.increments();
//     table.integer("userId").unsigned().references("id").inTable("users");
//     table.integer("postId").unsigned().references("id").inTable("posts");
// })

router.route("/")
    .get((request, response) => {
        knex.select()
            .from("saved")
            .then(savedPost => {
                response.status(200).json(savedPost);
            })
            .catch(error => console.log(error))
    })
    .post(verifyToken, (request, response) => {

        console.log(request.body.id);

        knex("saved")
            .where({
                userId: request.userId,
                postId: request.body.id
            })
            .then((savedPost) => {

                if (savedPost.length === 0) {

                    // Save if user has not already saved post
                    console.log("Saved")
                    knex("saved")
                        .insert({
                            userId: request.userId,
                            postId: request.body.id
                        })
                        .then(() => response.status(200).json({ message: "Successfully saved post" }))
                        .catch(error => console.log(error));
                } else {

                    console.log("Unsaved")
                    // delete if post is already saved
                    knex("saved")
                        .where({
                            userId: request.userId,
                            postId: request.body.id
                        })
                        .del()
                        .then(() => response.status(200).json({ message: "Successfully deleted post" }))
                        .catch(error => console.log(error))
                }

            })
            .catch(error => console.log(error))


        // knex("saved")
        //     .insert({
        //         userId: request.userId,
        //         postId: request.body.id
        //     })
        //     .then(() => response.status(200).json({ message: "Successfully saved post"}))
        //     .catch(error => console.log(error));

    })




router.get("/:id", (request, response) => {

    var userId = parseInt(request.params.id);

    knex.select("saved.id", "posts.id AS post_id", "photo", "saved.userId")
        .from("saved")
        .innerJoin("posts", "saved.postId", "posts.id" )
        .then(saved => {

            var usersSavePost = [];

            saved.forEach(element => {

                if(element.userId === userId) {
                    usersSavePost.push(element);
                }
            })
            console.log(usersSavePost);
            response.status(200).json(usersSavePost);
        })
        .catch(error => console.log(error));
})



module.exports = router;