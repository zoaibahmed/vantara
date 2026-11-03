const { chromium } = require(process.env.TEMP + '/vantara-preview/node_modules/playwright');
const fs = require('fs');
(async()=>{
 const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 page.on('pageerror',e=>console.log('PAGE_ERROR',e.message));
 await page.goto('http://localhost:3100',{waitUntil:'domcontentloaded',timeout:120000});
 await page.waitForFunction(()=>getComputedStyle(document.querySelector('.hero-content')).opacity === '1');
 await page.screenshot({path:'artifacts/desktop-home.png'});
 console.log('DESKTOP',await page.evaluate(()=>({title:document.title,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,font:getComputedStyle(document.body).fontFamily,header:document.querySelector('header').getBoundingClientRect().height})));
 await page.locator('footer').evaluate(e=>window.scrollTo(0,e.offsetTop-150)); await page.waitForTimeout(400); await page.screenshot({path:'artifacts/desktop-footer.png',fullPage:false});
 await page.setViewportSize({width:390,height:844}); await page.goto('http://localhost:3100',{waitUntil:'domcontentloaded'}); await page.waitForFunction(()=>getComputedStyle(document.querySelector('.hero-content')).opacity === '1');
 await page.screenshot({path:'artifacts/mobile-home.png'});
 await page.getByRole('button',{name:'Open navigation menu'}).click(); await page.waitForTimeout(400); await page.screenshot({path:'artifacts/mobile-menu.png'});
 console.log('MOBILE_MENU',await page.getByRole('dialog').isVisible(),await page.locator('dialog nav a').count());
 await page.keyboard.press('Escape'); console.log('ESCAPE',await page.getByRole('dialog').isVisible());
 await page.getByRole('button',{name:'Open navigation menu'}).click(); await page.locator('dialog').getByRole('button',{name:'Join Our Workforce',exact:true}).click();
 console.log('CANDIDATE',await page.getByRole('dialog').isVisible()); await page.getByRole('button',{name:'Close candidate modal'}).click();
 for (const route of ['/','/solutions','/workforce','/global-recruitment','/how-it-works','/destinations','/about','/contact']) {
  await page.goto('http://localhost:3100'+route,{waitUntil:'domcontentloaded',timeout:120000}); await page.waitForTimeout(250);
  console.log('ROUTE',route,await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelector('main h1')?.textContent})));
 }
 await page.screenshot({path:'artifacts/mobile-contact.png'});
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
