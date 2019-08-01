cd ../..
echo.> heartbeat.txt
rd /S /Q logs
mkdir logs

node --use_strict --throw-deprecation --trace-deprecation --trace-warnings index.js --config config/service-template.json