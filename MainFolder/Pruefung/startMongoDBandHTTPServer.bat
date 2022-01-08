@echo off
start  "MongoDB" DB\zipInstall\bin\mongod.exe --dbpath DB\data\db
start "HTTPServer" node JS\Server.js
