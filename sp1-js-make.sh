#!/bin/sh
cat sp1-main.js | awk '
{ print }
/^\/\/\/\/ include/ { 
    command = "cat \"" $3 "\""
    system(command);
    print "// End of " $3;
}
'
