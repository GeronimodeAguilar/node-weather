const axios = require('axios');
var express = require('express');
var router = express.Router();

let detailAdress;
let encodedAdress = 19149;
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdress}&key=AIzaSyAKAuGeGiFJgClLjhPz6sAm8A9UfMY6MmI`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
let lat = response.data.results[0].geometry.location.lat;
let lng = response.data.results[0].geometry.location.lng;
let weatherUrl = `https://api.darksky.net/forecast/0019cfe6a1bd2eb0a65ae77626263571/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  detailAdress = response.data.results[0].formatted_address
  return axios.get(weatherUrl);
}).then((response) => {
let  temperature = response.data.currently.temperature;
let  apparentTemperature = response.data.currently.apparentTemperature;
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('weather', { 
      title: 'Weather',
      location: detailAdress,
      temperature: apparentTemperature
     });
  });
console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});


  
  module.exports = router;