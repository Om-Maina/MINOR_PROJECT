// Get the latest news
const config = require('../config');
const request = require('request');


const url = config.news_url;
const news  = (callback) =>{
    console.log('news', url)
    request({url, json:true}, (error, response) =>{
        if(error){
            callback("unable to connect news API", undefined)
        }else{
            callback(undefined, response.body.articles)
        }
    })
}

module.exports = news;

