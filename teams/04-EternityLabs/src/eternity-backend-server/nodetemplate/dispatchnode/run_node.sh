#/bin/sh
nodeport=${NODE_PORT:-33333}

docker run -id -p $nodeport:$nodeport -e NODE_PORT="$nodeport" 99kies/enldispatchnode