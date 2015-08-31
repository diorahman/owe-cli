#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var owe = require('../');

program
  .version(require('../package.json'))
  .parse(process.argv);

owe(program, function (err, data){
  if (err) {
    console.log ('gagal euy! maap <3');
  } else {
    console.log(data.location);
    console.log('<3');
  }
  process.exit();
});
