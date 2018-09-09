# Base Azure Function image with Chromium headless dependencies and Puppeteer API

Inherit from this image and copy your Azure Function to /home/site/wwwroot. 

```docker

FROM leitwolf/azure-functions-puppeteer:latest

COPY . /home/site/wwwroot

```