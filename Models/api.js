var request = require("request");



exports.getWeather = getWeather;
function getWeather(lattitude, longitude, cb){
    var urlFormat = "https://api.darksky.net/forecast/[key]/[latitude],[longitude]";
    var key = "0e343747a0c15dcb932bdb2aa2a4be67";
    var url = "https://api.darksky.net/forecast/" + key + "/" + lattitude + "," + longitude;

    request(url, function(error, response, body){
        cb(body);
    });
    
}
exports.getCoordinates = getCoordinates;
function getCoordinates(address, cb) {
    var urlFormat = "http://maps.googleapis.com/maps/api/geocode/json?parameters";
    var key = "google api key for geocode";
    var city;
    var state;
    var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + city + ",+" + state + "&key=" + key;

    request(url, function(error, response, body){
        cb(body);
    });
}