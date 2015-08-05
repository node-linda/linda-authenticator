'use strict';

import _ from 'underscore';

const fromEnv = function(func) {
  const keys = Object.keys(process.env);
  let tokens = {};
  _.each(keys, function(key){
    if(key.match(/^LINDA_TOKEN_/)) {
      let k = key.replace(/^LINDA_TOKEN_/, '');
      if (k.toLowerCase() === 'all') {
        k = '*';
      }
      tokens[k] = process.env[key];
    }
  });
  return this.func(tokens);
};

export default fromEnv;
