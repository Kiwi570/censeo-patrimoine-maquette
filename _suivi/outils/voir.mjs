// Captures de travail : node _suivi/outils/voir.mjs /page 1440x900,390x844 [plein] -> _suivi/captures/
import { chromium } from '/usr/local/lib/node_modules_global/playwright/index.mjs';
import { demarrerServeur } from '../../_audit/serveur.mjs';
import fs from 'node:fs';
const [, , page = '/', tailles = '1440x900', plein = 'plein'] = process.argv;
const S = await demarrerServeur(process.cwd()); const url = S.adresse;
fs.mkdirSync('_suivi/captures', { recursive: true });
const b = await chromium.launch();
for (const t of tailles.split(',')) {
  const [w, h] = t.split('x').map(Number);
  const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: w < 800, isMobile: w < 800 });
  const p = await ctx.newPage();
  const erreurs = [];
  p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') erreurs.push(m.text()); });
  p.on('pageerror', (e) => erreurs.push('PAGEERROR ' + e.message));
  await p.goto(url + page, { waitUntil: 'networkidle' });
  await p.waitForTimeout(3200);
  const nom = (page === '/' ? 'accueil' : page.replace(/\W+/g, '')) + `-${w}x${h}`;
  await p.screenshot({ path: `_suivi/captures/${nom}-ecran.jpg`, quality: 70 });
  if (plein === 'plein') {
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += Math.round(h * 0.6)) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(180); }
    await p.waitForTimeout(800);
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(600);
    await p.screenshot({ path: `_suivi/captures/${nom}-page.jpg`, fullPage: true, quality: 60 });
  }
  if (erreurs.length) console.log(nom, 'console :', [...new Set(erreurs)].slice(0, 8).join(' | '));
  await ctx.close();
}
await b.close(); await S.fermer(); process.exit(0);
