#!/usr/bin/env node
'use strict';

const yargs = require('yargs');

let args = yargs
    .commandDir('command')
    .recommendCommands()
    .wrap(null)
    .config()
    .version(`1.0.0`)
    .parse();
