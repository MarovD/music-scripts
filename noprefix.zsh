#!/usr/local/bin/zsh
#./move.zsh src It\ Will\ Destroy\ You
IFS=$'\n' 

dir=$1
artist=$2;

list=();
i=1;

cd $dir;

find . -type f | 
while read line
do
    list[$i]=$(printf '%s\n' "$line");
    i=$i+1;
done;

foreach file in $list
do
    oldName=$(basename $file);
    cleanName=$(echo $oldName | sed -E 's:^.*-([^-]*)$:\1:g')
    newName="$artist -$cleanName";

    mv -v "$oldName" "$newName"
done
