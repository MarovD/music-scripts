'use strict';

const Lame = require('node-lame').Lame;
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const {spawnSync} = require('child_process');
const os = require('os');
const ProgressBar = require('progress');

module.exports = async (srcDir, dstDir, bitness) => {

    let find = spawnSync(`find`, [srcDir, '-type', 'f']);

    let data = find.stdout.toString().split('\n').slice(0, -1);

    let cnt = data.length;

    let progressBar = new ProgressBar('progress: :current/:total; time remaining: :eta s',
        {total: cnt,}
    );

    for(let file of data) {

        let fullSrcPath = path.resolve(file);
        let relative = path.relative(srcDir, fullSrcPath);

        let fullDstPath = path.resolve(dstDir, relative);

        if(!fs.existsSync(fullDstPath)) {

            fse.ensureDir(path.dirname(fullDstPath));

            const encoder = new Lame({
                output: fullDstPath,
                bitrate: bitness,
            }).setFile(fullSrcPath);

            await encoder.encode();

        }

        progressBar.tick();

    }

}
