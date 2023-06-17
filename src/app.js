const express = require('express');
const http = require('http');
const path = require('path');
const hbs = require('hbs');
const service = require('./service/weatherService');
// require('../src/db/mongoose');
require('../src/controller/UserController');
const userRouter = require('./controller/UserController')
const weatherRouter = require('./controller/WeatherContorller')
const taskRouter = require('./controller/TaskController')
const chatRouter = require('./controller/Chat')

const app = express();
const server = http.createServer(app);

//defines path to express config
const publicdir = path.join(__dirname, '../public')
const viewsdir = path.join(__dirname, '../templates/views')
const partialsdir = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsdir)
hbs.registerPartials(partialsdir)

//express.static used for static page render
app.use(express.static(publicdir));

//This will set the body parameters for the post Methods
app.use(express.json());

app.use((req, res, next) =>{
    console.log(req.method, req.path)
    next()
})

//Register Routers/controllers with express
app.use(userRouter);
app.use(taskRouter);
app.use(weatherRouter);
app.use(chatRouter);

//404 for when no endpoint matches
app.get('*', service.other)


module.exports = server;
