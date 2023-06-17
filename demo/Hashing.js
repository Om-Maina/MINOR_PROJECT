const bcrypt = require('bcryptjs');

const mypassw = async () =>{
    const password = 'Ram!'
    const hashedPassword =  await bcrypt.hash(password, 8);
    console.log(password)
    console.log(hashedPassword)
    const isMatch = await bcrypt.compare('ram!', hashedPassword)
    console.log(isMatch)
}

mypassw()