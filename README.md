# Authenticator for linda with Socket.IO

Authentication mechanism for NodeLinda

## Install

``` shell

npm install linda-socket.io-authenticator --save

```

## Usage

### ServerSide

``` javascript
var authenticator = require('linda-socket.io-authenticator')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// Socket.io base authentication
// io.use(authenticator.fromEnv())
// io.use(authenticator.fromJsonFile(path.resolve(__dirname, 'tokens.json')));
io.use(authenticator.fromObject({"*" : 'kazusuke'}));
var linda = require(path.resolve(__dirname, '../node_modules/linda')).Server

// Tuplespace's password base authenticaton
// linda.authenticator = authenticator.tuplespaceAuthenticator.fromObject({'kazudon' : 'fuga'})
// linda.authenticator = authenticator.tuplespaceAuthenticator.fromJsonFile(path.resolve(__dirname, 'tokens.json'));
linda.authenticator = authenticator.tuplespaceAuthenticator.fromEnv();
linda.listen({io: io, server: http});



```

### ClientSide

``` javascript

var path  = 'https://' + linda_host;
var query = '&id=YOUR_ID&token=kazusuke';
// if id is *
// var query = '&token=kazusuke';
var socket = io.connect(path + query);
var client = new Linda.Client().connect(socket);
var ts = client.tuplespace('kazudon').option({password: 'zanmai'})

```


## TODO

- test
