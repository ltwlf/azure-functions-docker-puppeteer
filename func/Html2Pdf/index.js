/*jslint es6:true*/

const os = require('os');
const puppeteer = require('puppeteer');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

module.exports = async function(context, req) {

    context.log('HTML2PDF function is processing a request...');

    try{
        let tempDir = os.tmpdir();
        let tempFile = `${tempDir}/${uuidv1()}.pdf`;

        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();

        if(req.query.url){
            await page.goto(req.query.url, {waitUntil: 'networkidle2'});
        }
        else{
            await page.goto(`data:text/html,${req.body}`, { waitUntil: 'networkidle2' });
        }
        await page.pdf({path: tempFile, format: 'A4'});
        await browser.close();

        var data = fs.readFileSync(tempFile);
        fs.unlinkSync(tempFile);

        context.res = {
            headers: {
                "Content-Type": "application/pdf"
            },
            status: 200,
            isRaw: true,
            body: data
        };
    }catch(ex){
        context.log.error(ex);
    }

    // not needed in an async function
    // context.done();
};