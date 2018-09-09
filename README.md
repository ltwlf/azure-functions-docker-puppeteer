# Base Azure Function image with Chromium headless dependencies and Puppeteer API

## What can I do with this image? ##

Run an Azure Function that control Chromium with helpz of the Node.js based Puppetter library.
(I use it to convert HTML to PDF in an Azure Functions).
Chrome dependencies are installed and Puppetter is already installed as a global node module. 

## What else can I do? #
Most things that you can do manually in the browser can be done using Puppeteer! Here are a few examples to get you started:

Generate screenshots and PDFs of pages.
Crawl a SPA and generate pre-rendered content (i.e. "SSR").
Automate form submission, UI testing, keyboard input, etc.
Create an up-to-date, automated testing environment. Run your tests directly in the latest version of Chrome using the latest JavaScript and browser features.
Capture a timeline trace of your site to help diagnose performance issues.
Test Chrome Extensions.

Read more: https://github.com/GoogleChrome/puppeteer 

## Inherit from this image and copy your Azure Function to /home/site/wwwroot. 

```docker

FROM leitwolf/azure-functions-puppeteer:latest

COPY . /home/site/wwwroot

```

## Example Function to convert HTML to PDF: #
```JavaScript
const os = require('os');
const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = async function (context, req) {

    let tempDir = os.tmpdir();
    let tempFile = `${tempDir}/temp.pdf`;
 
    await (async () => {
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.goto('https://blog.leitwolf.io', {waitUntil: 'networkidle2'});
        await page.pdf({path: tempFile, format: 'A4'});
        
        await browser.close();

        var data = fs.readFileSync(tempFile);
       
        context.res = {
            isRaw: true,
            body: data
        };
        context.done();
    })();
```



