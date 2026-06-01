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
    
    await page.goto('http://localhost:5000/');
    await new Promise(r => setTimeout(r, 2000));
    
    const content = await page.content();
    console.log("HTML CONTENT START---");
    console.log(content.substring(0, 500));
    console.log("---HTML CONTENT END");
    
    if (content.includes('Случилась ошибка')) {
      console.log('ERROR_BOUNDARY_TRIGGERED');
    } else {
      console.log('NO_ERROR_BOUNDARY');
    }
    
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('PUPPETEER_FAIL:', err);
    process.exit(1);
  }
})();
