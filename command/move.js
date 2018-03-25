'use strict';

exports.command = `move <srcdir> <dstdir> [artist]`;

exports.describe = `copy and rename`;

exports.builder =  function (yargs) {

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

exports.handler = function(args) {

    console.log('move');
    console.log(args);

}
