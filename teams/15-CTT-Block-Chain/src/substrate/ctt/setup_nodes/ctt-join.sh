#!/bin/bash

# remember to change bootnodes to actually n1

../target/debug/ctt \
  --base-path ~/cttdb/n"$1" \
  --chain ./customSpecRaw.json \
  --port "$2" \
  --ws-port "$3" \
  --rpc-port "$4" \
  -lruntime=debug \
  --validator \
  --rpc-methods=Unsafe \
  --name "$5" \
  --execution Native \
  --telemetry-url 'ws://104.215.0.199:8888/submit 0' \
  --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWBmA48u6qzj2G1cdsnemYSurLmXz22SRkNVe2raJ2ikAh
