var Database = require("./Models/Database.js");

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
                        response.render("video");

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
        var type = request.body.type;
        console.log(type);
        response.render("weatherExample", {type:type});
    });
    app.post("/examplePage", function(request, response) {
        console.log(request.body);
        var type = request.body.type;
        console.log(type);
        response.render("weatherExample", {type:type});
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