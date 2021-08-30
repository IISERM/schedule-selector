#! /usr/bin/env python3

import sys

data = "".join(sys.stdin.readlines())

datadiv = "<div id=\"reftable\" hidden>"+data+"</div>"

with open("index_template.html") as f:
    with open("index.html", "w") as g:
        g.write(f.read().replace("{{ datadiv }}", datadiv))


