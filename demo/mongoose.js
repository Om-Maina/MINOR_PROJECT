const mongoose = require('mongoose');
const validator = require('validator');

//Connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-app', {
    useNewUrlParser: true,
    useCreateIndex: true
})

//Create Model like define table in SQL
const user = mongoose.model('user', {
    name: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('provide valid email address')
            }
        }
    },
    age: {
        type: Number,
        deafult: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('age must be a positive number');
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password should not contain "password"')
            }
        },
    }
})

//define document data for user collection
const me = new user({
    name: ' Gopal ',
    email: ' Ggopl@gmail.com ',
    password: ' fords '
})

//Save the data into the database
me.save().then(() => {
    console.log('Me ', me)
}).catch((error) => {
    console.log('Error!', error)
})
