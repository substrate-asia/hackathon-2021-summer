#!/bin/bash

# remember to change bootnodes to actually n1

../target/release/ctt \
  --base-path ~/cttdb/n"$1" \
  --chain ./customSpecRaw.json \
  --port "$2" \
  --ws-port "$3" \
  --rpc-port "$4" \
  --validator \
  --rpc-methods=Unsafe \
  --name "$5" \
  --telemetry-url 'ws://104.215.0.199:8888/submit 0' \
  --bootnodes /ip4/39.106.116.92/tcp/30333/p2p/12D3KooWRDy99jssWTqK9z5EiaVAsDsAR36fwDyQrYg2TJEmH83X
