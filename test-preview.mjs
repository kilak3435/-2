import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER_ERROR:', error.message));
    
    await page.goto('http://localhost:4173/');
    await new Promise(r => setTimeout(r, 2000));
    
    const content = await page.content();
    if (content.includes('Случилась ошибка')) {
      console.log('ERROR_BOUNDARY_TRIGGERED');
    } else {
      console.log('NO_ERROR_BOUNDARY');
    }
    
    await browser.close();
  } catch (err) {
    console.error('PUPPETEER_FAIL:', err);
  }
})();
