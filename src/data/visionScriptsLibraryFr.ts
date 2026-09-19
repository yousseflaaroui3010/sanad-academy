// Scripts de visite guidée visuelle par diapositive en Français (Super facile et vivant)
export interface SlideVisionScriptFr {
  slideId: string;
  spokenScript: string;
  visualHighlights: string[];
}

export const SLIDE_VISION_SCRIPTS_FR: Record<string, Record<string, SlideVisionScriptFr>> = {
  // Lesson 1.1: Deux Architectes & Règle 5 de Revue
  '1-1': {
    metaphor: {
      slideId: 'metaphor',
      spokenScript: "Salut ! Regarde bien ce cockpit de chasseur F-16 sur ton écran ! Dans l'aviation, un pilote de combat ne vole jamais seul pour les missions critiques. À l'avant, YL tient les commandes et le code. À l'arrière, MB surveille le radar et les règles de droit. Regarde les deux verrous : aucun des deux ne peut valider le code sans que l'autre tourne sa clé en même temps. C'est ça, la Règle 5 !",
      visualHighlights: ["Cockpit F-16 biplace", "Viseur YL", "Viseur MB", "Matrice à double clé"]
    },
    situation: {
      slideId: 'situation',
      spokenScript: "Regarde la diapo 2 ! C'est ce qu'on appelle la Salle de Crise. Imagine : la soutenance académique approche à grands pas, le compte à rebours tourne ! Si quelqu'un envoie du code bâclé sans le vérifier, l'intelligence artificielle va inventer de faux articles de loi devant le jury. Ça met la pression ! C'est exactement pour ça qu'il faut des règles strictes.",
      visualHighlights: ["Contexte réel à gauche", "Pression à droite", "Échéance de soutenance"]
    },
    solution: {
      slideId: 'solution',
      spokenScript: "La diapo 3 te dévoile notre formule secrète ! YL s'occupe du moteur et de la base de données SQLite, pendant que MB vérifie les codes juridiques marocains et note les réponses. Pas de coup de tête en solitaire ! Si on modifie l'architecture, les deux coéquipiers doivent signer l'accord.",
      visualHighlights: ["Protocole de validation Règle 5", "Répartition claire des rôles", "Zéro code improvisé"]
    },
    artifact: {
      slideId: 'artifact',
      spokenScript: "Regarde la diapo 4 ! Voilà à quoi ressemble le vrai développement sur GitHub ! Tu vois les coches vertes ? C'est notre robot qui confirme que les 42 tests unitaires ont réussi ! Et regarde la boîte avec le nom de MB : tant que MB ne clique pas sur 'Approuver', le gros bouton vert reste verrouillé. Clique sur 'Merge pull request' pour voir la fusion en direct !",
      visualHighlights: ["Écran GitHub PR #42", "Tests CI au vert", "Approbation Règle 5", "Bouton de fusion interactif"]
    },
    alternative: {
      slideId: 'alternative',
      spokenScript: "La diapo 5 propose un curseur interactif. Fais-le glisser avec ta souris ! Si tu vas tout à gauche vers la vitesse pure, tu avances vite au début, mais tu casses tout et le système plante. Au milieu, prendre juste 15 minutes pour vérifier le travail de l'autre évite des journées entières de panique plus tard !",
      visualHighlights: ["Curseur Dilemme de l'Architecte", "Vitesse vs Sécurité", "L'Alternative Déconseillée"]
    },
    quiz: {
      slideId: 'quiz',
      spokenScript: "C'est l'heure du mini-quiz en un clic ! Lis bien la question sur ton écran : Quand est-ce qu'une modification peut être fusionnée dans la branche principale selon la Règle 5 ? Clique sur la bonne réponse pour débloquer tes points !",
      visualHighlights: ["Quiz interactif", "Validation instantanée", "Récompense XP"]
    },
    mastery: {
      slideId: 'mastery',
      spokenScript: "Voici la règle d'or absolue de ce chapitre : 'Vole toujours avec un copilote ! Deux paires d'yeux protègent l'IA et stoppent les erreurs avant qu'elles n'arrivent.' Clique sur 'Valider le Chapitre', et passons à la suite !",
      visualHighlights: ["Règle Inviolable", "Bouton de Maîtrise", "Chapitre Suivant"]
    }
  },

  // Lesson 1.2: Architecture à 10 000 Pieds
  '1-2': {
    metaphor: {
      slideId: 'metaphor',
      spokenScript: "Regarde la diapo 1 ! Admire ce tapis roulant d'usine futuriste ! Les fichiers glissent sous un laser cyan éclatant. Ce laser scanne l'empreinte numérique en une milliseconde. Si le document n'a pas bougé d'un poil, il passe directement sans consommer d'énergie. Hop ! Traitement instantané !",
      visualHighlights: ["Tapis roulant d'usine", "Laser SHA-256", "Contournement en 1ms", "Aiguillage automatique"]
    },
    situation: {
      slideId: 'situation',
      spokenScript: "Sur la diapo 2, voici le défi majeur. Les entreprises ont des documents confidentiels qu'elles ne peuvent absolument pas envoyer sur des serveurs publics en ligne. Envoyer le Code du travail marocain sur le cloud risquerait de violer la Loi 09-08. Il fallait un cerveau qui tourne directement sur la machine locale !",
      visualHighlights: ["Confidentialité locale d'abord", "Respect Loi 09-08", "Risques de fuites sur le Cloud"]
    },
    solution: {
      slideId: 'solution',
      spokenScript: "La diapo 3 présente nos quatre briques Lego ! Un serveur web rapide appelé FastAPI, une armoire de rangement SQLite, un moteur de recherche ultra-précis appelé Qdrant, et le cerveau d'intelligence artificielle LangGraph. Comme chaque brique est indépendante, tu peux en changer une sans faire tomber toute la tour !",
      visualHighlights: ["4 Piliers découplés", "FastAPI + SQLite WAL", "Base vectorielle Qdrant", "Isolation hexagonale"]
    },
    artifact: {
      slideId: 'artifact',
      spokenScript: "Regarde la diapo 4 ! Voici notre ligne de production en direct ! Vois comme les impulsions de données circulent de gauche à droite. Les documents arrivent, sont scannés au laser, découpés en morceaux, et l'IA inspecte chaque preuve avant d'afficher la réponse finale !",
      visualHighlights: ["Câble de données animé SVG", "Impulsions en mouvement", "6 Stations de production", "Infobulles d'inspection"]
    },
    alternative: {
      slideId: 'alternative',
      spokenScript: "La diapo 5 montre ce qui se passe quand on choisit la facilité trompeuse. Créer une simple interface vers un chatbot cloud paraît facile pendant cinq minutes, jusqu'à ce qu'on reçoive des factures exorbitantes et qu'on réalise que les données privées sont parties à l'étranger. Pas question !",
      visualHighlights: ["Comparaison wrapper cloud", "Inflation des coûts", "Inconvénients du verrouillage fournisseur"]
    },
    quiz: {
      slideId: 'quiz',
      spokenScript: "C'est l'heure du quiz rapide ! Pourquoi Sanad utilise-t-il à la fois SQLite et Qdrant plutôt qu'une seule base de données ? Fais ton choix sur l'écran !",
      visualHighlights: ["Quiz Double Stockage", "Spécialisation relationnelle vs vectorielle"]
    },
    mastery: {
      slideId: 'mastery',
      spokenScript: "Garde bien cette règle en tête : 'Garde ton stockage, ta recherche et ton cerveau d'IA dans des pièces séparées ! Quand tout est bien ordonné, ton système reste privé, ultra-rapide et indestructible.' Valide le chapitre !",
      visualHighlights: ["Règle Inviolable", "Point de validation"]
    }
  },

  // Lesson 1.3: La Règle d'Or du RAG
  '1-3': {
    metaphor: {
      slideId: 'metaphor',
      spokenScript: "Regarde la diapo 1 ! Pense à Sanad comme à une visite dans une grande bibliothèque ancienne. Tu vois le tiroir en chêne à gauche ? Il contient de petites fiches de 500 lettres qui t'indiquent l'emplacement en deux secondes. Une fois la fiche trouvée, tu vas vers l'étagère à droite pour lire le grand livre relié en cuir. Cherche la petite fiche, lis tout le grand chapitre !",
      visualHighlights: ["Tiroir en chêne", "Extrait enfant de 500 caractères", "Grande étagère", "Contexte parent de 4 000 caractères"]
    },
    situation: {
      slideId: 'situation',
      spokenScript: "La diapo 2 explique pourquoi deviner est dangereux. Imagine un responsable RH qui pose une question sur les préavis de licenciement. Si l'IA invente un mauvais chiffre, les employés sont lésés et l'entreprise se retrouve au tribunal ! Dans le monde réel, deviner coûte très cher !",
      visualHighlights: ["Responsabilité juridique", "Zéro tolérance à l'hallucination"]
    },
    solution: {
      slideId: 'solution',
      spokenScript: "La diapo 3 dévoile notre règle de l'examen à livre ouvert ! Il est interdit à l'IA d'inventer des citations. C'est le code Python qui va directement sur le disque de l'ordinateur pour extraire la page exacte et le numéro d'article. Chaque affirmation a son ticket de caisse !",
      visualHighlights: ["Preuves de citation par code", "Vérification sur disque Python", "Cartes sources cliquables"]
    },
    artifact: {
      slideId: 'artifact',
      spokenScript: "La diapo 4 te permet de regarder sous le capot avec notre Inspecteur de Code ! Regarde la boîte rouge à gauche : le prompt bâclé demande à l'IA d'inventer un article. Regarde la boîte verte à droite : Python attache la véritable preuve directement depuis le disque !",
      visualHighlights: ["Inspecteur d'Architecture de Code", "Prompt naïf halluciné", "Code d'exécution vérifié Sanad"]
    },
    alternative: {
      slideId: 'alternative',
      spokenScript: "La diapo 5 aborde le grand dilemme : être trop bavard ou être rigoureux. Les chatbots ordinaires veulent plaire à tout prix, alors ils inventent des histoires quand ils ne savent pas. Sanad est un ami honnête : si la preuve n'est pas dans tes fichiers, il dit 'Je ne sais pas' !",
      visualHighlights: ["Dilemme Servabilité vs Vérité", "Bavardage vs Rigueur de vérification"]
    },
    quiz: {
      slideId: 'quiz',
      spokenScript: "Question rapide : Qui rédige véritablement la carte de citation source dans Sanad ? Touche la bonne réponse sur ton écran !",
      visualHighlights: ["Quiz Traçabilité de Citation", "Validation instantanée"]
    },
    mastery: {
      slideId: 'mastery',
      spokenScript: "Notre règle d'or pour toujours : 'Ne devine jamais. Prouve toujours ! Un Je ne sais pas honnête vaut mille mensonges pleins d'assurance.' Clique sur Valider et célébrons cette étape !",
      visualHighlights: ["Règle Inviolable", "Validation du chapitre"]
    }
  }
};
