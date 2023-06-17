const socket = io();

//Elements
const $messageForm = document.querySelector('#message-from');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.getElementById('messages')
const $sidebar = document.getElementById('sidebar')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })


const autoScroll = () =>{

    //New Message Element 
    const $newMessage = $messages.lastElementChild

    //Hight of the new Message
    const newMessageStyle = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyle.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    //visible Height
    const visibleHeight = $messages.offsetHeight
    
    //Height of message container
    const containerHeight = $messages.scrollHeight

    //How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if(containerHeight - newMessageHeight <= scrollOffset){
        $messages.scrollTop = $messages.scrollHeight
    }
}

//Receive chat message from server
socket.on('message', (message) => {
    var html = Mustache.to_html(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })

    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

//Receive location from server
socket.on('locationMessage', (data) => {
    var html = Mustache.render(locationTemplate, {
        username: data.username,
        url: data.text,
        createdAt: moment(data.createdAt).format('h:mm a')
    })

    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

//Receive User List from server
socket.on('userList', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })

    $sidebar.innerHTML = html
})

//form data from chat.hbs
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //Disable button
    $messageFormButton.setAttribute('disabled', 'disabled')

    //When click on the send message and submit, it send message to server
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message, (error) => {

        //Enable a button
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }
    })
})

$sendLocationButton.addEventListener('click', () => {   
    $sendLocationButton.setAttribute('disabled', 'disabled')
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            logitude: position.coords.longitude
        }, () => {
            console.log('location shared!')
            $sendLocationButton.removeAttribute('disabled')
        })
    })
})

socket.emit('join', { username, room }, (error) => {
    alert(error)
    location.href = '/chatapp'
})