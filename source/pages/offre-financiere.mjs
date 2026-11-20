/* Offre financière : grand titre puis bandeau qui se lève · sommaire des huit solutions · diagnostic ·
   contrats · portefeuilles · diversifier (trois grandes cartes) · fiscalité, salariés, prévoyance · partenaires · appel. */
import { html } from '../../outils/gabarit.mjs';
import { ouverture, listePartenaires, appelFinal } from '../gabarits/blocs.mjs';

export const page = { cle: 'offre-financiere', fichier: 'offre-financiere', imagePartage: 'grok/financiere-ouverture-1280.webp' };

export default (c) => {
  const F = c.donnees.financier;
  return html`
${ouverture(c, {
  apercu: 'grok/financiere-ouverture', modele: 'bandeau', cle: 'financiere',
  action: c.lien('contact', { ancre: 'rendez-vous', params: 'objet=diagnostic', classe: 'bouton', texte: c.t('financiere.action'), attrs: 'data-action-principale data-survol="magnetique"' }),
  media: c.media({ nom: 'grok/financiere-ouverture', alt: c.s('financiere.alt'), cadrage: '55% 66%', priorite: true, classe: 'ouv-bandeau-media', sizes: '100vw', attrs: 'data-effet="bandeau-leve"' }),
})}

<nav class="sommaire-offre conteneur" aria-labelledby="sommaire-titre">
  <h2 id="sommaire-titre" class="titre-petit" data-anime="lignes">${c.t('financiere.sommaire')}</h2>
  <ol class="sommaire-liste" data-anime="cascade">${F.sommaire.map((s, i) => html`<li><a href="#${s.ancre}" data-sans-transition><span class="sommaire-num">${String(i + 1).padStart(2, '0')}</span>${s.titre}</a></li>`)}</ol>
</nav>

<section class="diagnostic" id="diagnostic">
  <div class="conteneur diagnostic-grille">
    <div>
      <h2 class="titre-section" data-anime="lignes">${c.tb('financiere.diagnostic.titre')}</h2>
      <p data-anime>${c.t('financiere.diagnostic.texte')}</p>
      <p data-anime>${c.lien('contact', { ancre: 'rendez-vous', params: 'objet=diagnostic', classe: 'lien-fleche', texte: c.t('financiere.action') })}</p>
    </div>
    <ul class="constats" data-anime="cascade">${[1, 2, 3].map((n) => html`<li class="constat"><span class="constat-num">${String(n)}</span><strong>${c.t(`financiere.diagnostic.c${n}`)}</strong><span>${c.t(`financiere.diagnostic.c${n}t`)}</span></li>`)}</ul>
  </div>
</section>

<section class="contrats conteneur" id="contrats">
  <h2 class="titre-section" data-anime="lignes">${c.tb('financiere.contrats.titre')}</h2>
  <p class="texte-intro" data-anime>${c.t('financiere.contrats.texte')}</p>
  <div class="cartes-texte" data-anime="cascade">${F.contrats.map((x) => html`<article class="carte-texte" data-survol="incline" data-survol-force="3">
    <h3>${x.titre}</h3><p>${x.texte}</p><p class="carte-risque">${x.risque}</p>
  </article>`)}</div>
</section>

<section class="portefeuille" id="portefeuille">
  <div class="conteneur portefeuille-grille">
    <div>
      <h2 class="titre-section" data-anime="lignes">${c.tb('financiere.portefeuille.titre')}</h2>
      <p data-anime>${c.t('financiere.portefeuille.texte')}</p>
      <p data-anime>${c.lien('contact', { ancre: 'rendez-vous', params: 'objet=portefeuille', classe: 'bouton bouton--or', texte: c.t('financiere.portefeuille.action') })}</p>
    </div>
    <div class="deux-mains" data-effet="deux-mains">
      <div class="main main--direct"><span class="main-lettre" aria-hidden="true">A</span><h3>${c.t('financiere.portefeuille.direct')}</h3><p>${c.t('financiere.portefeuille.directTexte')}</p></div>
      <div class="main main--mandat"><span class="main-lettre" aria-hidden="true">B</span><h3>${c.t('financiere.portefeuille.mandat')}</h3><p>${c.t('financiere.portefeuille.mandatTexte')}</p></div>
    </div>
  </div>
</section>

<section class="diversifier conteneur" id="diversifier">
  <h2 class="titre-section" data-anime="lignes">${c.tb('financiere.diversifier.titre')}</h2>
  <p class="texte-intro" data-anime>${c.t('financiere.diversifier.texte')}</p>
  <div class="grandes-cartes" data-anime="cascade">${F.diversifier.map((x) => html`<article class="grande-carte">
    ${c.media({ nom: x.image, alt: x.alt, classe: 'grande-carte-media', sizes: '(max-width: 760px) 92vw, 31vw', attrs: 'data-fx="parallaxe" data-fx-force="7"' })}
    <h3>${x.titre}</h3><p>${x.texte}</p>
  </article>`)}</div>
  <p class="note-risque" data-anime>${c.t('financiere.diversifier.risque')}</p>
</section>

<section class="fiscal" id="fiscal">
  <div class="conteneur">
    <h2 class="titre-section" data-anime="lignes">${c.tb('financiere.fiscal.titre')}</h2>
    <div class="fiscal-grille" data-anime="cascade">${F.fiscal.map((x, i) => html`<article class="fiscal-carte">
      <span class="fiscal-num">${String(i + 1).padStart(2, '0')}</span><h3>${x.titre}</h3><p>${x.texte}</p>${x.risque ? html`<p class="carte-risque">${x.risque}</p>` : ''}
    </article>`)}</div>
  </div>
</section>

${listePartenaires(c, { titre: c.t('financiere.partenaires'), noms: c.donnees.partenaires.financiers })}

${appelFinal(c, {
  titre: c.tb('financiere.fin.titre'), texte: c.t('accueil.fin.texte'),
  action: c.lien('contact', { ancre: 'rendez-vous', params: 'objet=diagnostic', classe: 'bouton bouton--or', texte: c.t('financiere.fin.action'), attrs: 'data-survol="magnetique"' }),
})}
`;
};
