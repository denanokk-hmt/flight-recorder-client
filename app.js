'use strict';

//Require module of basement
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


  //Require of router middlewares for GET request
const routes_index = require('./routes/index');

//Imstance express FW
const app = express();

// view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//CROS:Allow [Cross-Origin Resource Sharing]
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Max-Age', '86400');
  next();
})

//CROS:OPTIONS Method [Preflight]
app.options('*', function (req, res) {
  res.sendStatus(200);
});

//Express using
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes_index);

console.log('go flight_recorder client.')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //**//console.log("404!!!!!");
  var err = new Error('Not Found page.')
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  //**//console.log("500!!!!!");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //http status
  if (!err.status) err.status = 500;
  res.status(err.status);

  //Set error response
  const result = {
    http_status : err.status,
    message: err.message,
    stack : err.stack
  }

  //Error loggging
  console.error(JSON.stringify(result))

  //Responses
  if (res.finished) return
  res.json(result)
  
});
  
module.exports = app;
