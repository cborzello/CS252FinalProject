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
function getCoordinates(city, state, cb) {
    var urlFormat = "https://maps.googleapis.com/maps/api/geocode/json?parameters";
    var key = "AIzaSyC0KbXSKVMu3kTYlDUp6v43iUZ7TnyzQXc";

    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + ",+" + state + "&key=" + key;

    request(url, function(error, response, body){
        cb(body);
    });
}
