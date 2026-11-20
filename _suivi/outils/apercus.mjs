// Aperçus flous (20 px, base64) des images d'ouverture : fond de leur figure, pour qu'un retour arrière ou avant
// ne montre jamais une case grise avant le décodage. Écrit donnees/apercus.json. Usage : node _suivi/outils/apercus.mjs
import fs from 'node:fs';
import { createRequire } from 'node:module';
const sharp = createRequire(import.meta.url)('/home/claude/censeo-patrimoine-maquette/_biblio/node_modules/sharp');
const noms = ['grok/accueil-ouverture', 'grok/financiere-ouverture', 'grok/immobiliere-ouverture', 'grok/cabinet-escalier', 'grok/contact-porte', 'grok/404'];
const sortie = {};
for (const n of noms) for (const v of ['', '-mobile']) {
  const f = fs.readdirSync('assets/images/' + n.split('/')[0]).filter((x) => x.startsWith(n.split('/')[1] + v + '-') && /-\d+\.webp$/.test(x) && (v || !x.includes('-mobile-'))).sort()[0];
  if (!f) continue;
  const buf = await sharp('assets/images/grok/' + f).resize(20).blur(0.6).webp({ quality: 50 }).toBuffer();
  sortie[n + v] = 'data:image/webp;base64,' + buf.toString('base64');
}
fs.writeFileSync('donnees/apercus.json', JSON.stringify(sortie, null, 1));
console.log(Object.keys(sortie).join(', '));
