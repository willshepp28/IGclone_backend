const crypto = require("crypto");
require('dotenv').config();





let encrypt = (password => {
    return crypto.pbkdf2Sync(password, "salt", 10, 512, "sha512")
        .toString("base64");
});



module.exports = {
    encrypt: encrypt
}