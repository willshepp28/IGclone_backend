/*
 |--------------------------------------------------------------------------
 | Require Dependencies
 |--------------------------------------------------------------------------
 */
const knex = require("../knex");
const { encrypt } = require("../../helpers/encrypt");




function Authentication() {
    return knex("users");
};

function SelectAuthentication(...props) {
    return knex.select(...props).from("users");
};






/*
|--------------------------------------------------------------------------
| QUERY - POST request to signup a new user
|--------------------------------------------------------------------------
*/
function signupUser(username, email, password){
    console.log("inside")
    return Authentication().insert({ username: username, email: email, password: encrypt(password)});
}


/*
|--------------------------------------------------------------------------
| QUERY - POST checks if user exists in the database
|--------------------------------------------------------------------------
*/
function loginUser(username, password){
    return Authentication().where({ username: username, password: encrypt(password)})
}



module.exports = {
    signupUser: signupUser,
    loginUser: loginUser
};
