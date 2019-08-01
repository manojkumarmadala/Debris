#!/usr/bin/env bash

if [ -z "$NODE_ENV" ]; then
    NODE_ENV=dev
    echo "Defaulting NODE_ENV to $NODE_ENV";
fi

touch heartbeat.txt
mkdir -p logs

NODE_ENV=$NODE_ENV node --use_strict --throw-deprecation --trace-deprecation --trace-warnings \
  index.js \
  --config config/service-template.json $@
