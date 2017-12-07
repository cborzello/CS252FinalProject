var api = require("./api.js");

testDarkSky();

function testGeoLocation() {
  var state = "California";
  var city = "Los Angelos";
  api.getCoordinates(city, state, function(result) {
    result=JSON.parse(result);
    var lattitude = result["results"][0]["geometry"]["location"]["lat"];
    var longitude = result["results"][0]["geometry"]["location"]["lng"];
    console.log("Lattitude:" + lattitude + "\nLongitude: " + longitude);
  });
}

function testDarkSky() {
  var state = "California";
  var city = "Los Angelos";
  api.getCoordinates(city, state, function(result) {
    result=JSON.parse(result);
    var lattitude = result["results"][0]["geometry"]["location"]["lat"];
    var longitude = result["results"][0]["geometry"]["location"]["lng"];
    console.log("Lattitude:" + lattitude + "\nLongitude: " + longitude);
    api.getWeather(lattitude, longitude, function(weather){
      weather= JSON.parse(weather);
      //for(var i = 0; i <weather["hourly"]["data"].length;i++ ){
        //console.log("Hour " + i + ": " + weather["hourly"]["data"][i]["time"]);
        console.log(weather["daily"]["data"][0]["precipType"]);
        
      //}
    });
  });
}
