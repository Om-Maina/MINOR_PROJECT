const multer = require('multer');

const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please upload correct files: jpg|jpeg|png'))
        }
        cb(undefined,true)
    }
})

module.exports = upload;