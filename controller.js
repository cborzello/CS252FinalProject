var Database = require("./Models/Database.js");

module.exports = function(app) {
    app.get("/", function(request, response) {
            //Request for homepage
            var loginToken = request.cookies.token;
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

                    }
                });
            }
    });

    app.post("/register", function(request, response) {
        //Request to register new user
        //Request to login user
        Database.register(request.body, function(error) {
            if(error) {
                //Invalid login credentials

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
                //Invalid login credentials
            }else {
                //user found
                response.cookie("loginToken", user.loginToken);
                response.redirect("/");
            }
        });

    });
};