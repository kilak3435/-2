import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER_ERROR:', error.message));
    page.on('response', response => {
      if (!response.ok()) {
        console.log('NETWORK_ERROR:', response.status(), response.url());
      }
    });
    
    await page.goto('https://resplendent-smakager-e539cf.netlify.app/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    
    const content = await page.content();
    console.log("HTML CONTENT START---");
    console.log(content.substring(0, 500));
    console.log("---HTML CONTENT END");
    
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('PUPPETEER_FAIL:', err);
    process.exit(1);
  }
})();
