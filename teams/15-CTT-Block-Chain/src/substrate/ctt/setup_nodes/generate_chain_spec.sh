#!/bin/bash

../target/debug/ctt build-spec --disable-default-bootnode --chain staging > customSpec.json
../target/debug/ctt build-spec --chain=customSpec.json --raw --disable-default-bootnode > customSpecRaw.json