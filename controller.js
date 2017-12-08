var Database = require("./Models/Database.js");
var api = require("./Models/api.js");
//var Weather = require("./Models/Weather.js");
//Database.clearDatabase();

module.exports = function(app) {
    app.get("/", function(request, response) {
            //Request for homepage
            var loginToken = request.cookies.loginToken;
            if(loginToken === undefined) {
                //User is not logged in
                response.render("welcome");
            }else {
                Database.getUser(loginToken, function(user) {
                    if(user === undefined || user === null) {
                        //invalid loginToken
                        response.clearCookie("loginToken");
                        response.render("welcome");
                    }else {
                        //User exists
                        var state = user.state;
                        var city = user.city;
                        api.getCoordinates(city, state, function(result) {
                          result=JSON.parse(result);
                          var latitude = result["results"][0]["geometry"]["location"]["lat"];
                          var longitude = result["results"][0]["geometry"]["location"]["lng"];
                          console.log("Latitude:" + latitude + "\nLongitude: " + longitude);
                          api.getWeather(latitude, longitude, function(weather){
                              weather = JSON.parse(weather);
                              var hourlySummary= weather["daily"]["data"][0]["summary"];
                              var icon= weather["hourly"]["data"][0]["icon"];
                              var currentTemperature = Math.round(parseFloat(weather["hourly"]["data"][0]["temperature"]));
                              var precipitationType = weather["daily"]["data"][0]["precipType"];
                              if(precipitationType === undefined){
                                  precipitationType= "Precipitation";
                              }
                              var precipitationChance = weather["daily"]["data"][0]["precipProbability"];
                              precipitationChance= 100*parseFloat(precipitationChance);
                              console.log(icon);

                              response.render("homepage", {precipitationChance:precipitationChance,
                                precipitationType:precipitationType ,city:user.city, latitude:latitude,
                                longitude:longitude, currentTemperature:currentTemperature,icon:icon,
                                hourlySummary:hourlySummary});
                          });
                        });
                    }
                });
            }
    });

    app.get("/complex", function(request, response) {
            //Request for homepage
            var loginToken = request.cookies.loginToken;
            if(loginToken === undefined) {
                //User is not logged in
                response.render("welcome");
            }else {
                Database.getUser(loginToken, function(user) {
                    if(user === undefined || user === null) {
                        //invalid loginToken
                        response.clearCookie("loginToken");
                        response.render("welcome");
                    }else {
                        //User exists
                        var state = user.state;
                        var city = user.city;
                        api.getCoordinates(city, state, function(result) {
                          result=JSON.parse(result);
                          var latitude = result["results"][0]["geometry"]["location"]["lat"];
                          var longitude = result["results"][0]["geometry"]["location"]["lng"];
                          api.getWeather(latitude, longitude, function(weather){
                              weather = JSON.parse(weather);
                              //currently
                              var currentlySummary= weather["currently"]["summary"];
                              var currentlyIcon = weather["currently"]["icon"];
                              var currentlyPrecipType = weather["currently"]["data"][0]["precipType"];
                              var currentlyPrecipType = weather["currently"]["data"][0]["precipType"];
                              if(currentlyPrecipType === undefined){
                                  currentlyPrecipType= "Precipitation";
                              }
                              var currentlyPrecipChance = weather["currently"]["data"][0]["precipProbability"];
                              currentlyPrecipChance= 100*parseFloat(currentlyPrecipChance);
                              var currentlyTemp = weather["currently"]["data"][0]["temperature"];
                              var currentlyApparentTemp = weather["currently"]["data"][0]["apparentTemperature"];
                              var currentlyDew = weather["currently"]["data"][0]["dewPoint"];
                              var currentlyHumidity = weather["currently"]["data"][0]["humidity"];
                              var currentlyPressure = weather["currently"]["data"][0]["pressure"];
                              var currentlyWindSpeed = weather["currently"]["data"][0]["windSpeed"];
                              var currentlyCloudCover = weather["currently"]["data"][0]["cloudCover"];
                              var currentlyVisibility = weather["currently"]["data"][0]["visibility"];

                              //hourly
                              var hourlySummary= weather["hourly"]["summary"];
                              var hourlyPrecipType = weather["hourly"]["data"][0]["precipType"];
                              var hourlyPrecipType = weather["hourly"]["data"][0]["precipType"];
                              if(hourlyPrecipType === undefined){
                                  hourlyPrecipType= "Precipitation";
                              }
                              var hourlyPrecipChance = weather["hourly"]["data"][0]["precipProbability"];
                              hourlyPrecipChance= 100*parseFloat(hourlyPrecipChance);
                              var hourlyIcon = weather["hourly"]["icon"];
                              var hourlyTemp = weather["hourly"]["data"][0]["temperature"];
                              var hourlyApparentTemp = weather["hourly"]["data"][0]["apparentTemperature"];
                              var hourlyDew = weather["hourly"]["data"][0]["dewPoint"];
                              var hourlyHumidity = weather["hourly"]["data"][0]["humidity"];
                              var hourlyPressure = weather["hourly"]["data"][0]["pressure"];
                              var hourlyWindSpeed = weather["hourly"]["data"][0]["windSpeed"];
                              var hourlyCloudCover = weather["hourly"]["data"][0]["cloudCover"];
                              var hourlyVisibility = weather["hourly"]["data"][0]["visibility"];

                              //daily
                              var dailySummary= weather["daily"]["summary"];
                              var dailyIcon = weather["daily"]["icon"];
                              var dailyPrecipType = weather["daily"]["data"][0]["precipType"];
                              if(dailyPrecipType === undefined){
                                  dailyPrecipType= "Precipitation";
                              }
                              var dailyPrecipChance = weather["daily"]["data"][0]["precipProbability"];
                              dailyPrecipChance= 100*parseFloat(dailyPrecipChance);
                              var dailyTempHigh = Math.round(parseFloat(weather["daily"]["data"][0]["temperatureHigh"]));
                              var dailyTempLow = Math.round(parseFloat(weather["daily"]["data"][0]["temperatureLow"]));
                              var dailyApparentTempHigh = Math.round(parseFloat(weather["daily"]["data"][0]["apparentTemperatureHigh"]));
                              var dailyApparentTempLow = Math.round(parseFloat(weather["daily"]["data"][0]["apparentTemperatureLow"]));
                              var dailyDew = weather["daily"]["data"][0]["dewPoint"];
                              var dailyHumidity = weather["daily"]["data"][0]["humidity"];
                              var dailyPressure = weather["daily"]["data"][0]["pressure"];
                              var dailyWindSpeed = weather["daily"]["data"][0]["windSpeed"];
                              var dailyWindGust = weather["daily"]["data"][0]["windGust"];
                              var dailyuvIndex = weather["daily"]["data"][0]["uvIndex"];
                              var dailyCloudCover = weather["daily"]["data"][0]["cloudCover"];
                              var dailyVisibility = weather["daily"]["data"][0]["visibility"];

                              response.render("homepage", {
                                currentlySummary:currentlySummary, currentlyIcon:currentlyIcon, currentlyPrecipType:currentlyPrecipType,
                                currentlyPrecipChance:currentlyPrecipChance,currentlyTemp:currentlyTemp, currentlyApparentTemp:currentlyApparentTemp,
                                currentlyDew:currentlyDew, currentlyHumidity:currentlyHumidity, currentlyPressure:currentlyPressure, currentlyWindSpeed:currentlyWindSpeed,
                                currentlyCloudCover:currentlyCloudCover, currentlyVisibility:currentlyVisibility,
                                hourlySummary:hourlySummary, hourlyIcon:hourlyIcon, hourlyPrecipType:hourlyPrecipType,
                                hourlyPrecipChance:hourlyPrecipChance,hourlyTemp:hourlyTemp, hourlyApparentTemp:hourlyApparentTemp,
                                hourlyDew:hourlyDew, hourlyHumidity:hourlyHumidity, hourlyPressure:hourlyPressure, hourlyWindSpeed:hourlyWindSpeed,
                                hourlyCloudCover:hourlyCloudCover, hourlyVisibility:hourlyVisibility,
                                dailySummary:dailySummary, dailyIcon:dailyIcon, dailyPrecipType:dailyPrecipType,
                                dailyPrecipChance:dailyPrecipChance,dailyTempHigh:dailyTempHigh, dailyTempLow:dailyTempLow,
                                dailyApparentTempHigh:dailyApparentTempHigh, dailyApparentTempLow:dailyApparentTempLow,
                                dailyDew:dailyDew, dailyHumidity:dailyHumidity, dailyPressure:dailyPressure, dailyWindSpeed:dailyWindSpeed,
                                dailyCloudCover:dailyCloudCover, dailyVisibility:dailyVisibility, dailyuvIndex:dailyuvIndex,
                                city:user.city, latitude:latitude, longitude:longitude});
                          });
                        });
                    }
                });
            }
    });

    app.get("/register", function(request, response){
        response.render("register");
    });

    app.post("/register", function(request, response) {
        //Request to register new user
        //Request to login user
        Database.registerUser(request.body, function(error) {
            if(error) {
                //Invalid login credentials
                response.render("register");
            }else {
                //User Registered!
                response.redirect("/");
            }
        });
    });

    app.post("/login", function(request, response) {
        //Request to login user
        Database.login(request.body.email, request.body.password, function(user) {
            if(user === null) {
                response.clearCookie("loginToken");

                //Invalid login credentials
                response.render("welcome");
            }else {
                //user found
                response.clearCookie("loginToken");
                response.cookie("loginToken", user.loginToken);
                console.log("Login Token= " + user.loginToken);
                response.redirect("/");
            }
        });

    });

    app.get("/logout", function(request, response) {
        response.clearCookie("loginToken");
        response.redirect("/");
    });

    app.get("/examplePage", function(request, response) {
        console.log(request.body);
        var icon = request.body.icon;
        console.log(icon);
        response.render("weatherExample", {icon:icon});
    });
    app.post("/examplePage", function(request, response) {
        console.log(request.body);
        var icon = request.body.icon;
        console.log(icon);
        response.render("weatherExample", {icon:icon});
    });

    app.get("/settings", function(request, response) {
        var loginToken = request.cookies.loginToken;
        if(loginToken === undefined) {
            //User is not logged in
            response.render("welcome");
        }else {
            Database.getUser(loginToken, function(user) {
                if(user === undefined || user === null) {
                    //invalid loginToken
                    response.clearCookie("loginToken");
                    response.render("welcome");
                }else {
                    //User exists
                    response.render("settings");

                }
            });
        }
    });

    app.post("/emailSettings", function(request, response) {
        var loginToken = request.cookies.loginToken;
        if(loginToken === undefined) {
            //User is not logged in
            response.render("welcome");
        }else {
            Database.getUser(loginToken, function(user) {
                if(user === undefined || user === null) {
                    //invalid loginToken
                    response.clearCookie("loginToken");
                    response.render("welcome");
                }else {
                    //User exists
                    user.email = request.body.email;
                    Database.updateUser(user, function() {
                        response.render("settings");
                    });

                }
            });
        }
    });

    app.post("/passwordSettings", function(request, response) {
        var loginToken = request.cookies.loginToken;
        if(loginToken === undefined) {
            //User is not logged in
            response.render("welcome");
        }else {
            Database.getUser(loginToken, function(user) {
                if(user === undefined || user === null) {
                    //invalid loginToken
                    response.clearCookie("loginToken");
                    response.render("welcome");
                }else {
                    //User exists
                    user.password = request.body.password;
                    Database.updateUser(user, function(){
                        response.render("settings");
                    });

                }
            });
        }
    });

    app.post("/addressSettings", function(request, response) {
        var loginToken = request.cookies.loginToken;
        if(loginToken === undefined) {
            //User is not logged in
            response.render("welcome");
        }else {
            Database.getUser(loginToken, function(user) {
                if(user === undefined || user === null) {
                    //invalid loginToken
                    response.clearCookie("loginToken");
                    response.render("welcome");
                }else {
                    //User exists
                    user.streetAddress = request.body.streetAddress;
                    user.city = request.body.city;
                    user.state = request.body.state;
                    user.zipcode = request.body.zipcode;
                    user.country = request.body.country;

                    Database.updateUser(user, function(){
                        response.render("settings");
                    });

                }
            });
        }
    });


    app.get("*", function(request, response) {
        response.redirect("/");
    });


};
