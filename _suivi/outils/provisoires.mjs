// Visuels provisoires (v0) pour les images Grok pas encore reçues : dégradé de pierre + nom, aux tailles du plan.
// Remplacés par produire.mjs dès réception. Usage : node _suivi/outils/provisoires.mjs
import fs from 'node:fs'; import path from 'node:path';
import { createRequire } from 'node:module'; const sharp = createRequire(import.meta.url)('/home/claude/censeo-patrimoine-maquette/_biblio/node_modules/sharp');
const plan = JSON.parse(fs.readFileSync('plan-images.json', 'utf8'));
const EMPL = JSON.parse(fs.readFileSync('/home/claude/bibliotheque-maquettes/images/emplacements.json', 'utf8'));
for (const e of plan) {
  if (!e.source.includes('recu/grok/') || fs.existsSync(e.source)) continue;
  const em = EMPL[e.role] || {};
  const ratio = (e.ratio || em.ratio || '3:2').split(':').map(Number);
  const ws = e.largeurs || em.largeurs || [640, 1280];
  const faire = async (nom, w, r) => {
    const h = Math.round(w * r[1] / r[0]);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E9DDC6"/><stop offset=".6" stop-color="#D3BF9B"/><stop offset="1" stop-color="#B9A27A"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="50%" text-anchor="middle" font-family="Georgia" font-size="${Math.max(18, w / 28)}" fill="#14223A" opacity=".45">${nom.replace('grok/', '')} · provisoire</text></svg>`;
    const out = path.join('assets/images', `${nom}-${w}.webp`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(Buffer.from(svg)).webp({ quality: 60 }).toFile(out);
  };
  for (const w of ws) await faire(e.nom, w, ratio);
  if (e.mobile) for (const w of [640, 960]) await faire(`${e.nom}-mobile`, w, [9, 16]);
}
console.log('provisoires écrits');
