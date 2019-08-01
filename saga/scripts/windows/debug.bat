cd ../..
echo.> heartbeat.txt
rd /S /Q logs
mkdir logs

node --nolazy --use_strict --inspect-brk=9229 index.js --config config/service-template.json