const server = require('./app')
const socketio = require('socket.io')
const { genrateMessage } = require('./utils/message')
const { addUser, getUser, removeUser, getUsersInRoom } = require('./utils/chatUsers')
const { get } = require('./db/schema/userSchema')

// socket.emit :
// io.emit
// socket.to(room).emit
// socket.broadcast.to(room).emit


//Set port to start application 
const port = process.env.PORT

//Setup socket for the server
const io = socketio(server)

//web socket connection 
io.on('connection', (socket) => {
    console.log('New web socket connection')

    //when join the room
    socket.on('join', (options, callback) => {
        //add user to the list
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        //Join Room
        socket.join(user.room)

        //Welcome message when you leand on the chat page
        socket.emit('message', genrateMessage('Admin','WELCOME!'))

        //Broadcast message when user joins
        socket.broadcast.to(user.room).emit('message', genrateMessage('Admin',`${user.username} has Joined!`))
        io.to(user.room).emit('userList', {
            room:user.room,
            users:getUsersInRoom(user.room)
        })
    })


    //Send (USER A to all in the room) Message from one user to all other users
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', genrateMessage(user.username,message))
        callback()
    })

    //Send the location
    socket.on('sendLocation', (cords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', genrateMessage(user.username,`https://google.com/maps?q=${cords.latitude},${cords.logitude}`))
        callback()
    })

    //send message when User left the page
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', genrateMessage(`${user.username} has left!`))
            io.to(user.room).emit('userList', {
                room:user.room,
                users:getUsersInRoom(user.room)
            })
        }
    })

})


//Application starting point 
server.listen(port, () => {
    console.log(`Started Weather-app on port ${port}!`)
    console.log(__dirname)
    console.log(__filename)
    console.log('WELCOME');
})
