'use strict';

const fromJsonFile = function(filepath, func) {
  const tokens = JSON.parse(require('fs').readFileSync(filepath));
  return this.func(tokens);
}

export default fromJsonFile;
