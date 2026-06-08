# Axiome

**Axiome** est une plateforme interactive, en français, pour **apprendre, comprendre et faire des mathématiques** — de la **préparation au CP** jusqu'au **doctorat**. On part toujours de zéro : une intuition imagée, puis le cours formel (définitions, théorèmes, formules), des schémas interactifs, et des dizaines d'exercices corrigés dont la difficulté monte tout doucement. Le but : une plateforme aussi exigeante (viser 20/20) qu'accessible — tout l'inverse de l'élitisme.

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

> Le contenu s'étoffe niveau par niveau ; le module **Éveil / préparation au CP** est le premier servi.

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
├── public/             # favicon
├── deploy/             # exemple de reverse proxy
├── Dockerfile
├── docker-compose.yml
└── httpd-maths.conf    # config Apache du conteneur (port, compression, cache, SPA)
```

# IA / LLM

Ce projet a été généré par Claude. Le dev web et l'UI, c'est pas trop mon truc.

Pull requests par IA acceptées.
