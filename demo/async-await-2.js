require('../src/db/mongoose')
const User = require('../src/db/model/user')

const updateAgeAndCount = async (id, age) =>{
    const update = await User.findByIdAndUpdate(id,{age})
    const count = await User.count({age})
    return count;
}

updateAgeAndCount('5f03e205f8b769f6c898d129',30).then((count) =>{
    console.log(count);
}).catch((e) =>{
    console.log(e);
})

