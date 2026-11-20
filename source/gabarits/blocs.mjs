/* Composants du site, partagés par toutes les pages : ouvertures (une composition par modèle de page),
   méthode, statuts, partenaires, FAQ, appel final. Même palette, même typographie partout. */
import { html, brut } from '../../outils/gabarit.mjs';

/* Titre d'ouverture : data-anime="gsap" sur le h1 seulement, les lignes s'animent par leur classe. */
const titre = (c, cle) => html`<h1 class="ouv-titre" data-anime="gsap"><span class="ouv-masque"><span class="ouv-ligne">${c.tb(`${cle}.titre1`)}</span></span><span class="ouv-masque"><span class="ouv-ligne">${c.tb(`${cle}.titre2`)}</span></span></h1>`;
const tete = (c, cle) => html`<p class="surtitre ouv-suite" data-anime="gsap">${c.t(`${cle}.sur`)}</p>${titre(c, cle)}`;
const suite = (c, cle, o) => html`<p class="ouv-texte-intro ouv-suite masque-ecran-tres-bas" data-anime="gsap">${c.t(`${cle}.texte`)}</p>
  <div class="ouv-actions ouv-suite" data-anime="gsap">${o.action}${o.secondaire || ''}</div>
  <p class="ouv-info ouv-suite" data-anime="gsap" data-info-cle>${c.t(`${cle}.info`)}</p>`;

export function ouverture(c, o) {
  const cle = o.cle;
  /* Aperçu flou de l'image d'ouverture (donnees/apercus.json) : jamais de case grise au retour arrière ou avant. */
  const A = c.donnees.apercus || {};
  const ap = o.apercu ? brut(` style="--apercu:url(${A[o.apercu] || ''})${A[o.apercu + '-mobile'] ? `;--apercu-m:url(${A[o.apercu + '-mobile']})` : ''}"`) : '';
  if (o.modele === 'accueil') {
    /* Scindée : titre sur la pierre, photo dans une arche (objet d'ouverture), qui s'élargit au défilement. */
    return html`<section class="ouv ouv--accueil" id="debut">
  <div class="ouv-colonne">${tete(c, cle)}${suite(c, cle, o)}</div>
  <div class="ouv-arche-place" data-effet="arche"${ap}>${o.media}<span class="ouv-arche-lumiere" aria-hidden="true"><span class="ouv-arche-reflet" data-effet="lumiere-doree"></span></span></div>
</section>`;
  }
  if (o.modele === 'bandeau') {
    /* Grand titre puis bandeau : la photo en bande se lève et s'élargit au défilement. */
    return html`<section class="ouv ouv--bandeau" id="debut">
  <div class="conteneur ouv-bandeau-haut">
    <div>${tete(c, cle)}</div>
    <div class="ouv-bandeau-cote">${suite(c, cle, o)}</div>
  </div>
  <div class="ouv-bandeau-place" data-iris-centre${ap}>${o.media}</div>
</section>`;
  }
  if (o.modele === 'plein') {
    /* Plein cadre : la photo recule, un calque bleu nuit s'efface, le titre en bas à gauche sur fond sombre. */
    return html`<section class="ouv ouv--plein" id="debut">
  <div class="ouv-plein-media" data-iris-centre${ap}>${o.media}<span class="ouv-plein-calque" data-effet="calque-nuit" aria-hidden="true"></span></div>
  <div class="conteneur ouv-plein-texte">${tete(c, cle)}${suite(c, cle, o)}</div>
</section>`;
  }
  if (o.modele === 'millesime') {
    /* Numéro en très grand : « 2004 » se remplit d'or au défilement, à côté de l'escalier de pierre. */
    return html`<section class="ouv ouv--millesime" id="debut">
  <div class="conteneur ouv-millesime-grille">
    <div class="ouv-colonne">
      <p class="millesime" aria-hidden="true" data-superpose><span class="millesime-vide" data-audit-ignorer>2004</span><span class="millesime-or" data-effet="millesime">2004</span></p>
      ${tete(c, cle)}${suite(c, cle, o)}
    </div>
    <div class="ouv-millesime-media" data-iris-centre${ap}>${o.media}</div>
  </div>
</section>`;
  }
  /* contact : scindée, coordonnées tout de suite, la porte cochère à droite. */
  return html`<section class="ouv ouv--contact" id="debut">
  <div class="conteneur ouv-contact-grille">
    <div class="ouv-colonne">${tete(c, cle)}${suite(c, cle, o)}${o.apres || ''}</div>
    <div class="ouv-contact-media" data-iris-centre${ap}>${o.media}<span class="battant battant--g" data-effet="porte" aria-hidden="true"></span><span class="battant battant--d" data-effet="porte" aria-hidden="true"></span></div>
  </div>
</section>`;
}

export function methode(c, { titre: cle, lien = '', id = 'methode' }) {
  return html`<section class="methode" id="${id}">
  <div class="conteneur">
    <p class="surtitre surtitre--clair">${c.t(`${cle}.sur`, {})}</p>
    <h2 class="titre-section" data-anime="lignes">${c.tb(`${cle}.titre`)}</h2>
    <div class="methode-piste" data-visuel>
      <svg class="methode-filet" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true" data-fx="trace"><path d="M10 20 C 180 4, 320 36, 500 20 S 820 4, 990 20" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      <ol class="methode-etapes" data-anime="cascade">${c.donnees.methode.map((e, i) => html`<li class="etape">
        <span class="etape-num">${String(i + 1)}</span>
        <h3>${e.titre}</h3>
        <p>${e.texte}</p>
      </li>`)}</ol>
    </div>
    ${lien ? html`<p class="methode-lien" data-anime>${lien}</p>` : ''}
  </div>
</section>`;
}

export function statuts(c) {
  return html`<ul class="statuts" data-anime="cascade">${c.donnees.statuts.map((s, i) => html`<li class="statut">
    <span class="statut-num">${String(i + 1).padStart(2, '0')}</span>
    <h3>${s.titre}</h3>
    <p>${s.texte}</p>
  </li>`)}</ul>`;
}

export function partenaires(c, { titre, noms, id }) {
  const ligne = noms.join(' · ') + ' · ';
  return html`<div class="partenaires">
  <p class="partenaires-titre conteneur">${titre}</p>
  <p class="visuellement-cache">${noms.join(', ')}</p>
  <div class="ruban-section">
    <div class="ruban" id="${id}" data-boucle-css data-ruban aria-hidden="true" data-effet="ruban"><p>${ligne}${ligne}</p></div>
    <button type="button" class="ruban-pause" data-pause-pour="${id}" data-libelle-pause="${c.s('commun.pause')}" data-libelle-lecture="${c.s('commun.lecture')}"><span data-libelle-bouton>${c.t('commun.pause')}</span></button>
  </div>
</div>`;
}

export function listePartenaires(c, { titre, noms }) {
  return html`<div class="partenaires-liste conteneur">
  <h2 class="titre-petit" data-anime="lignes">${titre}</h2>
  <ul data-anime="cascade">${noms.map((n) => html`<li>${n}</li>`)}</ul>
</div>`;
}

export function faq(c, { titre, id = 'faq' }) {
  return html`<section class="faq conteneur" id="${id}">
  <h2 class="titre-section" data-anime="lignes">${titre}</h2>
  <div class="faq-liste">${c.donnees.faq.map((f) => html`<details class="faq-item" data-anime><summary>${f.q}</summary><p>${f.r}</p></details>`)}</div>
</section>`;
}

export function appelFinal(c, { titre, texte = '', action, media, id = 'rendez-vous-final' }) {
  return html`<section class="fin" id="${id}">
  <div class="conteneur fin-grille">
    <div class="fin-texte">
      <h2 class="titre-section" data-anime="lignes">${titre}</h2>
      ${texte ? html`<p data-anime>${texte}</p>` : ''}
      <p class="fin-actions" data-anime>${action}<a class="bouton bouton--contour-clair" href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a></p>
    </div>
    ${media || html`<div class="fin-visuel" data-visuel aria-hidden="true"><svg viewBox="0 0 200 250" data-effet="cle-de-voute"><path class="cv-ext" d="M14 246V104a86 86 0 0 1 172 0v142" pathLength="1"/><path class="cv-int" d="M44 246V106a56 56 0 0 1 112 0v140" pathLength="1"/><path class="cv-sol" d="M0 247h200" pathLength="1"/><path class="cv-cle" d="M88 4h24l-5 26H93z"/></svg></div>`}
  </div>
</section>`;
}
