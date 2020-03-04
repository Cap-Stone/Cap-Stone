:: Start Server
start cmd.exe /k "node server.js"

:: Start UI
cd client/ui
start cmd.exe /k "ng serve --proxy-config proxy.conf.json"
