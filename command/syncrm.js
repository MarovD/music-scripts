'use strict';

const SynchronizeUnlink = require('../action/synchronize-unlink.js');
const path = require('path');

exports.command = `syncrm <srcdir> <dstdir>`;

exports.describe = `delete files from destdir non existent in srcdir`;

exports.builder = function (yargs) {

    yargs.positional(`srcdir`, {

        describe: `directory to scan`,
        type: `string`,

    }).positional(`dstdir` , {

        describe: `destination directory`,
        type: `string`,

    })
    .example(`$0 syncrm ./Music/Collection ./Collection\[256kbps\]`);

}

exports.handler = async args => {

    let srcDir = path.resolve(args['srcdir']);
    let dstDir = path.resolve(args['dstdir']);

    await SynchronizeUnlink(srcDir, dstDir);

}
