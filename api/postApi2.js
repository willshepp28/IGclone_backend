const router = require("express").Router()
    jwt = require("jsonwebtoken"),
    verifyToken = require("../helper"),
    knex = require("../db/knex");





/*
|--------------------------------------------------------------------------
|  Posts Api - Gets posts from all users with all info
|--------------------------------------------------------------------------


1. We need to get all posts
2. Where the currently logged in user is following
3. limit about ten


*/


router
    .route("/")
    .get(verifyToken, (request, response) => {

        // get all posts 
        const followeeComments = await knex.select()
            .from("posts")
            .where()
            .limit()
            .then()
            .catch(error => console.log(error));


        // get all likes


        // get all comments

    });





module.exports = router;