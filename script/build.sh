rm -rf ./lib
babel src --out-dir ./lib
cp -r src/reporter/assets lib/reporter/
cp -r src/reporter/templates lib/reporter/
mkdir -p lib/static/report
cp -r src/static/live.js lib/static/
cp -r src/conf/config.js.sample lib/conf/
