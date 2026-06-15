# Axiome

**Axiome** est une plateforme interactive, en français, pour **apprendre, comprendre et faire des mathématiques** — de la **préparation au CP** jusqu'au **doctorat**. On part toujours de zéro : une intuition imagée, puis le cours formel (définitions, théorèmes, formules), des schémas interactifs, et des dizaines d'exercices corrigés dont la difficulté monte tout doucement. Le but : une plateforme aussi exigeante (viser 20/20) qu'accessible — tout l'inverse de l'élitisme. Chaque niveau scolaire est aligné sur les **programmes officiels** (Bulletin officiel de l'Éducation nationale) et la pédagogie s'inspire de la **méthode de Singapour** : toutes ces références sont listées, avec leurs liens officiels, dans [`docs/SOURCES.md`](#fondements).

C'est une application web statique (**React + Vite**), servie par **Apache** dans un conteneur **Docker**.

## Liens

- **Application en ligne** : [maths.kingdown.fr](https://maths.kingdown.fr)
- **Site de l'association KingDown** : [universe.kingdown.fr](https://universe.kingdown.fr)
- **Discord** : [discord.gg/kingdown](https://discord.gg/kingdown)
- **Fluxer** : [fluxer.gg/4opC2oyR](https://fluxer.gg/4opC2oyR)

## Fonctionnalités

- **Deux axes.** Sept **niveaux** (éveil → primaire → collège → lycée → licence → master → doctorat) croisés avec une dizaine de **champs** (nombres, algèbre, géométrie, analyse, probabilités & statistiques, logique, combinatoire, topologie, mathématiques appliquées, catégories).
- **Cours à plusieurs profondeurs.** Chaque leçon a une *intuition* (« comme si tu partais de zéro »), un cours en trois niveaux de lecture (**Découverte / Standard / Avancé**), un encart **« Pourquoi ? »** et des exemples corrigés pas à pas.
- **Exercices à 5 paliers** (Découverte → Échauffement → Application → Défi → Examen), corrigés révélables, complétés par des **générateurs auto-corrigés** pour s'entraîner à volonté.
- **Formules en KaTeX** et **briques interactives** : traceur de courbes (avec tangente), géométrie à points déplaçables, droite numérique, cadre de dix, formes, motifs…
- **Progression « ultra douce ».** Un graphe de **prérequis** débloque les leçons et propose l'étape suivante ; la progression est sauvegardée localement.
- **Conçu pour grandir.** Moteur de rendu **générique** + contenu en **modules de données** + **registre de champs** : ajouter une leçon ou un champ entier = ajouter de la donnée, sans toucher au moteur.
- Interface sombre, responsive (desktop + mobile).

> Le contenu couvre tous les niveaux, de l'**éveil** au **doctorat**, et continue de s'enrichir leçon par leçon — chaque niveau scolaire restant calé sur le programme officiel correspondant.

## Fondements

Axiome ne sort pas de nulle part : **tout son contenu s'appuie sur un corpus de références officielles**, listées avec leurs liens officiels dans [`docs/SOURCES.md`](docs/SOURCES.md). Pour des raisons de licence, ces documents ne sont **pas redistribués** dans le dépôt — le syllabus de Singapour est en usage personnel et non commercial, et les ressources françaises portent la mention « © Ministère de l'Éducation nationale ». `SOURCES.md` **pointe donc vers chaque original officiel**. Deux piliers.

### La méthode de Singapour

Le *Primary Mathematics Syllabus* (P1 → P6) du ministère de l'Éducation de Singapour ([page officielle](https://www.moe.gov.sg/primary/curriculum/syllabus)) est l'inspiration pédagogique d'Axiome : un enseignement centré sur la **résolution de problèmes** et une montée **du concret vers l'abstrait**. Cette progression se retrouve directement dans les **trois profondeurs** de chaque cours :

- **Découverte** — manipuler, « avec les mains » (concret) ;
- **Standard** — se représenter, « en image » (imagé) ;
- **Avancé** — formaliser, « dans la tête » (abstrait).

C'est aussi ce qui justifie la progression « ultra douce » : on part toujours d'une intuition concrète avant d'aller vers la formule.

### Les programmes officiels français

Les **programmes du Bulletin officiel** (Éducation nationale) et leurs **documents d'accompagnement**, recensés par cycle dans [`docs/SOURCES.md`](docs/SOURCES.md), fixent pour chaque niveau les notions enseignées, leur ordre et les attendus — c'est la colonne vertébrale du contenu scolaire d'Axiome.

| Cycle | Niveau Axiome | Contenu |
| --- | --- | --- |
| Cycle 1 — maternelle | Éveil | programme du cycle 1, livrets d'accompagnement (avant 4 ans, à partir de 4 ans, à partir de 5 ans), guide « construire le nombre à l'école maternelle », séquence « construire la bande numérique jusqu'à 10 » |
| Cycle 2 — CP–CE2 | Primaire (CP–CE2) | programme du cycle 2 + livrets d'accompagnement CP, CE1, CE2 |
| Cycle 3 — CM1–6ᵉ | Primaire / Collège | programme du cycle 3 + livret d'accompagnement 6ᵉ |
| Cycle 4 — 5ᵉ–3ᵉ | Collège | programme du cycle 4 + guide « résolution de problèmes au collège » |
| Lycée GT | Lycée | seconde générale et technologique, spécialité maths (1ʳᵉ et terminale), maths complémentaires, maths expertes, maths dans l'enseignement scientifique, voie technologique |
| Voie professionnelle | Lycée professionnel | programmes de mathématiques de la voie professionnelle |
| Prépa / agrégation | Licence et au-delà | programmes de prépa MPSI/MP2I et MP/MPI, et programme de l'**agrégation** externe de mathématiques (sessions 2025 et 2026) |

Concrètement, chaque leçon d'un niveau scolaire est **calée sur les notions et la progression du programme correspondant** (liens dans `docs/SOURCES.md`). Les niveaux **master** et **doctorat**, qui n'ont pas de programme national, prolongent cet édifice vers les standards de la recherche : cours fondamentaux de M1/M2, puis problèmes ouverts (les sept problèmes du millénaire) et séminaires avancés (portes de recherche).

## Développement

Prérequis : **Node.js 20+**.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # bundle statique dans dist/
npm run preview    # prévisualise le build de production (port 4242)
```

## Tests

```bash
npm test           # valide le contenu (schéma des leçons), la logique
                   # (correcteur, graphe de prérequis) et le rendu serveur (SSR)
```

## Déploiement (Docker)

L'image construit le bundle puis le sert avec Apache (`httpd:2.4-alpine`) sur le port **4242**.

```bash
docker compose up -d --build
curl -I http://127.0.0.1:4242/      # doit renvoyer 200
```

Par défaut, le conteneur est lié à `127.0.0.1:4242` (non exposé publiquement) — idéal derrière un reverse proxy. Pour un accès direct depuis le LAN, remplacer le mapping par `"4242:4242"` dans `docker-compose.yml`.

### Derrière un reverse proxy (TLS)

`deploy/reverse-proxy.example.conf` est un exemple de vhost Apache qui termine le TLS et relaie vers le conteneur. Remplacer `maths.example.com` par le domaine voulu et adapter les chemins de certificats. N'importe quel reverse proxy convient (Apache, nginx, Caddy, Traefik…).

## Structure du projet

```
.
├── src/
│   ├── core/           # logique pure : niveaux, champs, paliers, schéma, prérequis, correcteur
│   ├── content/        # le contenu : index.js + lessons/ (un fichier par champ)
│   ├── components/     # rendu générique : Lesson, Nav, Math (KaTeX), exercices, RichText…
│   ├── widgets/        # briques interactives (traceur, géométrie, droite numérique, cadre de dix…)
│   ├── App.jsx         # racine : navigation, accueil, progression
│   ├── main.jsx        # point d'entrée
│   ├── ssr.jsx         # entrée de rendu serveur (tests)
│   ├── api.js          # surface « sans React » (testable hors navigateur)
│   └── index.css       # styles
├── test/               # tests (contenu, logique, rendu SSR)
├── docs/               # SOURCES.md : références officielles (liens) — les PDF ne sont pas versionnés
│   └── SOURCES.md      # méthode de Singapour + programmes du BO, par cycle, avec liens officiels
├── public/             # favicon
├── deploy/             # exemple de reverse proxy
├── Dockerfile
├── docker-compose.yml
└── httpd-maths.conf    # config Apache du conteneur (port, compression, cache, SPA)
```

# IA / LLM

Ce projet a été généré par Claude.

Pull requests par IA acceptées.
