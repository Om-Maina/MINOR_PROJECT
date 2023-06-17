const users = []


const addUser = ({ id, username, room }) => {

    // clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate the data
    if (!username || !room) {
        return {
            error: 'Username and Room are required!'
        }
    }

    //checkfor exiting user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    //validate username
    if (existingUser) {
        return {
            error: 'UserName is in use!'
        }
    }

    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// Get Users
const getUser = (id) => users.find((user) => user.id === id)

// Get Users In Room 
const getUsersInRoom = ((room) => {
    room = room.trim().toLowerCase();
    return users.filter((user) => user.room === room)
})


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}

console.log('User array:', users)