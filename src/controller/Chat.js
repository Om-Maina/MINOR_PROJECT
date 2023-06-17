const express = require('express')
const path = require('path');
const viewHtml = path.join(__dirname, '../../templates/viewhtml')

const router = new express.Router();

router.get('/chat',(req, res) => {
    res.sendFile(viewHtml+'/chat.html')
})

router.get('/chatapp',(req, res) => {
    res.sendFile(viewHtml+'/joinchat.html')
})

module.exports = router;