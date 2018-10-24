

/**
 * 
 *  
 *      * We use this function to retrieve all the hashtags in a string
 * 
 * 
 */

function retrieveAllHashTags(caption, arrayOfHashtags) {

    var regex = /(\s|^)\#\w\w+\b/gm;
    hashtags = caption.match(regex);

   // if their is hashtags in the users post we return the hashs
    if(hashtags) {
        return hashtags;
    } else {
        return false;
    }
}
 

module.exports = retrieveAllHashTags;