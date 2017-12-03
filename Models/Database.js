/*
 * This take's care of database logic 
 * such as verification of inputs
 * retrieving info from database
 * and updating info to database
 * 
 */ 

 var assert = require("assert");
 //Database setup
 var MongoClient = require('mongodb').MongoClient,
 test = require('assert');
// Connection url
var url = "mongodb://fulqrumPurdue:cs307sucks!@cs252cluster-shard-00-00-fsw0d.mongodb.net:27017,cs252cluster-shard-00-01-fsw0d.mongodb.net:27017,cs252cluster-shard-00-02-fsw0d.mongodb.net:27017/test?ssl=true&replicaSet=CS252Cluster-shard-0&authSource=admin"
var TokenGenerator = require("rand-token");


exports.registerUser = registerUser;
function registerUser(body, callback) {
    var user = new Object();
    user.email = body.email;
    user.password = body.password;
    user.streetAddress = body.streetAddress;
    user.city = body.city;
    user.state = body.state;
    user.zipcode = body.zipcode;
    user.country = body.country;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
    
        db.collection('users').findOne( { "email": user.email}, function(err, result) {
            if(result == null) {
                //User email doesn't exist create their login token
                user.loginToken = TokenGenerator.generate(16);
                
                db.collection('users').insertOne(user, function(err, result) {
                    console.log("New User Account created");
                    callback();
                });
            }else {
                //User email already exists
                console.log("Email already has account");
                callback("Email already Registered");
            }
        });
    });
    
   
}

exports.login = login;
function login(email, password, cb) {
    //Verify credentials
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
        
            db.collection('users').findOne( { "email": email, "password" : password }, function(err, result) {
                cb(result);
            });
        });
    

}

exports.getUser = getUser;
function getUser(token, cb) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
    
        db.collection('users').findOne( { "loginToken": token }, function(err, result) {
            console.log(token);
            if(result === null || result === undefined) {
                //User doesn't exist
                console.log("User not found");
                cb(null);
            }else {
                console.log("User found");
                //User exists
                cb(result);
            }
        });
    });
}

exports.listUsers = listUsers;
function listUsers() {
    var findUsers = function(db, callback) {
        var cursor =db.collection('users').find( );
        cursor.each(function(err, doc) {
           assert.equal(err, null);
           if (doc != null) {
              console.dir(doc);
           } else {
              callback();
           }
        });
     };
     MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findUsers(db, function() {
            db.close();
        });
      });
}


exports.clearDatabase = clearDatabase;
function clearDatabase() {
    var removeAll = function(db, callback) {
        db.collection('users').deleteMany( {}, function(err, results) {
           callback();
        });
     };
     MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
      
        removeAll(db, function() {
            db.close();
        });
    });
}

exports.updateUser = updateUser;
function updateUser(user, cb){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('users').update({_id:user._id}, user, function() {
            console.log("User Updated");
            db.close();
            cb();
        });
        
    });
}