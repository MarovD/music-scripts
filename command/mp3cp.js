'use strict';

const CopyMoveMp3 = require('../action/copy-move-mp3.js');
const path = require('path');

exports.command = `mp3cp <srcdir> <dstdir> [rule]`;

exports.describe = `copy all mp3 files recursively and rename`;

exports.builder =  function (yargs) {

    yargs.positional(`srcdir`, {

        describe: `directory to scan`,
        type: `string`,

    }).positional(`dstdir` , {

        describe: `destination directory`,
        type: `string`,

    }).positional(`rule` , {

        default: '%A - %t',
        describe: `rule for renaming files, %A - artist, %a - album, %t - title (song name)`,
        type: `string`,

    })
        .example(`$0 mp3cp ./Music/Seven ./Collection`);

}

exports.handler = async args => {

    let srcDir = path.resolve(args['srcdir']);
    let dstDir = path.resolve(args['dstdir']);
    let rule = args['rule'];

    await CopyMoveMp3(srcDir, dstDir, rule);

}
