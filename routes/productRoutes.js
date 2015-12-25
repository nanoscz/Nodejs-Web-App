var express = require('express');
var productRoutes = express.Router();
var formidable = require("formidable");

var productOptions = {message:""};
var loginOptions = require('../options/loginOptions');
var profileOptions = require('../options/profileOptions');

var productModel = require('../models/Products');

productRoutes.route("/:page")
    .get(function(req,res){
        if(req.session.user){
        var myCallback = function(err, data) {
            if (err) console.log('Error on listing products'); // Check for the error and throw if it exists.
            if(data){
                profileOptions.addProducts(data);
                profileOptions.addmaxPage( Math.ceil(data.length / 5) );

                profileOptions.addcurrentPage(req.params.page);

                profileOptions.adduser({
                        id:req.session.user._id,
                        username:req.session.user.username,
                        name:req.session.user.name,
                        surname:req.session.user.surname,
                        email:req.session.user.email
                    });
                res.render("layout",profileOptions.read());
                profileOptions.poraka("");
            }
        };
        
        productModel.findProduct( req.session.user.username, myCallback);
        }else{
            loginOptions.poraka("Сесијата истече, логирајте се повторно.");
            res.redirect('/');
        }
    }) 
    .post(function(req,res){
        if(req.session.user){
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) throw err;
            
            var myCallback = function(err, data) {
              if (err) console.log('Error on home page'); // Check for the error and throw if it exists.
              if(data){
                profileOptions.poraka("Производот беше успешно додаден");
                res.redirect('/products/'+req.params.page);
              }
            };

            productModel.add( fields, myCallback);
        });
        }else{
            loginOptions.poraka("Сесијата истече, логирајте се повторно.");
            res.redirect('/');
        }
    });
    
productRoutes.route('/remove/:id')
    .get(function(req, res) {
        if(req.session.user){

        var id = req.params.id;
            
            var newCallbackFu = function(err, data) {
                if (err) throw err;
            
                if(data==1){
                    profileOptions.poraka("Продуктот е успешно избришан");
                    res.redirect('/products/1');
                }
            };
        productModel.deleteProduct(id, newCallbackFu);
        }else{
            loginOptions.poraka("Сесијата истече, логирајте се повторно.");
            res.redirect('/');    
        }
    });
    
productRoutes.route('/item/:id')
    .get(function(req, res) {
        if(req.session.user){
        var id = req.params.id;
        var callback = function(err, data) {
        if (err) throw err;
        
            productOptions['product']=data;
            productOptions['title']="Продукт "+data.name;
            productOptions['description'] = "Страна со информации за специфичен продукт.";
            productOptions['user'] = {
                        id:req.session.user._id,
                        username:req.session.user.username,
                        name:req.session.user.name,
                        surname:req.session.user.surname,
                        email:req.session.user.email
                    };
            
            var secondCallback = function(err, data) {
                if (err) throw err;
                
                productOptions['similarProducts'] = data;
                res.render("product", productOptions); 
                productOptions['message']="";
            };

            productModel.findSimilar(data,secondCallback);
        };
        productModel.findOne(id, callback);
        }else{
            loginOptions.poraka("Сесијата истече, логирајте се повторно.");
            res.redirect('/'); 
        }
    })
    .post(function(req, res) {
        if(req.session.user){
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) throw err;
            
            var myCallback = function(err, data) {
              if (err) console.log('Error on product update page'); // Check for the error and throw if it exists.
              if(data){
                productOptions['message']="Производот беше успешно изменет";
                res.redirect('/products/item/'+req.params.id);
              }
            };
            
            productModel.update( req.params.id, fields, myCallback);
        });
        }else{
            loginOptions.poraka("Сесијата истече, логирајте се повторно.");
            res.redirect('/');
        }
    });
    
productRoutes.route('/suggestions/findall')
    .post(function(req, res) {
        var callbacks = function(err,data){
            if (err) throw err;
            res.json(data);
        };
        productModel.findSuggestion(callbacks);
    }); 

productRoutes.route('/charts/latestFive')
    .post(function(req, res) {
         if(req.session.user){
            var callbacks = function(err,data){
                if (err) throw err;
                res.json(data);
            };
            productModel.findLatestFive(req.session.user.username, callbacks);
         }
    }); 
    
productRoutes.route('/charts/expensiveFive')
    .post(function(req, res) {
         if(req.session.user){
            var callbacks = function(err,data){
                if (err) throw err;
                res.json(data);
            };
            productModel.findExpensiveFive(req.session.user.username, callbacks);
         }
    });
    
module.exports = productRoutes;