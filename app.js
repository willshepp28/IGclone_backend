/*
 |--------------------------------------------------------------------------
 | Require Dependencies
 |--------------------------------------------------------------------------
 */

 const express = require("express"),
    bodyParser = require("body-parser"),
    dotenv = require("dotenv"),
    cors = require("cors"),
    path = require("path"),
    morgan = require("morgan"),
    Api = require("./api/Api"),
    likesApi = require("./api/likesApi"),
    postApi = require("./api/postApi"),
    commentsApi = require("./api/commentsApi"),
    followerApi = require("./api/followApi"),
    savedApi = require("./api/saveApi"),
    totalApi = require("./api/totalApi"),
    imageUploadApi = require("./api/imageUploadApi");
    port = process.env.PORT || 3000;

application = express();





/*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/

application.use(morgan('dev'));
// application.use(morgan('combined'))

// parse application/json
application.use(bodyParser.json());
// parse application/x-www-form-urlencoded
application.use(bodyParser.urlencoded({ extended: false }));


application.use(cors())

require('dotenv').config();




/*
|--------------------------------------------------------------------------
| Api
|--------------------------------------------------------------------------
*/

application.use("/api/v1/imageUpload", imageUploadApi );
application.use("/api/v1/total", totalApi);
application.use("/api/v1/savedPost", savedApi)
application.use("/api/v1/follower", followerApi);
application.use("/api/v1/comments", commentsApi);
application.use("/api/v1/posts", postApi);
application.use('/api/v1/likes', likesApi);
application.use("/api/v1", Api);




/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/
application.listen( port, () => {
    console.log(`Server listening on port ${port}`);
})