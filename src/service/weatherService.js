    const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const news = require('../utils/news')

exports.home = ((req, res) => {
    res.render('home', {
        title: 'home',
        name: 'Om Meena'
    })
})

exports.getWetherapp = ((req, res) => {
    res.render('weather', {
        title: 'Weather',
        name: 'Om Meena'
    })
})

exports.news = ((req, res) => {
    res.render('newsPage', {
        title: 'news',
        name: 'Om Meena'
    })
})

exports.topNews = ((req, res) => {
    news((error, response) => {
        if (error) {
            return res.status(404).json({
                status: 'error',
                error: 'unable to connect news API',
            });
        }
        res.send(response)
    })
})

exports.about = ((req, res) => {
    res.render('about', {
        title: 'about',
        name: 'Om Meena'
    })
})

exports.help = ((req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Om Meena'
    })
})

exports.weather =((req, res) => {
    if (!req.query.address) {
        return res.status(400).json({
            status: 'error',
            error: 'req query param can not be empty',
        });
    }
    //Call geocode for conrdinates
    geocode(req.query.address, (err, { letitude, longitude, location } = {}) => {
        if (err) {
            return res.status(404).json({
                status: 'error',
                error: 'Unable to find location, try another search',
            });
        }
        //Call forecast for weather details    
        forecast(letitude, longitude, (error, forecadatastData) => {
            if (error) {
                return res.status(404).json({
                    status: 'error',
                    error: 'forecast',
                });
            }
            //send details on the UI...
            res.send({
                forecast: forecadatastData,
                location: location,
                address: req.query.address
            })
        });
    });
});

exports.other = ((req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Page not found'
    })
})

