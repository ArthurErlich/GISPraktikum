@echo off
start  "MongoDB" MongoDB\Aufgabe8DB\zipInstall\bin\mongod.exe --dbpath MongoDB\Aufgabe8DB\data\db
start "HTTPServer" node JS\Server.js
