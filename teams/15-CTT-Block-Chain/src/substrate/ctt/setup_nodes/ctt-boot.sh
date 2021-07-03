#!/bin/bash

../target/debug/ctt \
  --base-path ~/cttdb/n"$1" \
  --chain ./customSpecRaw.json \
  --port "$2" \
  --ws-port "$3" \
  --rpc-port "$4" \
  --validator \
  --rpc-methods=Unsafe \
  -lruntime=debug \
  --ws-external \
  --rpc-external \
  --rpc-cors all \
  --execution Native \
  --telemetry-url 'ws://104.215.0.199:8888/submit 0' \
  --name "$5"
