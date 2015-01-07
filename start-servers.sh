#!/bin/bash
clear
echo "Starting servers..."
osascript -e 'tell application "Terminal" to do script "cd /Users/kirstenlipps/Desktop/Grant/angular/angular-test-reporter; npm start"'
cd rest-server
npm install mysql
node data-server.js
echo "Servers running..."