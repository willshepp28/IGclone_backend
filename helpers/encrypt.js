const crypto = require("crypto");
require('dotenv').config();



/*
|--------------------------------------------------------------------------
| We use this function to encrypt the user password
|--------------------------------------------------------------------------
*/
let encrypt = (password => {
    return crypto.pbkdf2Sync(password, "salt", 10, 512, "sha512")
        .toString("base64");
});




module.exports = {
    encrypt: encrypt
}