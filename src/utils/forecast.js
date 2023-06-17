// Get the details from whearther stack.
const config = require('../config');
const request = require('request');

//this function will take cordinates and callback funtion.
//returns wheather detils from whether stack
const forecast = (latitude, logitude, callback) => {
    let url = config.wheatherStack_url + 
    config.wheatherStack_token + '&query='+latitude+', '+logitude
    console.log(url)
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect weather services', undefined)
        } else if (response.body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0]+
                ', It is currently ' + response.body.current.temperature +
                ' degress out.It feels like ' + response.body.current.precip +
                ' % chance of rain in ' + response.body.location.name)
        }
    })
}

module.exports = forecast;