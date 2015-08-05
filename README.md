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
io.use(authenticator.fromEnv())
// io.use(authenticator.fromJsonFile(path.resolve(__dirname, 'tokens.json')));
// io.use(authenticator.fromObject({"*" : 'kazusuke'}));
var linda = require(path.resolve(__dirname, '../node_modules/linda')).Server.listen({io: io, server: http});

```

### ClientSide

``` javascript

var path  = 'https://' + linda_host;
var query = '&id=YOUR_ID&token=YOUR_TOKEN';
var socket = io.connect(path + query);
var client = new Linda.Client().connect(socket);

```


## TODO

- test
