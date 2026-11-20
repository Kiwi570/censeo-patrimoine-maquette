# Censeo Patrimoine — maquette v1

Maquette de démonstration du futur site de **Censeo Patrimoine**, le cabinet de conseil en gestion de patrimoine de Jean-Marie Kassigian (10 rue de la Loge, Montpellier).
Adresse prévue : https://censeo-patrimoine-maquette.vercel.app

Direction artistique « La rue dorée » : la pierre blonde de l'Écusson, du bleu nuit et un or doux. Censeo veut dire « j'estime » en latin, et la rue de la Loge s'appelait au Moyen Âge la « rue dorée ». Le patrimoine se bâtit pierre à pierre.

Pages : accueil, offre financière, offre immobilière, le cabinet, contact (demande de rendez-vous simulée), 404.

## À fournir par le client

| Élément | Où | État |
|---|---|---|
| Mentions légales : raison sociale, capital, RCS Montpellier 477 693 097, TVA FR42477693097, directeur de la publication, hébergeur (Vercel Inc., adresse à vérifier sur vercel.com au moment de la mise en ligne) | pied de page | à compléter |
| Politique de confidentialité (RGPD) : données du formulaire, finalité, durée de conservation, droits, délégué à la protection des données | pied de page, formulaire de contact | à compléter |
| Assurance responsabilité civile professionnelle : le site actuel cite deux références différentes (Aon, FN4448 via l'Anacofi, et Zurich, police 740 0026945) | page Le cabinet | à confirmer |
| Document d'entrée en relation à jour : daté et signé ; médiateur de l'AMF (Rémi Bouchez depuis le 1er décembre 2025, et non plus Marielle Cohen-Branche) | page Le cabinet | à mettre à jour |
| Horaires d'ouverture du cabinet | contact | non affichés faute d'information |
| Photos réelles : bureau, façade du 10 rue de la Loge, portrait récent en bonne définition | accueil, cabinet, contact | à fournir pour remplacer les illustrations générées |
| Logo : le site actuel n'en a pas en image ; un logo typographique (arche et « Censeo patrimoine ») a été dessiné pour la maquette | partout | à valider |
| Confirmation de l'anecdote de la « rue dorée » (nom médiéval de la rue de la Loge, orfèvres, loge des marchands) | accueil | à confirmer |
| Crédits des illustrations générées | pied de page | voir ci-dessous |

### Retiré ou remplacé faute d'information, ou pour respecter la réglementation

- **Rendements chiffrés** du site actuel (SCPI « +9,5 %/an », « supérieur à 5 % », immobilier américain « 6 à 10 % net », TRI de 10,87 % en nue-propriété, décote de 40 %) : retirés. Ils n'avaient ni source, ni date, ni avertissement de risque (règlement général de l'AMF, art. 325-12). Si le client veut des exemples, il faudra des simulations datées, sourcées, marquées « non contractuel », avec les avertissements.
- **Mot-clé « conseiller indépendant »** : jamais repris. Le document d'entrée en relation indique un conseil **non indépendant**, ce que la maquette explique.
- **ISF** (remplacé par l'IFI en 2018), **PERCO** (remplacé par le PER collectif), taux d'emprunt de 4,5 %, « euro fort, 23 % moins cher » : références datées, non reprises.
- **Exemples chiffrés** (T2 à Clichy-la-Garenne, maison d'Orlando à 95 000 $) : non repris.
- **Texte de saisie oublié** sur l'accueil actuel (« fgh », « hfdfdfgd rtrthfgfgd ») : à supprimer du site actuel.
- **Accès** : seul l'arrêt de tramway Comédie est cité ; lignes, parkings et horaires à confirmer.

## Illustrations générées

Toutes les images marquées « Illustration générée » ont été créées avec Grok (intelligence artificielle) : aucune ne montre un vrai lieu, un vrai bien ou une vraie personne du cabinet. **La mention doit rester sur le site final** tant que ces images y figurent. Seule vraie photo du client : le portrait de Jean-Marie Kassigian, repris du site actuel.

## À la mise en ligne définitive

À retirer : la consigne `noindex` (balise robots dans `source/gabarits/commun.mjs`, en-tête X-Robots-Tag dans `vercel.json`), le formulaire simulé (brancher un vrai envoi), les mentions « à compléter » du pied de page (remplacer par les vraies pages), le schéma « illustratif » du démembrement si le client préfère un exemple réel conforme.
À garder : la mention « Illustration générée », l'avertissement « risque de perte en capital » en bas des pages, les statuts (CIF, ORIAS, courtier) et la mention « conseil non indépendant ».

## Technique

Site statique (HTML, CSS, JavaScript), sans étape de construction. Les pages sont générées depuis `donnees/` par `node outils/generer.mjs` : ne jamais modifier les `.html` à la main. Polices hébergées (Instrument Serif, Hanken Grotesk). GSAP pour les animations. Formulaire en étapes : module de la bibliothèque des maquettes.
