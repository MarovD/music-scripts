'use strict';

const ConvertMp3Bitness = require('../action/convert-mp3-bitness.js');
const path = require('path');

exports.command = `mp3bit <srcdir> <dstdir> <bitness>`;

exports.describe = `create mp3 files changing bitness`;

exports.builder = function (yargs) {

    yargs.positional(`srcdir`, {

        describe: `directory to scan`,
        type: `string`,

    }).positional(`dstdir` , {

        describe: `destination directory`,
        type: `string`,

    }).positional(`bitness`, {

        type: 'number',
        describe: `destination files' bitness`,
        choices: [8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 192, 224, 256, 320],

    })
    .example(`$0 mp3bit ./Music/Seven ./Files192kbps/Seven 192`);

}

exports.handler = async args => {

    let srcDir = path.resolve(args['srcdir']);
    let dstDir = path.resolve(args['dstdir']);
    let bitness = args['bitness'];

    await ConvertMp3Bitness(srcDir, dstDir, bitness);

}
