require('../src/db/mongoose')
const User = require('../src/db/model/user')

User.findByIdAndUpdate('5f03e205f8b769f6c898d129', { age: 28 }).then((user) => { //First promise call
    console.log('USER :', user)
    return User.count({age: 28}) //Second promise call
}).then((result) => {
    console.log('Result :', result)
}).catch((e) => {
    console.log('E :', e)
})

