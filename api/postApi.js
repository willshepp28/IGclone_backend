const router = require('express').Router()
jwt = require('jsonwebtoken'),
    verifyToken = require("../helper"),
    knex = require('../db/knex');



/**
 * 
 *      /api/v1/posts
 * 
 * 
 *      * This is the api to get:
 *          - all the posts with comments, likes, save info attached /api/v1/posts
 *          - used to get the updated information on one post when user likes or saves post /api/v1/posts/update/:id
 *          - gets all posts that belong to a specific user /api/v1/posts/all/:id
 *          - used to get one post /api/v1/posts/:id
 *          - creates a new post /api/v1/posts/addPost
 * 
 */




/*
|--------------------------------------------------------------------------
| GET - post from all users
|       * used in the HomeComponent
|--------------------------------------------------------------------------
*/
router.get("/", verifyToken, async (request, response) => {




    await knex.select("posts.id", "users.id AS userId", "username", "photo", "caption", "profilePic")
        .from("posts")
        .innerJoin('users', 'posts.user_id', 'users.id')
        .then(post => {



            // We use this to add the totalLikes property to each post
            // We also use this to add an array of comments on each
            post.forEach((element, index, array) => {
                element.totalLikes = 0;
                element.comments = [];
                element.isSaved = false;


            })


            // gets all saved post and adds them to the corresponding post
            async function saved() {
                var savedPost = await knex("saved")
                    .where({
                        userId: request.userId,
                    })
                    .then(savedPost => {

                        for (let i = 0; i < savedPost.length; i++) {
                            for (let x = 0; x < post.length; x++) {

                                if (savedPost[i].postId === post[x].id) {
                                    post[x].isSaved = true;
                                }
                            }
                        }

                    })
                    .catch(error => console.log(error))
            }

            saved();




            // gets all comments and adds them to the corresponding post
            async function comments() {

                // get all likes, match it to post, the push in that posts comments array
                var allComments = await knex.select("comments.id", "comment", "users.id As users_id", "username", "postId", )
                    .from("comments")
                    .innerJoin("users", "comments.userId", "users.id")
                    .then(comment => {

                        console.log(comment);

                        for (let i = 0; i < post.length; i++) {

                            for (let x = 0; x < comment.length; x++) {

                                if (comment[x].postId === post[i].id) {

                                    // adds username from posts to 
                                    // comment[x].username = post[i].username;
                                    // pushs comment array to the users array
                                    post[i].comments.push(comment[x]);
                                }
                            }

                        }
                    })
                    .then(done => { getLikes(); })
                    .catch(error => console.log(error))

            }

            comments();




            // gets all likes and adds them to the corresponding post
            async function getLikes() {

                // how we get likes
                var alllikes = knex.select()
                    .from("likes")
                    .then(likes => {
                        for (i = 0; i < likes.length; i++) {


                            // for(x =0; i < post.length;)
                            for (x = 0; x < post.length; x++) {

                                if (likes[i].postId === post[x].id) {
                                    post[x].totalLikes += 1;
                                    // console.log(post[x])
                                }
                            }
                        }


                        return response.json(post);

                    })
                    .catch(error => { console.log(error), response.status(401).send(error) });
            }








        })
        .catch(error => {
            console.log(error);
            return response.status(401).send("no posts")
        })



});






/*
|--------------------------------------------------------------------------
|   GET - Get one post for when liked/unlike or saved/unsaved
|       * we use this to get the updated post when user likes/saves a post
|       * used in the HomeComponent 
|--------------------------------------------------------------------------
*/
router.get("/update/:id", verifyToken, async (request, response) => {



    var postId = parseInt(request.params.id);

    await knex.select("posts.id", "users.id AS userId", "username", "photo", "caption", "profilePic")
        .from("posts")
        .where("posts.id", postId)
        .innerJoin("users", "posts.user_id", "users.id")
        .then(post => {

    
                      // We use this to add the totalLikes property to each post
            // We also use this to add an array of comments on each
            post.forEach((element, index, array) => {
                element.totalLikes = 0;
                element.comments = [];
                element.isSaved = false;


            })


            // checks to see if user saved the corresponding post
            async function saved() {
                var savedPost = await knex("saved")
                    .where({
                        postId: postId,
                        userId: request.userId,
                    })
                    .then(savedPost => {


                        for (let i = 0; i < savedPost.length; i++) {
                            for (let x = 0; x < post.length; x++) {

                                if (savedPost[i].postId === post[x].id) {
                                    post[x].isSaved = true;
                                }
                            }
                        }

                    })
                    .catch(error => console.log(error))
            }

            saved();







            // gets all commnents for the corresponding post
            async function comments() {

                // get all likes, match it to post, the push in that posts comments array
                var allComments = await knex.select("comments.id", "comment", "users.id As users_id", "username", "postId", )
                    .from("comments")
                    .innerJoin("users", "comments.userId", "users.id")
                    .then(comment => {


                        for (let i = 0; i < post.length; i++) {

                            for (let x = 0; x < comment.length; x++) {

                                if (comment[x].postId === post[i].id) {
                                    
                                    // adds username from posts to 
                                    // comment[x].username = post[i].username;
                                    // pushs comment array to the users array
                                    post[i].comments.push(comment[x]);
                                }
                            }

                        }
                    })
                    .then(done => { getLikes(); })
                    .catch(error => console.log(error))

            }

            comments();




            // gets all likes for the corresponding post
            async function getLikes() {


                // how we get likes
                var alllikes = knex.select()
                    .from("likes")
                    .then(likes => {
                        for (i = 0; i < likes.length; i++) {


                            // for(x =0; i < post.length;)
                            for (x = 0; x < post.length; x++) {

                                if (likes[i].postId === post[x].id) {
                                    post[x].totalLikes += 1;
                                }
                            }
                        }

                        return response.json(post);

                    })
                    .catch(error => { console.log(error), response.status(401).send(error) });
            }

        })
        .catch(error => { console.log(error) })


    

});



/*
|--------------------------------------------------------------------------
|   GET - get all posts of a user by id
|       * we use this to get all the specific users post
|       * used in the PostComponent 
|--------------------------------------------------------------------------
*/
router.get("/all/:id", verifyToken, (request, response) => {

    var userId = parseInt(request.params.id);

    knex.select()
        .from("posts")
        .where("posts.user_id", userId)
        .then(user => {

            console.log("this is all/:id")
            console.log(user);
            console.log("this is all/:id")
            response.status(200).json(user)
        })
        .catch(error => console.log(error));
})





/*
|--------------------------------------------------------------------------
|  GET - gets one post for 
|       * used in the OnePostComponent 
|--------------------------------------------------------------------------
*/
router.get('/:id', verifyToken, (request, response) => {

    var userId = parseInt(request.params.id);

    knex.select("posts.id", "users.id AS mainUserId", "photo", "username", "caption", "profilePic")
        .from("posts")
        .where('posts.id', userId)
        .innerJoin("users", "posts.user_id", "users.id")
        .then(user => {
            response.status(200).json(user)
        })
        .catch(error => console.log(error));

});





/*
|--------------------------------------------------------------------------
|   POST - creates a new post
|       * used in the AddPostComponent 
|--------------------------------------------------------------------------
*/
router.post("/addPost", verifyToken, (request, response) => {
  

    knex("posts")
        .insert({
            photo: request.body.photo,
            caption: request.body.caption,
            user_id: request.userId
        })
        .then(() => response.status(200).json({ message: "Successfully added a new post" }))
        .catch(error => console.log(error));

});








module.exports = router;