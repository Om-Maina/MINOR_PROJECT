const wheatherStack_url = 'http://api.weatherstack.com/current'
const wheatherStack_token = '?access_key=95c391f0f231af4f5a398ab90708a86d'
const mapbox_token = 'pk.eyJ1IjoicmFtbWFpbmE4OCIsImEiOiJja2F3MmlzOHAwMGF4MnJtdnh3eHo0emEwIn0.Gvsf0-bzAivoJeIF6hFW_g'
const mapbox_url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'
const news_url = 'http://newsapi.org/v2/top-headlines?country=in&apiKey=239e1ece4f694ab6a0d0bc355594f3ab'

//const mongo_cluster_url = 'mongodb+srv://ram:Ramu2020!@cluster0.fh4br.mongodb.net/weather-stock-app?retryWrites=true&w=majority';
//const mongo_local_url = 'mongodb://127.0.0.1:27017/weather-stock-app';
const db_veriable = 'local';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY


module.exports = {
    wheatherStack_url, 
    wheatherStack_token,
    mapbox_url,
    mapbox_token,
    news_url,
    db_veriable,
    SENDGRID_API_KEY
 }
