'use strict';

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const {spawnSync} = require('child_process');
const os = require('os');
const ProgressBar = require('progress');

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

    let find = spawnSync(`find`, [dstDir, '-type', 'f']);

    let data = find.stdout.toString().split('\n').slice(0, -1);

    let cnt = data.length;

    let i = 0;

    for(let file of data) {

        let fullDstPath = path.resolve(file);
        let relative = path.relative(dstDir, fullDstPath);

        let fullSrcPath = path.resolve(srcDir, relative);

        if(!fs.existsSync(fullSrcPath)) {

            fs.unlinkSync(fullDstPath)
            ++i;

        }

    }

    process.stdout.write(`${i} files deleted`);

}
