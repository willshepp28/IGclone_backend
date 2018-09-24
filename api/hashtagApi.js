const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require("./../helper"),
    knex = require("../db/knex");



// Omelies french bakery

router
    .route("/")
    get((request, response) => {
        console.log("Hashtags")
    })
    .post((request, response) => {
        consoe.log("Making the new hashtag");
    });




router
    .route("/:id")
    .get((request, response) => {

    })
    .post((request, response) => {
        console.log(response);
    });



module.exports = router;