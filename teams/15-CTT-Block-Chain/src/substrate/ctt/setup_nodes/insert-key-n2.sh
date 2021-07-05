#!/bin/bash

# Submit a new key via RPC, connect to where your `rpc-port` is listening
curl http://localhost:9934 -H "Content-Type:application/json;charset=utf-8" -d @n2-key-babe.json
curl http://localhost:9934 -H "Content-Type:application/json;charset=utf-8" -d @n2-key-gran.json