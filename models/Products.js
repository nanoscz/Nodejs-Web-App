var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    kupuvac: String,
    name: String,
    prodavnica: String,
    cena: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

var productModel = mongoose.model('productModel', ProductSchema);

exports.add = function(args, callback) {

    var newProduct = new productModel({
        kupuvac: args['username'],
        name: args['name'],
        prodavnica: args['prodavnica'],
        cena: args['cena']
    });

    newProduct.save(function(err) {
        if (err) throw err;
        console.log('Record have been saved');
        callback(err, true);
        return;
    });
};

exports.findProduct = function(args, callback) {

    var query = productModel.find({
        kupuvac: args
    });

    query.select('name prodavnica cena date');
    query.sort({
        date: -1
    });

    query.exec(function(err, product) {
        if (err) throw (err);
        callback(err, product);
    });
};

exports.findOne = function(arg, callback) {
    productModel.findOne({
        _id: arg
    }, 'name prodavnica cena date', function(err, product) {
        if (err) console.log("none found");
        callback(err, product);
    });
};

exports.findSimilar = function(args, callback) {

    var query = productModel.find({
        name: args['name']
    });

    query.select('name prodavnica cena');
    query.where('cena').lt(args['cena']);

    query.exec(function(err, product) {
        if (err) throw (err);
        callback(err, product);
    });
};

exports.deleteProduct = function(args, newsCallback) {
    productModel.remove({
        _id: args
    }, function(err, numberRemoved) {
        if (err) throw (err);
        if (numberRemoved.result.n == 1) {
            console.log("Removed product succesfully!");
        }
        newsCallback(err, numberRemoved.result.n);
    });
};

exports.deleteAll = function(args) {

    productModel.remove({
        kupuvac: args['username']
    }, function(err, numberRemoved) {
        if (err) throw (err);
        if (numberRemoved.result.n > 0) {
            console.log("Removed all products succesfully!");
        }
    });
};

exports.findSuggestion = function(callback) {
    productModel.find().distinct('name', function(err, products) {
        if (err) throw (err);
        callback(err, products);
    });
};

exports.update = function(id, fields, callback) {
    var conditions = {
        _id: id
    };
    var change = {
        name: fields['name'],
        prodavnica: fields['prodavnica'],
        cena: fields['cena'],
    };
    productModel.update(conditions, change, function(err, numAffected) {
        if (err) throw (err);
        callback(err, numAffected.n);
    });
};

exports.findLatestFive = function(args, callback) {

    var query = productModel.find({
        kupuvac: args
    });

    query.select('name prodavnica cena date');
    query.sort({
        date: -1
    });
    query.limit(5);

    query.exec(function(err, products) {
        if (err) throw (err);
        callback(err, products);
    });
};

exports.findExpensiveFive = function(args, callback) {

    var query = productModel.find({
        kupuvac: args
    });
    query.select('name cena');
    query.sort({
        cena: -1
    });
    query.limit(5);

    query.exec(function(err, products) {
        if (err) throw (err);
        callback(err, products);
    });
};