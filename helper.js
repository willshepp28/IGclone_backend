const express = require("express"),
    jwt = require("jsonwebtoken");

// { JWT_SECRET_KEY } = require('./secret/config');

function verifyToken(request, response, next) {

    

    if (!request.headers.authorization) {
        console.log("Because you have no request.headers.auth")
        return response.status(401).send('Unauthorized request');

    }

    let token = request.headers.authorization.split(' ')[1];


    if (token === "null") {
        console.log("Because req.headers/auth is null")
        return response.status(401).send("Unauthorized request");
    }

    let payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
        console.log("Because you have no payload")
        return response.status(401).send("Unauthorized request");
    }


    request.userId = payload.user[0].id;
   
    next();
}




//     // Verify Token
// module.exports.verifyToken = function ( request, response, next) {

//     // Get auth header value
//     const bearerHeader = request.headers['authorization'];

//     // Check if bearer is undefined
//     if( typeof bearerHeader !== 'undefined') {

//         // Split at the space
//         const bearer = bearerHeader.split(' ');

//         // Get token from array
//         const bearToken = bearer[1];
//         request.token = bearToken;
//         console.log("success")
//         next();

//     } else {
        
//         // Forbidden
//         response.json({
//             message: "Permission denied"
//         })
//     }


// }

module.exports = verifyToken;
