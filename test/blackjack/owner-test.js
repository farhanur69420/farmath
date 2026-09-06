const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const pg = await b.newPage({ viewport:{width:390,height:900}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
  const errs=[]; pg.on('pageerror', e=>errs.push(e.message));
  pg.on('console', m=>{ if(m.type()==='error' && !/ERR_|fonts/.test(m.text())) errs.push(m.text()); });
  await pg.goto('file:///home/user/mathify.us/public/explore/blackjack-engine/index.html');
  await pg.waitForTimeout(250);
  const txt = s => pg.textContent(s).then(t=>t.replace(/\s+/g,' ').trim());
  const key = r => pg.click(`.key[data-r="${r}"]`);
  const own = () => pg.$eval('.owner-btn.on', e=>e.textContent.replace(/\s+/g,' ').trim());
  const sel = o => pg.click(`.owner-btn[data-own="${o}"]`);

  await pg.click('.mode-opt[data-mode="live"]');
  await pg.click('#su-go'); await pg.waitForTimeout(400);

  console.log('=== auto-advance keeps the 3-tap path ===');
  console.log('start           :', await own());
  await key(9);  console.log('after dealer 10 :', await own(), '(should hand over to My cards)');
  await key(7); await key(7); await pg.waitForTimeout(400);
  console.log('after 8,8       :', await own(), '->', await txt('#rec-action'));

  console.log('\n=== explicit switching ===');
  await sel('other'); console.log('picked Others   :', await own());
  for (const r of [1,2,3,4,1,2,3,4]) await key(r);
  await pg.waitForTimeout(400);
  console.log('after 8 low     :', await own(), '| TC', await txt('#nav-nv'), '| decision', await txt('#rec-action'));
  console.log('sections        :', (await pg.$$eval('.owner-btn', els=>els.map(e=>e.textContent.replace(/\s+/g,' ').trim()))).join('  |  '));

  console.log('\n=== other players actually change the answer ===');
  await pg.click('#c-new'); await pg.waitForTimeout(150);
  await key(9); await key(9); await key(5); await pg.waitForTimeout(400);   // dealer 10, you 10+6
  console.log('16 v 10 alone   :', await txt('#rec-action'));
  await sel('other');
  for (let i=0;i<14;i++) await key([1,2,3,4][i%4]);
  await pg.waitForTimeout(500);
  console.log('after 14 low    :', await txt('#rec-action'), '| TC', await txt('#nav-nv'), '|', await txt('#rec-badge'));

  console.log('\n=== dealer draws stay on dealer ===');
  await sel('dealer');
  await key(3); await key(2); await pg.waitForTimeout(300);
  console.log('owner after 2 dealer draws:', await own());
  console.log('dealer row:', (await pg.$eval('[data-own="dealer"]', e=>e.textContent.replace(/\s+/g,' ').trim())));

  console.log('\n=== tapping a section row selects it ===');
  await pg.click('[data-own="other"]'); console.log('tapped Others row:', await own());

  console.log('\n=== Originals mode counts other players too ===');
  await pg.click('#mode-seg button[data-mode="csm"]'); await pg.waitForTimeout(600);
  await key(9); await key(9); await key(5); await pg.waitForTimeout(400);
  const before = await txt('#rec-action');
  await sel('other'); for (let i=0;i<14;i++) await key([1,2,3,4][i%4]);
  await pg.waitForTimeout(600);
  console.log('16 v 10 alone:', before, '-> after 14 low from others:', await txt('#rec-action'));
  await pg.screenshot({ path:'owner.png', fullPage:true });
  console.log(errs.length ? '\nERRORS: '+errs.join(' | ') : '\nno page errors');
  await b.close();
})();
