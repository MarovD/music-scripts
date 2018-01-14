#!/usr/local/bin/zsh
#./move.zsh src It\ Will\ Destroy\ You
IFS=$'\n' 

srcDir=$1;
artist=$2;

destDir="[Files] Music/$artist";

mkdir -m 770 $destDir;

list=();
i=1;
find $srcDir -type f | 
while read line
do
    list[$i]=$(printf '%s\n' "$line");
    i=$i+1;
done;
foreach file in $list
do
    oldName=$(basename $file);
    cleanName=$(echo $oldName | sed -E 's:^[[:space:]]*[0-9]*[[:space:]]*((-|\.)[[:space:]]*)?::g')
    newName="$artist - $cleanName";

    if [[ $newName =~ ^.*\.(flac|mp3)$ ]] 
    then
        cp -f -v $file "$destDir/$newName";
    fi;
done

