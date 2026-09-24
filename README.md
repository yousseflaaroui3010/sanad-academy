# Sanad Académie

Parcours de préparation à la soutenance, en français. Il suit d'abord la
présentation `Soutenance_Sanad.pptx`, puis le rapport, et vérifie les faits dans
le code du projet Sanad. Les 19 diapositives principales et les cinq annexes
forment un parcours consultable dans l’ordre, avec un exercice facultatif
par leçon. « Passer » avance sans compter la leçon comme maîtrisée.
Chaque leçon possède un schéma, une carte mentale, une chronologie ou un
graphique adapté à son sujet. Les données des graphiques proviennent du
rapport et des rapports d'évaluation du projet, pas d'une simulation.

Le bouton **Mode côte à côte** réduit la page au schéma et à ses trois
repères : diapositive, section du rapport et fonctions du code. Les schémas
des diapositives 5, 7–11, 14 et des annexes 20, 22–24 ouvrent chaque étape
pour montrer le comportement réel et le fichier qui le porte. La recherche
dans le code a été croisée avec `codebase-memory-mcp` ; les figures sont
vérifiées dans `origin/main` après la fusion #157. Les résultats v3.1.0
précèdent cette fusion et ne constituent pas une évaluation des figures.

## Lancer

```sh
npm ci
npm run dev
```

`npm run build` vérifie les types et prépare les fichiers servis par `node
server.js`. `npm run lint` vérifie le code. Le site publié sur Railway est
alimenté par un déploiement depuis cette copie locale, et non par une liaison
automatique avec GitHub.

Les anciens cours, le laboratoire, l'accès Gemini et les narrations audio ont
été retirés. Le nouveau parcours n'utilise ni clé API ni service de modèle.

## Defense Path (English)

The header switch opens a second section: 19 lessons from the big picture to the code, each with the technical words explained first, an everyday story, a diagram, and gates. Gate answers are graded by the same server-side coach (`POST /api/coach/grade`, `GEMINI_API_KEY`); their hidden model answers live in `coach/pathExercises.js` and `npm run build` checks they match the questions in `src/data/defensePath.ts`. Progress for this section is kept in the browser.
