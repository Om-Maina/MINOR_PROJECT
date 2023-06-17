
//Error fuction for upload profile image
exports.uploadProfileImageError = (error, req, res, next) =>{ 
    res.status(400).send({error : error.message})
}