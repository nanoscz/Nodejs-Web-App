var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name:  String,
  surname: String,
  email:   String,
  username:   String,
  password:   String,
});

var userModel = mongoose.model('userModel', UserSchema);

exports.signUpUser = function(args, callback){

    var newUser = new userModel({
        name: args['name'],
        surname: args['surname'],
        email: args['email'],
        username: args['username'],
        password: bcrypt.hashSync(args['password'], 10)
    });

    newUser.save(function(err){
        if (err) throw err;
        console.log('Record have been saved');
        callback(err, true);
    });
};

exports.findUser = function(user, callbackfu){
    userModel.findOne({ username: user['username']}, 'name surname email username password', function (err, person) {
        if (err) throw err;
        if(person){
            if (bcrypt.compareSync(user['password'], person['password'])){
                var returnPerson = {
                    _id: person['_id'],
                    name: person['name'],
                    surname: person['surname'],
                    email: person['email'],
                    username: person['username']
                };
                callbackfu(err, returnPerson);
            }else{
                callbackfu(err, null);
            } 
        }else{
            callbackfu(err, null);
        }
    });
};    

exports.delete = function(args, newsCallback){
    userModel.remove({ '_id': args['_id'] }, function (err, numberRemoved) {
        if (err) throw(err);
        if (numberRemoved.result.n == 1) {
                console.log("Removed succesfully!");
            }
        newsCallback(err, numberRemoved.result.n);
    });
}; 

exports.findUsername = function(user, callback){
    userModel.findOne({ username: user['username'] }, 'username', function (err, person) {
        if (err) console.log("none found");
        callback(err, person);
    });
};  