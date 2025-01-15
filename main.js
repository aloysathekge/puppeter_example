import puppeteer from 'puppeteer';

(async () => {
  try {
    // Launch the browser with head mode (visible)
    const browser = await puppeteer.launch({
      headless: false,  // Make browser visible
      defaultViewport: null  // Use default viewport of the browser
    });
    const page = await browser.newPage();

    // Navigate to website
    await page.goto('https://newpaper.app');

    // Take a screenshot
    await page.screenshot({ path: 'screenshot.png' });

    // Wait for 5 seconds before closing (so you can see the page)
    await new Promise(r => setTimeout(r, 5000));

    // Close browser
    await browser.close();
    
    console.log('Screenshot saved as screenshot.png');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();