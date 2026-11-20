/* Page 404 aux couleurs du cabinet, avec son image. */
import { html, brut } from '../../outils/gabarit.mjs';

export const page = { cle: '404', fichier: '404', partage: false };

export default (c) => html`
<section class="ouv ouv--introuvable" id="debut">
  <div class="conteneur introuvable-grille">
    <div class="ouv-colonne">
      <p class="surtitre ouv-suite" data-anime="gsap">404</p>
      <h1 class="ouv-titre" data-anime="gsap"><span class="ouv-masque"><span class="ouv-ligne">${c.tb('introuvable.titre')}</span></span></h1>
      <p class="ouv-texte-intro ouv-suite masque-ecran-tres-bas" data-anime="gsap">${c.t('introuvable.texte')}</p>
      <div class="ouv-actions ouv-suite" data-anime="gsap">${c.lien('accueil', { classe: 'bouton', texte: c.t('introuvable.retour'), attrs: 'data-action-principale' })}<a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a></div>
      <p class="ouv-info ouv-suite" data-anime="gsap" data-info-cle>${c.tb('commun.adresse')}</p>
    </div>
    <div class="introuvable-media" data-iris-centre${brut(` style="--apercu:url(${c.donnees.apercus['grok/404']})"`)}>${c.media({ nom: 'grok/404', alt: c.s('introuvable.alt'), priorite: true, classe: 'introuvable-image', sizes: '(max-width: 760px) 92vw, 46vw', attrs: 'data-fx="zoom" data-fx-force="10"' })}</div>
  </div>
</section>
`;
