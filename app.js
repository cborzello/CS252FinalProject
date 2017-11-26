/*
 * This is where the server begins running
 * and setting for the server are chosen
 */


var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');``
var bodyParser = require('body-parser');
var assert = require("assert");
var cookieParser = require('cookie-parser');
//Database setup
  var MongoClient = require('mongodb').MongoClient,
  test = require('assert');
// Connection url
//@TODO add a valid url to var url in the line below
var url = "mongodb://fulqrumPurdue:cs307sucks!@cs252cluster-shard-00-00-fsw0d.mongodb.net:27017,cs252cluster-shard-00-01-fsw0d.mongodb.net:27017,cs252cluster-shard-00-02-fsw0d.mongodb.net:27017/test?ssl=true&replicaSet=CS252Cluster-shard-0&authSource=admin"
// Connect using MongoClient
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Database connected correctly to server.");
  db.close();
});
//
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./Views'))


app.set('port', (process.env.PORT || 5000));  //Will set port to computers designated
//environment port or port 5000 thousand if environment port is not defined

app.set("views", __dirname + "/Views");
app.set("view engine", "ejs");

var ServerController = require("./controller.js");
ServerController(app);

app.listen(app.get('port'), function () {
    console.log("Node app is running on port", app.get("port"));
});

//exports = module.exports = app;
