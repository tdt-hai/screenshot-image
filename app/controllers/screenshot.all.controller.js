const puppeteer = require('puppeteer');
require('dotenv').config();

async function postScreenShot(req, res) {
    const body = req.body;

    if (body.base_url == null) {
        return res.status(400).send({ 'message': 'base_url is required' });
    }
    if (body.urls == null) {
        return res.status(400).send({ 'message': 'urls is required' });
    }
    if (!Array.isArray(body.urls)) {
        return res.status(400).send({ 'message': 'urls must be valid array name and url' });
    }
    const folder = './image';
    const width = parseInt(body.width) || 1800;
    const height = parseInt(body.height) || 750;

    // C:/Program Files/Google/Chrome/Application/chrome.exe
    // /usr/bin/google-chrome
    const browser = await puppeteer.launch({ headless: true, executablePath: '/usr/bin/google-chrome' , args: ['--ignore-certificate-errors --enable-features=NetworkService', '--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await client.send('Security.setIgnoreCertificateErrors', { ignore: true });

    // Get the "viewport" of the page, as reported by the page.
    await page.setViewport({ width, height })

    try {
        const now = Date.now();
        const path = [];
        const baseurl = process.env.HOST || `http://localhost:${global.PORT}`;
        for (const i in body.urls) {
            const name = `${now}_${body.urls[i].name}.jpg`;
            await page.goto(`${body.base_url}/${body.urls[i].url}`, { waitUntil: 'networkidle0' });
            await page.screenshot({ path: `${folder}/${name}`, type: "jpeg", quality: 100, omitBackground: true, fullPage: true });
            path.push({
                'name': body.urls[i].name,
                'url': `${baseurl}/image/${name}`
            })
        }
        await browser.close();
        res.status(200).send({ "message": "success", "images": path , "status": "1" });
    }
    catch (err) {
        console.log("PPTR Error - handled case", err);
        res_data = [{ "type": "error" }];
        await browser.close();
        res.status(200).send({ "message": `error - ${err}`, "status": "0" });
    }

}; // global function closing
async function getScreenShot(req, res) {
    res.status(200).send({
        "message": [{
            "base_url": "",
            "width": "",
            "height": "",
            "urls": [{
                "name": "",
                "url": ""
            }]
        }]
    });
}

module.exports ={postScreenShot,getScreenShot} 