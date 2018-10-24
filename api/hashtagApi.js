const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require("./../helper"),
    retrieveAllHashTags = require("./../helpers/findHashtag"),
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

   console.log(request.params);

   var hashtag = await knex.select("posts.id","posts.photo")
                    .from("hashtags")
                    .where("name", "#" + request.params.name)
                    .innerJoin("hash_posts", "hashtags.id", "hash_posts.hashId")
                    .innerJoin("posts", "hash_posts.postId", "posts.id")
                    .then(posts => {

                       console.log(posts[0])
                        
                        response.json(posts, );
                    })
                    .catch(error => { console.log(error)})

    

});


 // We need a way for a user to create as specific tag
router.post("/addhashtag", (request, response) => {

    /**
     *  Here we create the new hashtag
     * 
     * 1. Get request.body.id and request.body.caption
     * 2. Check if any hashtags are in the request.body.caption
     * 3. If so run a query to create the new hashtag if not is already in the hashtags table
     * 4. Then run a query to add the hashtags.id and request.body.id (postId) to hash_posts table
     */

     // Check to see if their is even a caption and post.id
    if(request.body[0].caption && request.body[0].id) {

        // if so we need to check if there is any hashtags in the caption string. And retrieve them if so.
       var hashtags =  retrieveAllHashTags(request.body[0].caption);

      
       // then we iterate through all hashs in hashtags and store it in the hashtags table if it doesnt exist
        hashtags.forEach((hash) => {

            // check if it exists
            knex("hashtags")
                .where("name", hash)
                .then(hashExist => {
                    
                    /**
                     * 
                     * if it dosnte exist
                     * 1. insert the  the row in the hashtags table and return the id
                     * 2. then insert the new row in the hash_posts table 
                     */
                    if(!hashExist.length) {
                    
                        // store hastag
                        // return hashtag.id
                        // store id (hashtagId) and request.body.id (postId) in hash_posts table
                        knex("hashtags")
                            .insert({ name: hash})
                            .returning("id")
                            .then(hashId => {

                                knex("hash_posts")
                                    .insert({
                                        hashId: parseInt(hashId),
                                        postId: request.body[0].id
                                    })
                                    .returning("*")
                                    .then((data) => { console.log("successfully added new user" + data)})
                                    .catch(error => console.log(error));

                            });

                    } else {

                        // if hashtag already exists we just make a reference to it in the hash_posts table
                        console.log(hashExist[0].id);
                        
                        knex("hash_posts")
                            .insert({
                                hashId: parseInt(hashExist[0].id),
                                postId: request.body[0].id
                            })
                            .then((data) => {console.log(data)})
                            .catch(error => console.log(error));
                    }
                })

        })
    }


  

});



module.exports = router;