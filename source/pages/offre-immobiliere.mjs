/* Offre immobilière : plein cadre qui recule · cinq façons · SCPI · nue-propriété (schéma du démembrement) ·
   immobilier direct et crowdfunding · États-Unis · partenaires · appel. */
import { html } from '../../outils/gabarit.mjs';
import { ouverture, listePartenaires, appelFinal } from '../gabarits/blocs.mjs';

export const page = { cle: 'offre-immobiliere', fichier: 'offre-immobiliere', imagePartage: 'grok/immobiliere-ouverture-1280.webp' };

export default (c) => html`
${ouverture(c, {
  apercu: 'grok/immobiliere-ouverture', modele: 'plein', cle: 'immobiliere',
  action: c.lien('contact', { ancre: 'rendez-vous', params: 'objet=immobilier', classe: 'bouton bouton--or', texte: c.t('immobiliere.action'), attrs: 'data-action-principale data-survol="magnetique"' }),
  media: c.media({ nom: 'grok/immobiliere-ouverture', alt: c.s('immobiliere.alt'), cadrage: '50% 50%', cadrageMobile: '50% 45%', priorite: true, classe: 'ouv-plein-image', sizes: '100vw', attrs: 'data-effet="recul"' }),
})}

<nav class="facons conteneur" aria-labelledby="facons-titre">
  <h2 id="facons-titre" class="titre-petit" data-anime="lignes">${c.t('immobiliere.facons')}</h2>
  <ol class="facons-liste" data-anime="cascade">${c.donnees.immobilier.facons.map((f, i) => html`<li><a href="#${f.ancre}" data-sans-transition><span class="sommaire-num">${String(i + 1).padStart(2, '0')}</span><strong>${f.titre}</strong><span>${f.texte}</span></a></li>`)}</ol>
</nav>

<section class="scpi conteneur" id="scpi">
  <div class="scpi-grille">
    ${c.media({ nom: 'grok/immobiliere-scpi', alt: c.s('immobiliere.scpi.alt'), classe: 'scpi-media', sizes: '(max-width: 760px) 92vw, 48vw', attrs: 'data-anime="rideau"' })}
    <div>
      <h2 class="titre-section" data-anime="lignes">${c.tb('immobiliere.scpi.titre')}</h2>
      <p data-anime>${c.t('immobiliere.scpi.texte')}</p>
      <p class="titre-petit" data-anime>${c.t('immobiliere.scpi.modes')}</p>
      <ul class="pastilles" data-anime="cascade">${[1, 2, 3, 4].map((n) => html`<li>${c.t(`immobiliere.scpi.m${n}`)}</li>`)}</ul>
    </div>
  </div>
  <div class="scpi-deficit" data-anime>
    <h3>${c.t('immobiliere.scpi.deficit')}</h3>
    <p>${c.t('immobiliere.scpi.deficitTexte')}</p>
    <p class="carte-risque">${c.t('immobiliere.scpi.risque')}</p>
  </div>
</section>

<section class="nue" id="nue-propriete">
  <div class="conteneur">
    <div class="nue-grille">
      <div>
        <h2 class="titre-section" data-anime="lignes">${c.tb('immobiliere.nue.titre')}</h2>
        <p data-anime>${c.t('immobiliere.nue.texte')}</p>
        <p data-anime><strong>${c.t('immobiliere.nue.pour')}</strong></p>
        <ul class="atouts atouts--clair" data-anime="cascade"><li>${c.t('immobiliere.nue.atout1')}</li><li>${c.t('immobiliere.nue.atout2')}</li><li>${c.t('immobiliere.nue.atout3')}</li></ul>
      </div>
      ${c.media({ nom: 'grok/immobiliere-nue-propriete', alt: c.s('immobiliere.nue.alt'), classe: 'nue-media', sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-fx="parallaxe"' })}
    </div>
    <figure class="demembrement" data-visuel>
      <figcaption class="demembrement-titre"><span class="etiquette etiquette--clair">${c.t('commun.illustratif')}</span> ${c.t('immobiliere.nue.schemaTitre')}</figcaption>
      <div class="demembrement-barre" aria-hidden="true"><span class="dm-nue" data-effet="demembrement"></span><span class="dm-usufruit"></span><span class="dm-pleine">${c.t('immobiliere.nue.schemaPleine')}</span></div>
      <div class="demembrement-axe"><span>${c.t('immobiliere.nue.schemaDebut')}</span><span>${c.t('immobiliere.nue.schemaFin')}</span></div>
      <ul class="demembrement-legende"><li><i style="background:var(--or-clair)"></i>${c.t('immobiliere.nue.schemaNue')}</li><li><i style="background:repeating-linear-gradient(135deg,rgba(244,239,230,.4) 0 5px,rgba(244,239,230,.15) 5px 10px)"></i>${c.t('immobiliere.nue.schemaUsufruit')}</li></ul>
      <p class="demembrement-note">${c.t('immobiliere.nue.schemaNote')}</p>
    </figure>
  </div>
</section>

<section class="direct-crowd conteneur" id="direct">
  <div class="cartes-texte cartes-texte--deux" data-anime="cascade">
    <article class="carte-texte" data-survol="incline" data-survol-force="3"><h2 class="titre-moyen">${c.tb('immobiliere.direct.titre')}</h2><p>${c.t('immobiliere.direct.texte')}</p></article>
    <article class="carte-texte" id="crowdfunding" data-survol="incline" data-survol-force="3"><h2 class="titre-moyen">${c.tb('immobiliere.crowd.titre')}</h2><p>${c.t('immobiliere.crowd.texte')}</p></article>
  </div>
</section>

<section class="usa conteneur" id="etats-unis">
  <div class="usa-grille">
    <div>
      <h2 class="titre-section" data-anime="lignes">${c.tb('immobiliere.usa.titre')}</h2>
      <p data-anime>${c.t('immobiliere.usa.texte')}</p>
      <p class="usa-villes" data-anime="mots">${c.t('immobiliere.usa.villes')}</p>
      <p class="carte-risque" data-anime>${c.t('immobiliere.usa.risque')}</p>
    </div>
    ${c.media({ nom: 'grok/immobiliere-usa', alt: c.s('immobiliere.usa.alt'), classe: 'usa-media', sizes: '(max-width: 760px) 92vw, 44vw', attrs: 'data-fx="zoom"' })}
  </div>
</section>

${listePartenaires(c, { titre: c.t('immobiliere.partenaires'), noms: c.donnees.partenaires.immobiliers })}

${appelFinal(c, {
  titre: c.tb('immobiliere.fin.titre'), texte: c.t('accueil.fin.texte'),
  action: c.lien('contact', { ancre: 'rendez-vous', params: 'objet=immobilier', classe: 'bouton bouton--or', texte: c.t('immobiliere.fin.action'), attrs: 'data-survol="magnetique"' }),
})}
`;
