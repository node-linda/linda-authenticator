'use strict';
const fromObject = require('./object');
const fromEnv = require('./env');
const fromJsonFile = require('./file');

const socketIOAuthFunc = (tokens)=> {
  return (socket, next)=> {
    const id = socket.handshake.query.id;
    const token = socket.handshake.query.token;

    if (!id || !token) {
      next(new Error('id or token is undefined'));
    } else if(tokens[id] === token) {
      next();
    } else if (tokens["*"] && tokens["*"] === token) {
      next();
    } else {
      next(new Error("token is not valid"));
    }
  }
}
const tsAuthFunc = (info) => {
  return (data)=> {
    const password = data.options.password;
    const space = data.tuplespace;
    if (info[space] === password) {
      return true;
    } else if(info['*'] && info['*'] === password) {
      return true;
    } else {
      return false;
    }  
  }    
}

const tuplespaceAuthenticator = {
  fromJsonFile : fromJsonFile.bind({func: tsAuthFunc}),
  fromObject   : fromObject.bind({func: tsAuthFunc}),
  fromEnv      : fromEnv.bind({func: tsAuthFunc})
}

const socketIOAuthenticator = {
  fromJsonFile : fromJsonFile.bind({func: socketIOAuthFunc}),
  fromObject   : fromObject.bind({func: socketIOAuthFunc}),
  fromEnv      : fromEnv.bind({func: socketIOAuthFunc})
}


exports.socketIOAuthenticator = socketIOAuthenticator;
exports.tuplespaceAuthenticator = tuplespaceAuthenticator;
