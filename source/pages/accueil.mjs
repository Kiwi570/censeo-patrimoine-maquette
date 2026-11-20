/* Accueil de Censeo Patrimoine (direction « La rue dorée »).
   Ordre : ouverture (photo dans une arche) · repères · deux métiers · pierre à pierre · méthode · conseiller ·
   rue dorée · transparence · rendez-vous. Chaque section a un effet au défilement, visible aussi sur téléphone. */
import { html } from '../../outils/gabarit.mjs';
import { ouverture, partenaires, methode, statuts, appelFinal } from '../gabarits/blocs.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'grok/accueil-ouverture-1280.webp' };

export default (c) => html`
${ouverture(c, {
  apercu: 'grok/accueil-ouverture', modele: 'accueil', cle: 'accueil.hero',
  action: c.lien('contact', { ancre: 'rendez-vous', classe: 'bouton', texte: c.t('accueil.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' }),
  secondaire: html`<a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a>`,
  media: c.media({ nom: 'grok/accueil-ouverture', alt: c.s('accueil.hero.alt'), cadrage: '50% 55%', cadrageMobile: '50% 60%', priorite: true, classe: 'ouv-arche', sizes: '(max-width: 760px) 80vw, 42vw', attrs: 'data-iris-centre' }),
})}

<section class="reperes" id="reperes">
  <div class="conteneur reperes-grille">
    <div class="reperes-tete">
      <h2 class="titre-section" data-anime="lignes">${c.t('accueil.reperes.titre')}</h2>
      <p data-anime>${c.t('accueil.reperes.texte')}</p>
    </div>
    <ul class="reperes-liste">${c.donnees.reperes.map((r) => html`<li class="repere">
      <strong class="repere-chiffre">${r.prefixe ? html`<span class="repere-prefixe">${r.prefixe}</span>` : ''}${r.valeur > 1900 ? html`<span data-anime="lettres">${String(r.valeur)}</span>` : html`<span data-compteur="${r.valeur}">${String(r.valeur)}</span>`}</strong>
      <span class="repere-texte">${r.texte}</span>
    </li>`)}</ul>
  </div>
</section>

<section class="metiers conteneur" id="metiers">
  <div class="metiers-tete">
    <p class="surtitre">${c.t('accueil.metiers.sur')}</p>
    <h2 class="titre-section" data-anime="lignes">${c.tb('accueil.metiers.titre')}</h2>
    <p class="texte-intro" data-anime>${c.t('accueil.metiers.texte')}</p>
  </div>
  <div class="metiers-cartes" data-anime="cascade">
    ${[['offre-financiere', 'financier', 'grok/accueil-financier', 'Bureau en chêne près d\'une haute fenêtre, carnet ouvert et stylo plume'], ['offre-immobiliere', 'immobilier', 'grok/accueil-immobilier', 'Façade d\'immeuble ancien en pierre blonde, volets et balcons en fer forgé']].map(([page, cle, image, alt], i) => html`
    <article class="metier-carte metier-carte--${i + 1}" data-survol="incline" data-survol-force="4">
      ${c.media({ nom: image, alt, classe: 'metier-media', sizes: '(max-width: 760px) 92vw, 46vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
      <div class="metier-texte">
        <p class="metier-num">0${i + 1}</p>
        <h3>${c.t(`accueil.metiers.${cle}`)}</h3>
        <p>${c.t(`accueil.metiers.${cle}Texte`)}</p>
        ${c.lien(page, { classe: 'lien-fleche', texte: html`${c.t('accueil.metiers.voir')}<span class="visuellement-cache"> : ${c.t(`accueil.metiers.${cle}`)}</span>` })}
      </div>
    </article>`)}
  </div>
</section>

<section class="pierres" id="pierre-a-pierre" data-scene>
  <div class="pierres-cadre" data-collant>
    <div class="conteneur pierres-grille">
      <div class="pierres-texte">
        <p class="surtitre">${c.t('accueil.pierres.sur')}</p>
        <h2 class="titre-section" data-anime="lignes">${c.tb('accueil.pierres.titre')}</h2>
        <p class="masque-ecran-tres-bas" data-anime>${c.t('accueil.pierres.texte')}</p>
        <p class="pierres-note" data-anime><span class="etiquette">${c.t('commun.illustratif')}</span> ${c.t('accueil.pierres.note')}</p>
      </div>
      <div class="mur" data-visuel role="list" aria-label="${c.s('accueil.pierres.region')}">
        ${[4, 3, 2, 1, 0].map((rang) => html`<div class="assise assise--${rang}">${c.donnees.piliers.filter((p) => p.rang === rang).map((p) => html`
          <div class="pierre pierre--${p.cle}" role="listitem" data-effet="assises" data-rang="${rang}">
            <strong>${p.titre}</strong><span>${p.texte}</span>
          </div>`)}</div>`)}
        <span class="mention-ia mention-ia--mur">${c.t('commun.mentionIa')}</span>
      </div>
    </div>
  </div>
</section>

${methode(c, { titre: 'accueil.methode', lien: c.lien('cabinet', { ancre: 'methode', classe: 'lien-fleche lien-fleche--clair', texte: c.t('accueil.methode.lien') }) })}

<section class="conseiller conteneur" id="conseiller">
  <div class="conseiller-visuels">
    ${c.media({ nom: 'grok/accueil-bureau', alt: c.s('accueil.conseiller.altBureau'), classe: 'conseiller-bureau', sizes: '(max-width: 760px) 92vw, 50vw', attrs: 'data-fx="parallaxe"' })}
    ${c.media({ nom: 'portrait-kassigian', alt: c.s('cabinet.portrait.alt'), cadrage: '52% 30%', classe: 'conseiller-portrait', sizes: '(max-width: 760px) 44vw, 220px', attrs: 'data-anime="rideau" data-superpose' })}
  </div>
  <div class="conseiller-texte">
    <p class="surtitre">${c.t('accueil.conseiller.sur')}</p>
    <h2 class="titre-section" data-anime="lignes">${c.tb('accueil.conseiller.titre')}</h2>
    <p data-anime>${c.t('accueil.conseiller.texte')}</p>
    <ul class="atouts" data-anime="cascade">
      <li>${c.t('accueil.conseiller.atout1')}</li><li>${c.t('accueil.conseiller.atout2')}</li><li>${c.t('accueil.conseiller.atout3')}</li>
    </ul>
    <p data-anime>${c.lien('cabinet', { classe: 'lien-fleche', texte: c.t('accueil.conseiller.lien') })}</p>
  </div>
</section>

<section class="rue" id="rue-doree">
  ${c.media({ nom: 'grok/accueil-rue', alt: c.s('accueil.rue.alt'), cadrage: '62% 50%', classe: 'rue-media', sizes: '100vw', attrs: 'data-fx="zoom" data-fx-force="14"' })}
  <div class="conteneur rue-carte-place">
    <div class="rue-carte" data-superpose>
      <p class="surtitre">${c.t('accueil.rue.sur')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.tb('accueil.rue.titre')}</h2>
      <p data-anime>${c.t('accueil.rue.texte')}</p>
      <p data-anime>${c.lien('contact', { ancre: 'acces', classe: 'lien-fleche', texte: c.t('accueil.rue.lien') })}</p>
    </div>
  </div>
</section>

<section class="transparence" id="transparence">
  <div class="conteneur">
    <div class="transparence-tete">
      <p class="surtitre">${c.t('accueil.transparence.sur')}</p>
      <h2 class="titre-section" data-anime="lignes">${c.tb('accueil.transparence.titre')}</h2>
    </div>
    ${statuts(c)}
    <p class="transparence-lien" data-anime>${c.lien('cabinet', { ancre: 'statuts', classe: 'lien-fleche', texte: c.t('accueil.transparence.lien') })}</p>
  </div>
  ${partenaires(c, { titre: c.t('accueil.transparence.partenaires'), noms: [...c.donnees.partenaires.financiers, ...c.donnees.partenaires.immobiliers], id: 'ruban-accueil' })}
</section>

${appelFinal(c, {
  titre: c.tb('accueil.fin.titre'), texte: c.t('accueil.fin.texte'),
  action: c.lien('contact', { ancre: 'rendez-vous', classe: 'bouton bouton--or', texte: c.t('accueil.fin.action'), attrs: 'data-survol="magnetique"' }),
  media: c.media({ nom: 'grok/accueil-loge', alt: c.s('accueil.fin.alt'), cadrage: '72% 62%', classe: 'fin-media', sizes: '(max-width: 760px) 92vw, 46vw', attrs: 'data-anime="rideau"' }),
})}
`;
