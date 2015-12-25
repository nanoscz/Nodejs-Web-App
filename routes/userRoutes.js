var express = require('express');
var userRoutes = express.Router();
var formidable = require("formidable");

var loginOptions = require('../options/loginOptions');
var profileOptions = require('../options/profileOptions');

var userModel = require('../models/Users');
var modelProduct = require('../models/Products');

userRoutes.route("/")
    .get(function(req, res) {
        if (req.session.user) {
            profileOptions.poraka("Успешно се логиравте во вашиот профил!");
            res.redirect('/products/1');
        }
        else {
            res.render("login", loginOptions.read());
            loginOptions.poraka("");
        }
    })
    .post(function(req, res) {
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            if (err) throw err;

            var myCallback = function(err, data) {
                if (err) throw err; // Check for the error and throw if it exists.
                if (data) {
                    req.session.user = data;
                    res.redirect('/');
                }
                else {
                    loginOptions.poraka("Грешни кориснички информации!");
                    res.redirect('/');
                }
            };

            if (fields['najava'] == undefined) {
                req.sessionOptions.maxAge = 900000; //isto so 15 min
            }
            else {
                req.sessionOptions.maxAge = 24 * 60 * 60 * 1000; //isto so eden den
            }
            userModel.findUser(fields, myCallback);
        });
    });

userRoutes.route('/signup')
    .get(function(req, res, next) {
        if (req.session.user) {
            res.redirect('/');
        }
        else {
            res.render("signup", {
                title: "Направи Профил",
                description: "Креирајте свој профил за да може да ги користите сите функционалности.",
                message: ""
            });
        }
    })
    .post(function(req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (err) throw err;
            var callback = function(err, username) {
                if (err) throw err;

                var myCallback = function(err, data) {
                    if (err) console.log('Error on signup page'); // Check for the error and throw if it exists.
                    if (data) {
                        loginOptions.poraka("Успешно креиран профил!");
                        res.redirect('/');
                    }
                };

                if (username) {
                    res.render("signup", {
                        title: "SignUp",
                        description: "Sign up Page description",
                        message: "Веќе постои тоа корисничко име."
                    });
                }
                else {
                    userModel.signUpUser(fields, myCallback);
                }
            };
            userModel.findUsername(fields, callback);
        });
    });

userRoutes.route('/logout')
    .get(function(req, res) {
        if (req.session.user) {
            delete req.session.user;
            loginOptions.poraka("Успешно сте одјавен!");
            res.redirect('/');
        }
        else {
            res.charset = 'utf-8';
            res.end('<p>You dont have permission to access this page!</p><a href="/">BACK</a>');
        }
    });

userRoutes.route('/remove/user')
    .get(function(req, res) {
        if (req.session.user) {

            var newCallback = function(err, data) {
                if (err) throw err;

                if (data == 1) {
                    delete req.session.user;
                    loginOptions.poraka("Профилот е успешно избришан");
                    res.redirect('/');
                }

            };

            modelProduct.deleteAll(req.session.user);
            userModel.delete(req.session.user, newCallback);
        }
        else {
            loginOptions.poraka("Сесијата истече, логирајте се повторно.");
            res.redirect('/');
        }
    });

module.exports = userRoutes;