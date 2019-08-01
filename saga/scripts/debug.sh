#!/usr/bin/env bash

touch heartbeat.txt
mkdir -p logs

if [ -z "$NODE_ENV" ]; then
    NODE_ENV=dev
    echo "Defaulting NODE_ENV to $NODE_ENV";
fi

# after executing the following, within chrome: chrome://inspect/#devices
NODE_ENV=$NODE_ENV node --nolazy --use_strict --inspect-brk=9229 \
  index.js \
  --config config/service-template.json $@
