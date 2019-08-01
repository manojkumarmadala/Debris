#!/usr/bin/env bash

set -x

LOCAL_BIN=node_modules/.bin
MOCHA=$LOCAL_BIN/mocha
NYC=$LOCAL_BIN/nyc

# the build sets HTTP(S)_PROXY which causes issues with 'nock'-based unit tests
# because the fileloader respects HTTP(S)_PROXY
# it also respects and gives precedence to NO_PROXY
# '*' means disable proxy for all requests
export NO_PROXY="*"

if [ -z "$NODE_ENV" ]; then
    export NODE_ENV=dev
    echo "Defaulting NODE_ENV to $NODE_ENV";
fi

if [ -z "$COVERAGE" ]; then
    echo "Disabling coverage";
    unset NYC
fi

if [ -n "$GREP" ]; then
    GREPPARAM="--grep $GREP"
fi

export JUNIT_REPORT_PATH=logs/test-results.xml
export JUNIT_REPORT_STACK=1
export JUNIT_REPORT_NAME=$(node -p "require('./package.json').name")

# TODO: ideally we'd enable deprecation warnings to get an early heads up,
#   but we can't until OSS dependencies fix theirs including the dreaded 'new Buffer' deprecation warning
# NOTE: mocha doesn't allow --pending-deprecation, so we'll use the flag instead.
#   In addition, the --throw-deprecation --trace-deprecation flags NOOP without this flag.
#export NODE_PENDING_DEPRECATION=1

mkdir -p logs

$NYC $MOCHA $GREPPARAM \
  -R mocha-jenkins-reporter \
  --bail \
  --throw-deprecation \
  --trace-deprecation \
  --trace-warnings \
  --recursive \
  --file test/test-init.js \
  'test/**/*-spec.js'