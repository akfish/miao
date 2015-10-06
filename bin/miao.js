#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2), {'--': true});
var Miao = require('../');

console.log(Miao({
  proxy: argv.proxy,
  protocol: argv.protocol,
  port: argv.port,
  path: argv.path,
}));
