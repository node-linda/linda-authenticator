'use strict';

module.exports = {
  fromJsonFile : require('./src/file'),
  fromEnv : require('./src/env'),
  fromObject : require('./src/base.js').fromObject
}
