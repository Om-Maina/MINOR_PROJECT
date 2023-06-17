const express = require('express')
const weatherService = require('../service/weatherService')

const router = new express.Router();

//Controllers
router.get('/', weatherService.home)
router.get('/weatherapp',weatherService.getWetherapp)
router.get('/newsapp', weatherService.news)
router.get('/weather', weatherService.weather)
router.get('/newstoday', weatherService.topNews)
router.get('/about', weatherService.about)
router.get('/help', weatherService.help)

module.exports = router;