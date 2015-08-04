'use strict';

const fromJsonFile = (filepath)=> {
  const tokens = JSON.parse(require('fs').readFileSync(filepath));
  return require('./base').authFunc(tokens);
}

export default fromJsonFile;
