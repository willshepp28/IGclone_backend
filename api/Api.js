/*
|--------------------------------------------------------------------------
|  Dependencies
|--------------------------------------------------------------------------
*/

const router = require("express").Router(),
    jwt = require("jsonwebtoken"),
    { JWT_SECRET_KEY } = require('../secret/config'),
    { signupUser, loginUser } = require("../db/query/authQuery"),
    verifyToken = require("../helper"),
    knex = require("../db/knex.js");





  
/**
 * 
 *      /api/v1
 * 
 * 
 *      * This is the api to:
 *          - welome message /api/v1
 *          - where users login /api/v1/login
 *          - where users signup /api/v1/signup
 *          - used to see the specific users profile page information /api/v1/profile/:id
 *          
 * 
 */



/*
|--------------------------------------------------------------------------
|  Welcome page
|--------------------------------------------------------------------------
*/
router.get("/", (request, response) => {
    response.status(200).json({ message: "Welcome to IG_Clone API"});
});






/*
|--------------------------------------------------------------------------
|  Login Api - Page where users login 
|       * used in the LoginComponent
|--------------------------------------------------------------------------
*/
router.post("/login", (request, response) => {



    if (request.body.username && request.body.password) {

        await loginUser(request.body.username, request.body.password)
            .then(user => {

                if (user == false) {
                    console.log('no users')
                    response.status(401).send("No user")
                } else {
                    console.log('issa user')
                    let token = jwt.sign({ user }, process.env.JWT_SECRET)
                    response.status(200).send({ token });
                }

            })
            .catch(error => {
                console.log(error);
                response.status(401).send("Invalid password")
            });
    }


});






/*
|--------------------------------------------------------------------------
|  Signup Api - Page where users login 
|       * used in the SignupComponent
|--------------------------------------------------------------------------
*/

router.post("/signup", async(request, response) => {

   await signupUser(request.body.username, request.body.email, request.body.password)
        .returning("*")
        .then(user => {
            console.log(user);
            response.status(200).json({ message: "Successfully Signed Up!"})
        })
        .catch(error => {
            console.log(error);
        })
});



/*
|--------------------------------------------------------------------------
| GET - gets one user profile data
|   * Used in the ProfileComponent
|--------------------------------------------------------------------------
*/

router.get("/profile/:id", verifyToken, ( request ,response) => {

    console.log(request.params.id)

    var userId = parseInt(request.params.id);
    console.log( request.params.id);
    console.log( userId)
    console.log(typeof userId)


    let user = knex.select("users.id", "username","profilePic" )
        .from("users")
        .where("users.id", userId)
        .then( user => {

            console.log(user)
            
            var userData = {
                username: user[0].username,
                profilePic: user[0].profilePic,
                posts: []
            };


            async function getPosts(){

                knex("posts")
                    .where("posts.id", userId)
                    .then(posts => {

                        for(var i = 0; i < posts.length; i++) {
                            userData.posts.push({ postId: user[i].postId, photo: user[i].photo})
                        }

                    })
                    .then(done => {
                        console.log(userData)
                        response.status(200).json(userData) })
                    
            }

            getPosts();

           }
        )
        .catch( error => console.log(error));

})













module.exports = router;