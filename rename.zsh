#!/usr/local/bin/zsh
IFS=$'\n' 

list=();
i=1;

find . -type d -depth 1 |
while read line
do
    list[$i]=$(basename $(printf '%s\n' "$line"));
    i=$i+1;
done;

foreach oldDir in $list
do
    newDir=$(echo $oldDir | sed -E 's:^\[Files\][[:space:]](.*)$:\1:gi');
    echo $newDir;

    mv $oldDir $newDir;

done
