#!/bin/bash
echo "Starting SSH ..."
service ssh start

cd /home/site/wwwroot
npm install

dotnet "/azure-functions-host/Microsoft.Azure.WebJobs.Script.WebHost.dll"
