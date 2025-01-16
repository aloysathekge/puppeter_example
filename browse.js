import puppeteer from 'puppeteer'; // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });
    const page = await browser.newPage();
    const timeout = 30000; // Increased timeout to 30 seconds
    page.setDefaultTimeout(timeout);

    try {
        const targetPage = page;
        await targetPage.setViewport({
            width: 808,
            height: 641
        });

        console.log('Navigating to Betway...');
        await targetPage.goto('https://www.betway.co.za/', {
            waitUntil: 'networkidle0',  // Wait until network is idle
            timeout: timeout
        });
        
        console.log('Waiting for page to be fully loaded...');
        await targetPage.waitForSelector('#navbar_sport', { timeout });

        {
            const targetPage = page;
            const promises = [];
            const startWaitingForEvents = () => {
                promises.push(targetPage.waitForNavigation());
            }
            await puppeteer.Locator.race([
                targetPage.locator('#navbar_sport > div.old-anchor > div'),
                targetPage.locator('::-p-xpath(//*[@id=\\"navbar_sport\\"]/div[2]/div)'),
                targetPage.locator(':scope >>> #navbar_sport > div.old-anchor > div')
            ])
                .setTimeout(timeout)
                .on('action', () => startWaitingForEvents())
                .click({
                  offset: {
                    x: 19,
                    y: 22,
                  },
                });
            await Promise.all(promises);
        }
        {
            const targetPage = page;
            await puppeteer.Locator.race([
                targetPage.locator('#\\30 f6ea660-a58a-4143-9d4d-061ade9a4455 > div.col-xs-12 > div:nth-of-type(1) div.outcome-pricedecimal'),
                targetPage.locator('::-p-xpath(//*[@id=\\"7c0f1693-efd1-ef11-92d6-00155da60c0c\\"]/div[2])'),
                targetPage.locator(':scope >>> #\\30 f6ea660-a58a-4143-9d4d-061ade9a4455 > div.col-xs-12 > div:nth-of-type(1) div.outcome-pricedecimal')
            ])
                .setTimeout(timeout)
                .click({
                  offset: {
                    x: 7.984375,
                    y: 7.5,
                  },
                });
        }
        {
            const targetPage = page;
            await puppeteer.Locator.race([
                targetPage.locator('#f7452037-fca2-45f4-b67e-f616055bf842 > div.col-xs-12 > div:nth-of-type(1) div.outcome-pricedecimal'),
                targetPage.locator('::-p-xpath(//*[@id=\\"e007197c-efd1-ef11-92d6-00155da60c0c\\"]/div[2])'),
                targetPage.locator(':scope >>> #f7452037-fca2-45f4-b67e-f616055bf842 > div.col-xs-12 > div:nth-of-type(1) div.outcome-pricedecimal'),
                targetPage.locator('::-p-text(2.14)')
            ])
                .setTimeout(timeout)
                .click({
                  offset: {
                    x: 3.984375,
                    y: 11.53125,
                  },
                });
        }
    } catch (err) {
        console.error(err);
    } finally {
        await browser.close();
    }
})().catch(err => {
    console.error(err);
    process.exit(1);
});
