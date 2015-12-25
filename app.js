var express = require('express');
var cookieSession = require("cookie-session");
var favicon = require('serve-favicon');

var app = express();

//connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.IP + '/myappDB');

//define where are the views and set view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//define where are public files (css,js,images) and favicon
app.use("/public", express.static('public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(cookieSession({
  name: 'session',
  keys: ['ROSKOSKITRAJCE']
}));

//include the app routes
var userRoutes = require('./routes/userRoutes');
var productRoutes = require('./routes/productRoutes');
app.use('/', userRoutes);
app.use('/products', productRoutes);

//close db connection when node proccess is terminated        
var gracefulExit = function() {
  mongoose.connection.close(function() {
    console.log('Mongoose default connection with DB is disconnected through app termination');
    process.exit(0);
  });
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

//define which ip and port the server should listen for requests
app.listen(process.env.PORT, process.env.IP);

module.exports = app;