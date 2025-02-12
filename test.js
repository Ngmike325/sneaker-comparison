const puppeteer = require('puppeteer');

puppeteer.launch({ headless: false }).then(async browser => {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto('https://www.goat.com/sneakers/air-jordan-1-retro-high-85-og-bred-2025-hv6675-067', {
        waitUntil: 'networkidle2',
        headers: {
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        }
    });

    // Wait for the page content to load
    await page.waitForSelector('body');

    // Get the entire HTML content of the page
    const pageContent = await page.content();

    // Print the HTML content
    console.log(pageContent);

    await browser.close();
}).catch(error => {
    console.error('Error:', error);
});
