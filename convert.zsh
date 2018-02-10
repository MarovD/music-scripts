#!/usr/local/bin/zsh
#./convert.zsh /media/disk/Collection /media/disk/Collection\ \[256kbps\]
IFS=$'\n' 

srcDir=$1;
destDir=$2;
bitness=256;

mkdir -p -m 770 $destDir;

echo 'Searching differences...'

(( cnt = 0 ));
for file in $(ls -1 $destDir)
do

    if [ ! -f "./$srcDir/$file" ];
    then;
        (( cnt++ ))
        rm "./$destDir/$file";
    fi;

done;

echo "$cnt files deleted"

cnt=$(($(ls -1q $srcDir | wc -l)));

(( i = 0 ));

find $srcDir -type f | 
while read srcFile
do

    baseName=$(basename $srcFile);

    destFile="$destDir/$baseName";

    echo -n -e "\r$((++i))/$cnt";

    if [ ! -f $destFile ];
    then;

        lame --quiet -b $bitness $srcFile $destFile;

    fi;

done;
