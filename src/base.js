'use strict';

const authFunc = (tokens) => {
  return function(socket, next){
    const id = socket.handshake.query.id;
    const token = socket.handshake.query.token;
    if(tokens[id] === token || tokens["*"] === token) {
      socket.handshake.roomname = id;
      next();
    } else {
      next(new Error("token isn't valid"));
    }
  }
}

const fromObject = (tokens)=> {
  authFunc(tokens);
}

exports.authFunc = authFunc;
exports.fromObject = fromObject;
