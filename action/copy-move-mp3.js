'use strict';

const path = require('path');
const {spawn, spawnSync} = require('child_process');
const NodeId3 = require('node-id3');
const ProgressBar = require('progress');
const fse = require('fs-extra');

module.exports = async (srcDir, dstDir, rule) => {

    fse.ensureDir(dstDir);

    let find = spawnSync(`find`, [srcDir, '-type', 'f', '-name', '*.mp3']);

    let data = find.stdout.toString().split('\n').slice(0, -1);

    let cnt = data.length;

    let progressBar = new ProgressBar('progress: :current/:total; time remaining: :eta s',
        {total: cnt,}
    );

    for(let file of data) {

        file = path.resolve(file);
        let type = path.extname(file);

        let tags = NodeId3.read(file);

        let name = rule;
        name = name.replace('%A', tags['artist'])
            .replace('%a', tags['album'])
            .replace('%t', tags['title']);
        name = `${name}${type}`;

        // idk wtf
        await new Promise((res, rej) => {setTimeout(_ => {res();}, 0);});
        progressBar.tick();
        let newFilePath = path.resolve(dstDir, name);
        await spawn('cp', [file, newFilePath]);

    }

}
