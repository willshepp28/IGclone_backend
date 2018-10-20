const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    verifyToken = require("./../helper"),
    knex = require("../db/knex");


router.get("/posts", (request, response) => {

    knex.select("id", "photo")
        .from("posts")
        .orderByRaw("RANDOM()")
        .then(post => response.status(200).json(post))
        .catch(error => console.log(error));

});





router.get("/users", verifyToken, async (request, response) => {

    /*
        Goal: Show logged in user, new users they can follow
 
        Requirements:
        - Do not show currently logged in user
        - Do not show users that the logged in user has either already request, or is currently following
 
 
    */



    // Get all users that dont have a followeeId attachted to 

    console.log("This is the user route")
    console.log(typeof request.userId);



    /*
        This gets all the users, except the logged in user
    
        Now we just have to exclude the users the loggin in user has either already requested, or currently following
    */
    await knex.select("id", "username", "profilePic")
        .from("users")
        .whereNot("id", request.userId)
        .orderByRaw('RANDOM()')
        .limit(3)
        .then(user => {

            var newUsers = [];
            var limit = 0;

            // if user.id is a match with followeeId we delete from db
            knex("follower")
                .whereNot("followeeId", request.userId)
                .then(follower => {

                    // if users longer tha

                    for (let i = 0; i < user.length; i++) {

                        if (limit <= 3) {
                            for (let x = 0; x < follower.length; x++) {

                                if (user[i].id !== follower[x].followeeId) {
                                    newUsers.push(user[i])
                                    limit++;
                                    console.log(limit);
                                }


                            }
                        }


                    }

                    response.status(200).json(user);
                })
                .catch(error => { console.log("follower", + error) });



        })
        .catch(error => console.log("user", + error));
});



module.exports = router;