#!/usr/local/bin/zsh
#./convert.zsh /media/disk/Collection /media/disk/Collection\ \[256kbps\]
IFS=$'\n' 

srcDir=$1;
destDir=$2;
bitness=256;

cnt=$(($(ls -1q $srcDir | wc -l)));

mkdir -m 770 $destDir;

i=0;

find $srcDir -type f | 
while read srcFile
do

    baseName=$(basename $srcFile);

    destFile="$destDir/$baseName";

    if [ ! -f $destFile ];
    then;

        lame --quiet -b $bitness $srcFile $destFile;

    fi;

    echo -n -e "\r$((i++))/$cnt";

done;
