'use strict'

var path    = require('path');
var debug   = require('debug')('linda-server:app');
var express = require('express');
require('coffee-script/register');

// config
var config       = require(path.resolve(__dirname, '../node_modules/linda/bin/linda-server/config.json'));
var package_json = require(path.resolve(__dirname, '../node_modules/linda/package.json'));
process.env.PORT = 8931;

// express modules
var bodyParser   = require('body-parser');
var authenticator = require('../dist/index');

// server setup
var app = express();
module.exports = app;

var http = require('http').Server(app);
var io = require('socket.io')(http);
// io.use(authenticator.fromFile(path.resolve(__dirname, 'tokens.json')));
io.use(authenticator.fromEnv());
var linda = require(path.resolve(__dirname, '../node_modules/linda')).Server.listen({io: io, server: http});
app.set('socket.io', io);
app.set('config', config);
app.set('package', package_json);
app.set('server', http);
app.set('linda', linda);

// start server
http.listen(process.env.PORT, function(){
  debug("server start - port:#{process.env.PORT}");

  // client

  var Linda = require('linda');
  var io = require('socket.io-client');
  var path = 'http://localhost:' + process.env.PORT + '/baba?id=baba';

  var socket1 = io.connect(path + '&token=kazusuke',{'forceNew': true });
  var client1 = new Linda.Client().connect(socket1);
  var tuple = {a : 'b', c : 'd'};
  var baba1 = client1.tuplespace('baba');
  baba1.take(tuple, function(err, tuple){
    // success
    console.log('token is valid');
  });
  baba1.write(tuple);

  var socket2 = io.connect(path + '&token=zanmai',{'forceNew': true });
  var client2 = new Linda.Client().connect(socket2);
  var baba2 = client2.tuplespace('baba');
  baba2.take(tuple, function(err, tuple){
    // failure
    console.log('token is not valid');
  });
  baba2.write(tuple);
});
