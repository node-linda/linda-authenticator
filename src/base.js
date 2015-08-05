'use strict';

const authFunc = (tokens)=> {
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

const fromObject = (tokens)=> {
  return authFunc(tokens);
}

exports.authFunc = authFunc;
exports.fromObject = fromObject;
