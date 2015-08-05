'use strict'

var path    = require('path');
var debug   = require('debug')('linda-server:app');
var express = require('express');
require('coffee-script/register');

// config
var config       = require(path.resolve(__dirname, '../node_modules/linda/bin/linda-server/config.json'));
var package_json = require(path.resolve(__dirname, '../node_modules/linda/package.json'));
process.env.PORT = 8931;

// socket.io modules
var authenticator = require('../dist/index');

// server setup
var app = express();
module.exports = app;

var http = require('http').Server(app);
var io = require('socket.io')(http);
io.use(authenticator.socketIOAuthenticator.fromJsonFile(path.resolve(__dirname, 'tokens.json')));
// io.use(authenticator.socketIOAuthenticator.fromEnv());
// io.use(authenticator.socketIOAuthenticator.fromObject({hoge : 'fuga'}))
var linda = require(path.resolve(__dirname, '../node_modules/linda')).Server
// linda.authenticator = authenticator.tuplespaceAuthenticator.fromObject({'kazudon' : 'fuga'})
// linda.authenticator = authenticator.tuplespaceAuthenticator.fromJsonFile(path.resolve(__dirname, 'tokens.json'));
// linda.authenticator = authenticator.tuplespaceAuthenticator.fromEnv();
linda.listen({io: io, server: http});
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
  var path = 'http://localhost:' + process.env.PORT;
  var query = '?id=ho&token=fuga'
  var tuple = {a : 'b', c : 'd'};

  var socket1 = io.connect(path + query,{'forceNew': true});
  var client1 = new Linda.Client().connect(socket1);
  var kazudon = client1.tuplespace('kazudon').option({password: 'fuga'});
  kazudon.take(tuple, function(err, data){
    console.log('valid tuplespace');
  });
  setTimeout(function(){
    kazudon.write(tuple)
  }, 1000);
});
