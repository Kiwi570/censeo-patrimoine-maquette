/* Contact : titre et coordonnées tout de suite, porte cochère · demande de rendez-vous en trois étapes (simulée) ·
   venir au cabinet (plan simplifié, itinéraire depuis la Comédie qui se trace). */
import { html, brut } from '../../outils/gabarit.mjs';
import { ouverture } from '../gabarits/blocs.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'grok/contact-porte-784.webp' };

const OBJETS = [
  ['diagnostic', 'Un diagnostic patrimonial', 'Faire le point sur l\'ensemble de votre situation.', '<path d="M6 26V10l10-6 10 6v16z"/><path d="M12 26v-8h8v8"/>'],
  ['placements', 'Des placements financiers', 'Assurance vie, PER, capital investissement…', '<path d="M5 25h22M8 21v-6M14 21V9M20 21v-9M26 21V6"/>'],
  ['portefeuille', 'Une étude de portefeuille', 'Gratuite, sur demande.', '<rect x="5" y="9" width="22" height="16" rx="2"/><path d="M12 9V6h8v3M5 15h22"/>'],
  ['immobilier', 'Un projet immobilier', 'SCPI, nue-propriété, achat, États-Unis…', '<path d="M5 26V13l11-8 11 8v13z"/><path d="M13 26v-7h6v7"/>'],
  ['retraite', 'La retraite ou l\'épargne salariale', 'PER, PEE, épargne retraite collective.', '<circle cx="16" cy="16" r="11"/><path d="M16 9v7l5 3"/>'],
  ['autre', 'Une autre question', 'Fiscalité, prévoyance, réclamation…', '<path d="M6 9h20v13H13l-5 4v-4H6z"/>'],
];

export default (c) => html`
${ouverture(c, {
  apercu: 'grok/contact-porte', modele: 'contact', cle: 'contact',
  action: html`<a class="bouton" href="#rendez-vous" data-sans-transition data-action-principale data-survol="magnetique">${c.t('contact.action')}</a>`,
  secondaire: html`<a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a>`,
  apres: html`<dl class="coordonnees ouv-suite" data-anime="gsap">
    <div><dt>${c.t('contact.telephone')}</dt><dd><a href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a></dd></div>
    <div><dt>${c.t('contact.email')}</dt><dd><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></dd></div>
    <div><dt>${c.t('contact.adresse')}</dt><dd>${c.tb('commun.adresse')}</dd></div>
  </dl>`,
  media: c.media({ nom: 'grok/contact-porte', alt: c.s('contact.alt'), cadrage: '50% 50%', priorite: true, classe: 'ouv-contact-image', sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-fx="parallaxe" data-fx-force="6"' }),
})}

<section class="fpe rdv" id="rendez-vous" data-module="formulaire-par-etapes">
  <div class="conteneur fpe__cadre rdv-grille">
    <div class="fpe__tete">
      <h2 class="titre-section" data-anime="lignes">${c.tb('contact.formulaire.titre')}</h2>
      <p class="fpe__intro" data-anime>${c.t('contact.formulaire.texte')}</p>
      <p class="fpe__note" data-anime>${c.t('commun.statutsCourts')}</p>
    </div>
    <div class="fpe__carton" data-anime>
      <form class="fpe__form" novalidate aria-label="Demande de rendez-vous">
        <div class="fpe__progression">
          <ol class="fpe__reperes" aria-label="Progression"></ol>
          <div class="fpe__barre" aria-hidden="true"><span></span></div>
          <p class="fpe__etat" aria-live="polite"></p>
        </div>
        <fieldset class="fpe__etape" data-etape="Votre demande">
          <legend class="fpe__legende"><h3 class="fpe__titre">Qu'est-ce qui vous amène&nbsp;?</h3></legend>
          <div class="fpe__groupe fpe__cartes" data-libelle="Objet">
            ${OBJETS.map(([v, t, d, ic], i) => html`<label class="fpe__carte"><input type="radio" name="objet" value="${v}"${i === 0 ? html` required` : ''}>
              <svg class="fpe__icone" viewBox="0 0 32 32" aria-hidden="true">${brut(ic)}</svg>
              <span class="fpe__carte-titre">${t}</span><span class="fpe__carte-texte">${d}</span></label>`)}
          </div>
          <fieldset class="fpe__groupe">
            <legend class="fpe__groupe-titre">Où préférez-vous échanger&nbsp;?</legend>
            <div class="fpe__puces">
              <label class="fpe__puce"><input type="radio" name="lieu" value="cabinet" checked><span class="fpe__choix-texte">Au cabinet</span></label>
              <label class="fpe__puce"><input type="radio" name="lieu" value="telephone"><span class="fpe__choix-texte">Par téléphone</span></label>
            </div>
          </fieldset>
          <div class="fpe__champ">
            <label for="rdv-message">Quelques mots sur votre situation</label>
            <textarea id="rdv-message" name="message" rows="4" placeholder="Votre projet, votre échéance, vos questions"></textarea>
          </div>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="Coordonnées">
          <legend class="fpe__legende"><h3 class="fpe__titre">Comment vous joindre&nbsp;?</h3></legend>
          <div class="fpe__grille">
            <div class="fpe__champ"><label for="rdv-prenom">Prénom <i aria-hidden="true">*</i></label><input id="rdv-prenom" name="prenom" autocomplete="given-name" required></div>
            <div class="fpe__champ"><label for="rdv-nom">Nom <i aria-hidden="true">*</i></label><input id="rdv-nom" name="nom" autocomplete="family-name" required></div>
            <div class="fpe__champ"><label for="rdv-email">E-mail <i aria-hidden="true">*</i></label><input id="rdv-email" name="email" type="email" autocomplete="email" required></div>
            <div class="fpe__champ"><label for="rdv-tel">Téléphone</label><input id="rdv-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" pattern="[0-9 +().\\-]{8,20}"></div>
          </div>
          <label class="fpe__case"><input type="checkbox" name="accord" value="oui" required data-libelle="Accord" data-hors-recap><span class="fpe__choix-texte">J'accepte que ces informations servent uniquement à répondre à ma demande. <i aria-hidden="true">*</i></span></label>
          <p class="fpe__aide">${c.t('contact.formulaire.donnees')}</p>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="Récapitulatif" data-recap>
          <legend class="fpe__legende"><h3 class="fpe__titre">Tout est juste&nbsp;?</h3></legend>
          <div class="fpe__recap"><p>Le récapitulatif de vos réponses s'affiche ici.</p></div>
        </fieldset>
        <div class="fpe__nav">
          <button class="fpe__bouton fpe__bouton--ligne" type="button" data-precedent>Retour</button>
          <button class="fpe__bouton" type="button" data-suivant data-retour="Revenir au récapitulatif">Continuer</button>
          <button class="fpe__bouton" type="submit">Envoyer la demande</button>
        </div>
      </form>
      <div class="fpe__fin" hidden>
        <svg class="fpe__coche" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28"/><path d="M20 33l8 8 16-17"/></svg>
        <h3>Merci, votre demande est prête.</h3>
        <p data-resume></p>
        <p>Démonstration&nbsp;: rien n'a été envoyé. Sur le site en ligne, la demande parviendrait au cabinet, qui vous recontacterait.</p>
        <div class="fpe__fin-actions">
          <button class="fpe__bouton fpe__bouton--ligne" type="button" data-recommencer>Nouvelle demande</button>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="acces" id="acces">
  <div class="conteneur acces-grille">
    <div>
      <h2 class="titre-section" data-anime="lignes">${c.tb('contact.acces.titre')}</h2>
      <p data-anime>${c.t('contact.acces.texte')}</p>
      <ul class="atouts" data-anime="cascade"><li>${c.t('contact.acces.tram')}</li><li>${c.t('contact.acces.rdv')}</li><li>${c.tb('commun.adresse')}</li></ul>
    </div>
    <figure class="plan" data-visuel>
      <svg class="plan-svg" viewBox="0 0 600 420" role="img" aria-labelledby="plan-titre" data-fx="trace">
        <title id="plan-titre">${c.t('contact.acces.plan')} : ${c.t('contact.acces.loge')}, de la place de la Comédie aux halles Castellane</title>
        <g class="plan-ilots" aria-hidden="true">
          <path d="M40 60h150l20 80H60z"/><path d="M230 40h120l-10 90H240z"/><path d="M380 50h160l10 110H390z"/>
          <path d="M40 250h130l30 110H50z"/><path d="M220 270h140l-10 110H230z"/><path d="M390 280h150l-20 100H400z"/>
          <path d="M60 180h110l10 40H70z"/><path d="M400 200h70l10 40h-80z"/>
        </g>
        <path class="plan-rue" d="M95 205 C 180 195, 260 225, 330 215 S 440 190, 510 205"/>
        <path class="plan-itineraire" d="M520 340 C 520 290, 515 250, 505 212 C 470 200, 420 212, 330 215" data-fx-trait/>
        <ellipse class="plan-comedie" cx="530" cy="355" rx="46" ry="30"/>
        <circle class="plan-halles" cx="95" cy="205" r="22"/>
        <circle class="plan-jaures" cx="250" cy="212" r="16"/>
        <g class="plan-repere" data-repere transform="translate(330 215)"><circle r="13"/><path d="M-5 4V-2a5 5 0 0 1 10 0v6" fill="none"/></g>
        <text x="330" y="150" class="plan-texte plan-texte--fort" text-anchor="middle">Censeo Patrimoine</text>
        <text x="330" y="186" class="plan-texte" text-anchor="middle">n° 10</text>
        <text x="430" y="266" class="plan-texte" text-anchor="middle">${c.t('contact.acces.loge')}</text>
        <text x="590" y="412" class="plan-texte" text-anchor="end">${c.t('contact.acces.comedie')}</text>
        <text x="20" y="266" class="plan-texte" text-anchor="start">${c.t('contact.acces.castellane')}</text>
        <text x="250" y="252" class="plan-texte plan-texte--petit" text-anchor="middle">${c.t('contact.acces.jaures')}</text>
        <text x="470" y="322" class="plan-texte plan-texte--petit" text-anchor="end">${c.t('contact.acces.tramArret')}</text>
      </svg>
      <figcaption class="plan-legende">${c.t('contact.acces.plan')}</figcaption>
    </figure>
  </div>
</section>
`;
