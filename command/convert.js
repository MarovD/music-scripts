'use strict';

const Lame = require('node-lame').Lame;
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const {spawnSync} = require('child_process');
const os = require('os');
const ProgressBar = require('progress');

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

        type: 'number',
        describe: `destination files' bitness`,
        choices: [8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 192, 224, 256, 320],

    })
    .example(`$0 convert ./Music/Seven ./Files192kbps/Seven 192`);

}

exports.handler = async args => {

    let srcDir = path.resolve(args['srcdir']);
    let dstDir = path.resolve(args['dstdir']);

    let find = spawnSync(`find`, [srcDir, '-type', 'f']);

    let bitness = args['bitness'];

    let data = find.stdout.toString().split('\n').slice(0, -1);

    let cnt = data.length;

    let progressBar = new ProgressBar('progress: :current/:total; time remaining: :eta s',
        {total: cnt,}
    );

    for(let file of data) {

        let fullSrcPath = path.resolve(file);
        let relative = path.relative(srcDir, fullSrcPath);

        let fullDstPath = path.resolve(dstDir, relative);

        fse.ensureDir(path.dirname(fullDstPath));

        const encoder = new Lame({
            output: fullDstPath,
            bitrate: bitness,
        }).setFile(fullSrcPath);

        await encoder.encode();

        progressBar.tick();

    }

}
