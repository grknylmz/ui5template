## at root folder run npm init

{
  "name": "ui5test",
  "version": "1.0.0",
  "description": "",
  "main": "../webapp/index.html",
  "scripts": {
    "start": "browser-sync start -s \"webapp/\" -f . --no-notify --host localhost --port 9000",
    "prod": "browser-sync start -s \"dist/\" -f . --no-notify --host localhost --port 9000",
    "build": "grunt"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@sap/grunt-sapui5-bestpractice-build": "^1.3.64"
  }
}