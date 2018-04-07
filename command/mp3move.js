'use strict';

const path = require('path');
const {spawnSync} = require('child_process');
const NodeId3 = require('node-id3');

exports.command = `mp3move <srcdir> <dstdir> [rule]`;

exports.describe = `copy and rename`;

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
        .example(`$0 move ./Music/Seven ./Collection`,
        `: Copy files recursive from ./Music/Seven to ./Collection base`);

}

exports.handler = function(args) {

    let srcDir = path.resolve(args['srcdir']);
    let dstDir = path.resolve(args['dstdir']);
    let rule = args['rule'];

    let find = spawnSync(`find`, [srcDir, '-type', 'f']);

    let data = find.stdout.toString().split('\n').slice(0, -1);

    for(let file of data) {

        file = path.resolve(file);
        let type = path.extname(file);

        if(['.mp3'].includes(type)) {

            let tags = NodeId3.read(file);

            let name = rule;
            name = name.replace(/%A/, tags['artist'])
                .replace(/%a/, tags['album'])
                .replace(/%t/, tags['title']);
            name = `${name}${type}`;

            console.log(name);
            spawnSync('cp', [file, path.resolve(dstDir, name)]);

        }

    }

}
