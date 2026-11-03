const {chromium}=require(process.env.TEMP+'/vantara-preview/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true}); const page=await browser.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const route of ['/','/solutions','/workforce','/global-recruitment','/how-it-works','/destinations','/about','/contact']){
   const response=await page.goto('http://localhost:3100'+route,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200);
   for(const width of [320,768,1100,1280,1920]){
     await page.setViewportSize({width,height:900});
     const result=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,nav:!![...document.querySelectorAll('header a[aria-current]')].length}));
     assert.ok(result.scroll<=width+1,route+' overflow at '+width+': '+result.scroll);
   }
   console.log('RESPONSIVE PASS',route);
 }
 await page.setViewportSize({width:390,height:844});
 await page.waitForFunction(()=>{const b=document.querySelector('.mobile-nav-toggle'); return b && Object.keys(b).some(k=>k.startsWith('__reactProps'));});
 await page.getByRole('button',{name:'Open navigation menu'}).click();await page.locator('dialog').waitFor({state:'visible'});
 await page.locator('dialog .mobile-close-btn').focus();await page.keyboard.press('Shift+Tab');assert.ok(await page.locator('dialog').evaluate(e=>e.contains(document.activeElement)));
 await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('aria-controls')),'mobile-navigation');
 await page.getByRole('button',{name:'Open navigation menu'}).click();await page.locator('dialog').waitFor({state:'visible'});await page.locator('dialog .mobile-candidate-link').click();
 await page.locator('.worker-modal-container .modal-close-btn').focus();await page.keyboard.press('Shift+Tab');assert.ok(await page.locator('.worker-modal-container').evaluate(e=>e.contains(document.activeElement)));
 await page.keyboard.press('Escape');assert.equal(await page.locator('.worker-modal-container').count(),0);
 assert.equal(await page.locator('header').evaluate(e=>e.inert),false);
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.waitForFunction(()=>Object.keys(document.querySelector('.mobile-nav-toggle')).some(k=>k.startsWith('__reactProps')));await page.getByRole('button',{name:'Open navigation menu'}).click();await page.locator('dialog').waitFor({state:'visible'});assert.equal(await page.locator('dialog').evaluate(e=>getComputedStyle(e).animationName),'none');
 await page.keyboard.press('Escape');
 console.log('INTERACTIONS PASS: focus containment/return, candidate handoff, Escape, background restoration, reduced-motion dialog');
 assert.deepEqual(errors,[]);console.log('NO RUNTIME ERRORS');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
