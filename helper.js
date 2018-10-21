const express = require("express"),
    jwt = require("jsonwebtoken");




/**
 * 
 *  
 *      * We use the verifyToken function to verify the json web token send from the client
 * 
 * 
 */


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



module.exports = verifyToken;
