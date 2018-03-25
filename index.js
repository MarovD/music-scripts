#!/usr/bin/env node
'use strict';

const yargs = require('yargs');
const path = require('path');

let args = yargs
    .command(require(`./command/move.js`))
    .command(require(`./command/convert.js`))
    .recommendCommands()
    .wrap(null)
    .config()
    .version(`1.0.0`)
    .parse();

console.log(args);
