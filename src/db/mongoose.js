const config = require('../config');
const mongoose = require('mongoose');

//connect to the database
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

