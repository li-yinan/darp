rm -rf ./lib
babel src --out-dir ./lib
cp -r src/reporter/assets lib/reporter/
cp -r src/reporter/templates lib/reporter/
