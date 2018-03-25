'use strict';


exports.command = `convert <srcdir> <dstdir> <bitness>`;

exports.describe = `convert bitness`;

exports.builder = function (yargs) {

    yargs.positional(`srcdir`, {

        describe: `directory to scan`,
        type: `string`,

    }).positional(`dstdir` , {

        describe: `destination directory`,
        type: `string`,

    }).positional(`bitness`, {

        describe: `destination files' bitness`,

    })
    .example(`$0 convert ./Music/Seven ./Files192kbps/Seven 192`,
        `: Copy and convert files from ./Music/Seven to ./Files192kbps/Seven`);

}

exports.handler = function convert(args) {

    console.log('convert');
    console.log(args);

}

