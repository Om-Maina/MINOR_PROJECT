// Get the cordinates for the given  city
const config = require('../config');
const request = require('request');

//this function will take location and callback funtion.
//returns cordinates detils from mapbox
const geocode = (location, callback) => {
    let url = config.mapbox_url + location + '.json?access_token=' + config.mapbox_token + '&limit=1'
    console.log(url)
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect location services', undefined)
        } else if (response.body.message) {
            callback('Not Authorized - No Token', undefined)
        } else if (response.body.features.length === 0) {
            callback('please provide valid location', undefined)
        }
        else {
            callback(undefined, {
                letitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;