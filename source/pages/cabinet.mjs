/* Le cabinet : « 2004 » en très grand · parcours · « Censeo, j'estime » et portrait · méthode · statuts · FAQ · appel. */
import { html } from '../../outils/gabarit.mjs';
import { ouverture, methode, statuts, faq, appelFinal } from '../gabarits/blocs.mjs';

export const page = { cle: 'cabinet', fichier: 'cabinet', imagePartage: 'grok/cabinet-escalier-1280.webp' };

export default (c) => html`
${ouverture(c, {
  apercu: 'grok/cabinet-escalier', modele: 'millesime', cle: 'cabinet',
  action: c.lien('contact', { ancre: 'rendez-vous', classe: 'bouton', texte: c.t('cabinet.action'), attrs: 'data-action-principale data-survol="magnetique"' }),
  media: c.media({ nom: 'grok/cabinet-escalier', alt: c.s('cabinet.alt'), cadrage: '50% 40%', priorite: true, classe: 'ouv-millesime-image', sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-fx="parallaxe" data-fx-force="6"' }),
})}

<section class="parcours" id="parcours">
  <div class="conteneur">
    <h2 class="titre-section" data-anime="lignes">${c.tb('cabinet.parcours.titre')}</h2>
    <div class="frise">
      <svg class="frise-trait" viewBox="0 0 1000 10" preserveAspectRatio="none" aria-hidden="true" data-fx="trace"><path d="M0 5H1000" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      <ol class="frise-liste" data-anime="cascade">${c.donnees.parcours.map((p) => html`<li class="jalon"><span class="jalon-annee">${p.annee}</span><h3>${p.titre}</h3><p>${p.texte}</p></li>`)}</ol>
    </div>
  </div>
</section>

<section class="estime conteneur" id="censeo">
  ${c.media({ nom: 'portrait-kassigian', alt: c.s('cabinet.portrait.alt'), cadrage: '52% 30%', classe: 'estime-portrait', sizes: '(max-width: 760px) 70vw, 340px', attrs: 'data-anime="rideau"' })}
  <div>
    <p class="estime-mot" aria-hidden="true" data-audit-ignorer data-anime="lettres">cēnseō</p>
    <h2 class="titre-section" data-anime="lignes">${c.tb('cabinet.portrait.titre')}</h2>
    <p data-anime>${c.t('cabinet.portrait.texte')}</p>
    <p data-anime>${c.t('accueil.conseiller.texte')}</p>
    <ul class="atouts" data-anime="cascade"><li>${c.t('accueil.conseiller.atout1')}</li><li>${c.t('accueil.conseiller.atout2')}</li><li>${c.t('accueil.conseiller.atout3')}</li></ul>
  </div>
</section>

${methode(c, { titre: 'cabinet.methode', id: 'methode' })}

<section class="statuts-section conteneur" id="statuts">
  <h2 class="titre-section" data-anime="lignes">${c.tb('cabinet.statuts.titre')}</h2>
  <p class="texte-intro" data-anime>${c.t('cabinet.statuts.texte')}</p>
  ${statuts(c)}
</section>

${faq(c, { titre: c.tb('cabinet.faq.titre') })}

${appelFinal(c, {
  titre: c.tb('cabinet.fin.titre'), texte: c.t('accueil.fin.texte'),
  action: c.lien('contact', { ancre: 'rendez-vous', classe: 'bouton bouton--or', texte: c.t('cabinet.fin.action'), attrs: 'data-survol="magnetique"' }),
})}
`;
