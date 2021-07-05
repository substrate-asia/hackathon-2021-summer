#!/bin/bash

# Submit a new key via RPC, connect to where your `rpc-port` is listening
curl http://localhost:9933 -H "Content-Type:application/json;charset=utf-8" -d @n1-key-babe.json
curl http://localhost:9933 -H "Content-Type:application/json;charset=utf-8" -d @n1-key-gran.json