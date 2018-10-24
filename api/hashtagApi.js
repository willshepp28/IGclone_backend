const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require("./../helper"),
    knex = require("../db/knex");



/**
 * 
 *  /api/v1/hash
 * 
 * 
 *      * This is the api to: 
 *          
 * 
 */


 // We need a way for a user to get a specific tag
router.get("/:name", async(request, response) => {

  /**
   * 
   * Show post photos associated with hashtag in request.params.name
   * 
   */

   var hashtag = knex.select("posts.id","posts.photo")
                    .from("hashtags")
                    .where("name", "#" + request.params.name)
                    .innerJoin("hash_posts", "hashtags.id", "hash_posts.hashId")
                    .innerJoin("posts", "hash_posts.hashId", "posts.id")
                    .then(user => {
                        console.log(user);
                        response.json(user);
                    })
                    .catch(error => { console.log(error)})

    

});


 // We need a way for a user to create as specific tag
router.post("/addhashtag", (request, response) => {

});



module.exports = router;