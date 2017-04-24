#!/bin/bash

cat sp1.js | gawk '
function make() {
    if ($1 == "//") return;
    printf "<!-- %s --> <control><group>master</group><key>sp1.dispatch</key><status>%s</status><midino>%s</midino><options><script-binding/></options></control>\n",
        $1, $3, $5;
            
}
/sp1.midiMap =/ { inmap = 1; }
{ if (!inmap) next; }
inmap == 1 { if ($1 == "};") inmap = 0; }
/:/ { make(); }
' | column -t
