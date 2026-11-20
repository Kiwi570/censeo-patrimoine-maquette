/* Effets propres à Censeo Patrimoine (direction « La rue dorée »). Le socle gère l'ouverture, le voile (rideau),
   l'en-tête, le menu, les mesures et la bibliothèque d'effets (lignes, cascade, rideau, parallaxe, zoom, trace…).
   Effets du plan, chacun marqué data-effet dans les pages :
   - arche          : la photo d'ouverture de l'accueil, dans une arche qui s'élargit au défilement
   - bandeau-leve   : le bandeau de l'offre financière s'ouvre et se lève
   - recul, calque-nuit : l'ouverture plein cadre de l'offre immobilière recule, son calque bleu nuit s'efface
   - millesime      : « 2004 » se remplit d'or (un peu à l'arrivée, le reste au défilement)
   - porte          : les deux battants de la porte cochère s'ouvrent à l'arrivée sur la page Contact
   - assises        : les pierres du patrimoine se posent une à une, de la fondation à la clé
   - demembrement   : l'usufruit s'éteint, la nue-propriété devient pleine propriété
   - deux-mains     : gestion directe et sous mandat se rejoignent
   - cle-de-voute   : l'arche de l'appel final se trace, la clé de voûte tombe en place
   - ruban          : les partenaires défilent (bouton pause) */
import { demarrer, versObjet, quand } from './socle/index.js?v=1';

const gsap = window.gsap;
const ST = window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Ouverture de chaque page (après l'intro, ou pendant le retrait du voile) ---------- */
function animerOuverture(tl, t0) {
  const h1 = $('.ouv-titre');
  const lignes = $$('.ouv-ligne');
  const suite = $$('.ouv-suite');
  if (h1) tl.set(h1, { opacity: 1 }, t0);
  if (lignes.length) tl.fromTo(lignes, { y: 0, yPercent: 135 }, { y: 0, yPercent: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out' }, t0);
  if (suite.length) tl.fromTo(suite, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power2.out' }, t0 + 0.12);
  const place = $('.ouv-arche-place');
  if (place) tl.fromTo(place, { '--trait': 0 }, { '--trait': 1, duration: 1.1, ease: 'power2.inOut' }, t0 - 0.05);
  const or = $('.millesime-or');
  if (or) tl.fromTo(or, { '--a': 0 }, { '--a': 1, duration: 0.9, ease: 'power2.out' }, t0);
  const battants = $$('.battant');
  if (battants.length) tl.fromTo(battants, { xPercent: 0 }, { xPercent: (i) => (i ? 101 : -101), duration: 1.05, ease: 'power3.inOut' }, t0 - 0.1);
  return tl;
}

/* ---------- Effets liés au défilement ---------- */
function effetsOuverture() {
  const arche = $('.ouv-arche');
  if (arche) {
    gsap.timeline({ scrollTrigger: { trigger: '.ouv--accueil', start: 'top top', end: 'bottom top', scrub: 0.6 } })
      .fromTo('.ouv-arche-place', { '--a': 1, y: 0 }, { '--a': 0.06, y: 70, ease: 'none' }, 0)
      .fromTo($('img', arche), { scale: 1.08 }, { scale: 1, ease: 'none' }, 0);
  }
  /* Après l'ouverture, l'arche vit seule : la photo respire, une lumière dorée glisse sur la pierre (rue dorée). */
  const lumiere = $('.ouv-arche-lumiere');
  if (arche && lumiere) {
    const vie = gsap.timeline({ paused: true, repeat: -1, delay: 0.4 });
    vie.fromTo($('picture', arche), { scale: 1, xPercent: 0 }, { scale: 1.07, xPercent: -1.5, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0)
      .fromTo($('.ouv-arche-reflet', lumiere), { xPercent: 0 }, { xPercent: 420, duration: 4.2, ease: 'power1.inOut' }, 1.2);
    let lancee = false;
    const jouerVie = () => {
      if (lancee) return; lancee = true;
      ST.create({ trigger: '.ouv--accueil', start: 'top bottom', end: 'bottom top', onToggle: (st) => (st.isActive ? vie.play() : vie.pause()) });
      if (window.scrollY < window.innerHeight) vie.play();
    };
    quand('pret', jouerVie);
    quand('retour', jouerVie);
  }
  const bandeau = $('.ouv-bandeau-media');
  if (bandeau) {
    gsap.timeline({ scrollTrigger: { trigger: '.ouv--bandeau', start: 'top top', end: 'bottom top', scrub: 0.6 } })
      .fromTo(bandeau, { clipPath: 'inset(0% 3% 0% 3%)', y: 0 }, { clipPath: 'inset(0% 0% 0% 0%)', y: -40, ease: 'none' }, 0)
      .fromTo($('img', bandeau), { scale: 1.12 }, { scale: 1, ease: 'none' }, 0);
  }
  const plein = $('.ouv-plein-image');
  if (plein) {
    gsap.timeline({ scrollTrigger: { trigger: '.ouv--plein', start: 'top top', end: 'bottom top', scrub: 0.6 } })
      .fromTo($('img', plein), { scale: 1.14 }, { scale: 1, ease: 'none' }, 0)
      .fromTo('.ouv-plein-calque', { opacity: 0.2 }, { opacity: 0, ease: 'none' }, 0);
  }
  const or = $('.millesime-or');
  if (or) {
    gsap.fromTo(or, { '--b': 0 }, { '--b': 1, ease: 'none', scrollTrigger: { trigger: '.ouv--millesime', start: 'top top', end: 'bottom 30%', scrub: 0.6 } });
  }
}

/* Pierre à pierre : de la fondation (rang 0) à la clé (rang 4). Cadre collant sur grand écran, pierres posées
   au rythme du défilement ; ailleurs, posées une à une quand le mur entre à l'écran. Pas de fondu d'opacité :
   une découpe qui descend et un léger glissement (le texte n'est jamais à moitié transparent). */
function assises() {
  const mur = $('.mur');
  if (!mur) return;
  const pierres = $$('.pierre', mur).sort((a, b) => +a.dataset.rang - +b.dataset.rang);
  const depart = { clipPath: 'inset(0% 0% 100% 0%)', y: -26 };
  const arrivee = { clipPath: 'inset(0% 0% 0% 0%)', y: 0 };
  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px) and (min-height: 640px)', () => {
    /* Le mur commence à se bâtir avant que le cadre ne colle : jamais d'écran vide. */
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.pierres', start: 'top 70%', end: 'bottom bottom', scrub: 0.5 } });
    pierres.forEach((p, i) => tl.fromTo(p, depart, { ...arrivee, duration: 0.11, ease: 'power2.out' }, i * 0.1));
    tl.to({}, { duration: 0.1 });
  });
  mm.add('(max-width: 900px), (max-height: 639px)', () => {
    gsap.fromTo(pierres, depart, { ...arrivee, duration: 0.7, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: mur, start: 'top 82%', once: true } });
  });
}

function demembrement() {
  const barre = $('.demembrement-barre');
  if (!barre) return;
  gsap.timeline({ scrollTrigger: { trigger: '.demembrement', start: 'top 78%', end: 'bottom 45%', scrub: 0.6 } })
    .fromTo(barre, { '--t': 0 }, { '--t': 1, ease: 'none', duration: 1 }, 0)
    .fromTo(barre, { '--pleine': 0 }, { '--pleine': 1, ease: 'none', duration: 0.18 }, 0.82);
}

function deuxMains() {
  const a = $('.main--direct'), b = $('.main--mandat');
  if (!a || !b) return;
  const st = { trigger: '.deux-mains', start: 'top bottom', end: 'center 55%', scrub: 0.6 };
  const d = window.matchMedia('(max-width: 760px)').matches ? 18 : 56;
  gsap.fromTo(a, { x: -d }, { x: 0, ease: 'none', scrollTrigger: st });
  gsap.fromTo(b, { x: d }, { x: 0, ease: 'none', scrollTrigger: { ...st } });
}

function cleDeVoute() {
  const svg = $('[data-effet="cle-de-voute"]');
  if (!svg) return;
  gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 85%', once: true } })
    .fromTo($$('.cv-ext, .cv-sol', svg), { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'power2.inOut', duration: 1.2 }, 0)
    .fromTo($('.cv-int', svg), { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'power2.inOut', duration: 1 }, 0.25)
    .fromTo($('.cv-cle', svg), { y: -70 }, { y: 0, ease: 'bounce.out', duration: 0.7 }, 1.15);
}

/* ---------- Formulaire de rendez-vous (module formulaire-par-etapes de la bibliothèque) ---------- */
async function rendezVous() {
  const racine = $('[data-module="formulaire-par-etapes"]');
  if (!racine) return;
  const objet = new URLSearchParams(location.search).get('objet');
  if (objet) { const r = $(`input[name="objet"][value="${CSS.escape(objet)}"]`, racine); if (r) r.checked = true; }
  const { init } = await import('./modules/formulaire-par-etapes.js?v=1');
  await init(racine, { sujet: 'Demande de rendez-vous' });
  /* Après l'envoi simulé, le message de fin revient à l'écran (sur téléphone il peut rester en dessous). */
  racine.addEventListener('formulaire:envoye', () => {
    const fin = $('.fpe__fin', racine);
    if (fin) setTimeout(() => fin.scrollIntoView({ block: 'center' }), 80);
  });
}

demarrer({
  preparer() {
    if (!gsap || !ST) return;
    effetsOuverture();
    assises();
    demembrement();
    deuxMains();
    cleDeVoute();
    rendezVous();
  },
  /* Intro (2,3 s) : l'arche d'or se trace, la clé de voûte se pose, CĒNSEŌ monte et la lumière le balaie,
     « j'estime » se pose ; puis l'arche glisse jusqu'à l'objet d'ouverture de la page et le panneau s'ouvre
     en cercle depuis lui (versObjet) ; le titre de la page monte pendant l'ouverture. */
  jouer() {
    if (!gsap) return null;
    const P = $('[data-ouverture]');
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (P) {
      tl.fromTo($$('.arche-ext, .arche-sol', P), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 0.05)
        .fromTo($('.arche-int', P), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, 0.18)
        .fromTo($('.arche-cle', P), { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2.2)' }, 0.55)
        .fromTo('.ouverture-nom', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.55 }, 0.12)
        .fromTo('.ouverture-nom', { backgroundPosition: '100% 0%' }, { backgroundPosition: '0% 0%', duration: 0.85, ease: 'power2.inOut' }, 0.28)
        .fromTo('.ouverture-ligne', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.48)
        .to('.ouverture-nom, .ouverture-ligne', { opacity: 0, duration: 0.22, ease: 'power1.in' }, 0.92);
    }
    versObjet(tl, { a: 1.0 });
    animerOuverture(tl, 1.42);
    return tl;
  },
  /* État final (retour arrière, secours) : tout est en place, sans animation. */
  etatFinal() {
    if (!gsap) return;
    gsap.set('.ouv-titre, .ouv-suite', { opacity: 1, y: 0 });
    gsap.set('.ouv-ligne', { y: 0, yPercent: 0 });
    gsap.set('.ouv-arche-place', { '--trait': 1 });
    gsap.set('.millesime-or', { '--a': 1 });
    $$('.battant').forEach((b, i) => gsap.set(b, { xPercent: i ? 101 : -101 }));
  },
  /* Arrivée par un lien interne : l'ouverture de la page se joue pendant que le voile se retire. */
  arrivee() {
    if (!gsap) return;
    animerOuverture(gsap.timeline(), 0.08);
  },
});
