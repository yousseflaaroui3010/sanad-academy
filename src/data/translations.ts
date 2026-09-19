// Bilingual Localization Dictionary (English & French)
import type { SubLesson, Lesson, Track } from './courseData';

export const UI_TRANSLATIONS = {
  en: {
    academySubtitle: 'Interactive AI Engineering & System Architecture',
    defenseReadiness: 'Defense Readiness',
    certificate: 'Certificate',
    startFresh: 'Start Fresh',
    curriculum: 'Curriculum',
    sandboxLab: 'Sandbox Lab',
    searchSpecs: 'Search specs...',
    current: 'Current:',
    next: 'Next:',
    conquered: 'Conquered',
    left: 'left',
    done: 'done',
    learningTrail: 'Learning Trail',
    completedCount: 'Completed',
    interactiveLesson: 'Interactive Lesson',
    keynoteSlides: 'Keynote Slides Mode',
    geminiVision: 'Gemini Vision',
    aiTutor: 'AI Tutor',
    studioVoiceover: 'Studio Voiceover',
    clickPlayToListen: 'Click play to listen',
    currentlySpeaking: 'Currently Speaking 🎙️',
    realWorldMetaphor: 'The Real-World Metaphor',
    realCircumstance: 'The Real Circumstance',
    highPressure: 'The High Pressure',
    howSanadSolved: 'How Sanad Solved It',
    alternativeRoad: 'The Alternative Road',
    ruleToRemember: 'Rule to Remember',
    completeAndNext: 'Complete & Next',
    continueNext: 'Continue Next',
    completed: 'Completed!',
    back: 'Back',
    enterFullscreen: 'Enter Fullscreen ⛶',
    livePipeline: 'Live Interactive Architecture Pipeline',
    pipelineDesc: 'Watch real documents travel from disk upload to verified citation-backed answers',
    playAnimatedFlow: 'Play Animated Flow',
    flowing: 'Flowing...',
    courseTracks: 'Course Tracks',
    tracksCount: '6 Tracks • 20 Specs',
    microLesson: 'micro-lesson',
    offlineMode: 'Offline Mode ✈️',
    spec: 'Spec',
    transcript: 'Transcript',
    ylRole: 'YL (Systems Architect)',
    mbRole: 'MB (Quality Guardian)',
    previous: 'Previous',
    nextSlide: 'Next',
    slideNavigator: 'Slide Navigator',
    navigator: 'Navigator',
    exitPresentation: 'Exit Presentation Mode (Esc)',
    pressVForVoice: 'Press V for Voiceover',
    specModel: 'Specification Model',
    interactiveArtifact: 'Interactive Sandbox / Artifact',
    mentalModelAnalogy: 'Mental Model Analogy',
    realCircumstanceTitle: 'Real Project Circumstances & Pressure',
    tradeOffReality: 'Trade-Off Reality',
    knowledgeCheck: 'Knowledge Check',
    chapterMastery: 'Chapter Mastery',
    markAsMastered: 'Mark as Mastered',
    nextChapter: 'Next Chapter',
    retrying: 'Retry',
    spotOn: 'Spot On!',
    notQuite: 'Not Quite!',
    downside: 'Downside:',
    oneRule: 'One Rule to Remember Forever',
    balancedGoldenRatio: 'Balanced Golden Ratio',
    favoring: 'Favoring',
    architecturalRule: 'Architectural Rule:',
    physicalIntuition: 'The Physical Intuition',
    softwareMapping: 'Software Mapping',
    whyBreaksWithoutIt: 'Why Systems Break Without It',
    failureMode: 'The Failure Mode (What Blows Up)',
    engineeringRequirement: 'The Engineering Requirement (What Our Code Must Guarantee)',
    engineeringMitigation: 'The Engineering Mitigation:',
    howItWorksUnderHood: 'How it works under the hood:',
    codebaseImplementation: 'Codebase Implementation',
    sourceFile: 'Source File:',
    productionDataFlowInvariants: 'Production Data Flow Invariants:',
    juniorTrap: 'The Junior Dev Trap ❌',
    seniorResolution: 'The Sanad Golden Ratio ✅',
    codebaseChecklist: 'Codebase Enforcement & Defense Checklist:',
    codeImplementation: 'Code Implementation:',
    runtimeInvariant: 'Runtime Invariant:',
    defenseProof: 'Defense Proof:',
    enforcedIn: 'Enforced in',
    via: 'via',
    chapterQuiz: 'Chapter Micro-Quiz',
    coreConceptsMastered: 'Core Concepts Mastered',
    proceedToReviewRule: 'Proceed to review the non-negotiable rule.',
    ruleAndMastery: 'The Non-Negotiable Rule & Mastery',
  },
  fr: {
    academySubtitle: 'Ingénierie IA & Architecture Système Interactive',
    defenseReadiness: 'Préparation Soutenance',
    certificate: 'Certificat',
    startFresh: 'Recommencer (0%)',
    curriculum: 'Parcours',
    sandboxLab: 'Labo R&D',
    searchSpecs: 'Rechercher une spec...',
    current: 'En cours :',
    next: 'Suivant :',
    conquered: 'Maîtrisé',
    left: 'restant',
    done: 'validé',
    learningTrail: 'Fil d\'Apprentissage',
    completedCount: 'Terminés',
    interactiveLesson: 'Leçon Interactive',
    keynoteSlides: 'Mode Diaporama Keynote',
    geminiVision: 'Vision Gemini',
    aiTutor: 'Tuteur IA',
    studioVoiceover: 'Voix Off Studio',
    clickPlayToListen: 'Cliquez sur lecture pour écouter',
    currentlySpeaking: 'Lecture en cours 🎙️',
    realWorldMetaphor: 'La Métaphore Concrète',
    realCircumstance: 'Le Contexte Réel',
    highPressure: 'La Pression Réelle',
    howSanadSolved: 'La Solution d\'Ingénierie Sanad',
    alternativeRoad: 'La Fausse Piste (À Éviter)',
    ruleToRemember: 'Règle d\'Or Inviolable',
    completeAndNext: 'Valider & Continuer',
    continueNext: 'Continuer',
    completed: 'Terminé !',
    back: 'Précédent',
    enterFullscreen: 'Plein Écran ⛶',
    livePipeline: 'Ligne de Production en Direct',
    pipelineDesc: 'Observez le parcours des fichiers du disque jusqu\'aux citations vérifiées',
    playAnimatedFlow: 'Lancer l\'Animation',
    flowing: 'Animation en cours...',
    courseTracks: 'Parcours Pédagogique',
    tracksCount: '6 Parcours • 20 Spécifications',
    microLesson: 'micro-leçon',
    offlineMode: 'Mode Hors-Ligne ✈️',
    spec: 'Spéc',
    transcript: 'Transcription',
    ylRole: 'YL (Architecte Système)',
    mbRole: 'MB (Gardien de la Qualité)',
    previous: 'Précédent',
    nextSlide: 'Suivant',
    slideNavigator: 'Sommaire des Diapositives',
    navigator: 'Sommaire',
    exitPresentation: 'Quitter le Diaporama (Échap)',
    pressVForVoice: 'Appuyez sur V pour la Voix Off',
    specModel: 'Modèle de Spécification',
    interactiveArtifact: 'Simulation & Artefact Interactif',
    mentalModelAnalogy: 'Analogie du Modèle Mental',
    realCircumstanceTitle: 'Contexte & Pression Réelle',
    tradeOffReality: 'Compromis & Réalité du Terrain',
    knowledgeCheck: 'Mini-Quiz de Validation',
    chapterMastery: 'Maîtrise du Chapitre',
    markAsMastered: 'Valider le Chapitre',
    nextChapter: 'Chapitre Suivant',
    retrying: 'Recommencer',
    spotOn: 'Exactement !',
    notQuite: 'Pas tout à fait !',
    downside: 'Inconvénient majeur :',
    oneRule: 'La Règle d\'Or à Retenir',
    balancedGoldenRatio: 'Équilibre Optimal Sanad',
    favoring: 'Privilégie',
    architecturalRule: 'Règle d\'Architecture :',
    physicalIntuition: 'L\'Intuition Physique',
    softwareMapping: 'Implémentation Logicielle',
    whyBreaksWithoutIt: 'Pourquoi le Système Échoue Sans Cela',
    failureMode: 'Le Mode de Défaillance (Ce qui Échoue)',
    engineeringRequirement: 'L\'Exigence d\'Ingénierie (Ce que le Code Garantit)',
    engineeringMitigation: 'L\'Atténuation d\'Ingénierie :',
    howItWorksUnderHood: 'Fonctionnement sous le capot :',
    codebaseImplementation: 'Implémentation dans le Codebase',
    sourceFile: 'Fichier Source :',
    productionDataFlowInvariants: 'Invariants de Flux de Données Production :',
    juniorTrap: 'Le Piège du Développeur Junior ❌',
    seniorResolution: 'L\'Équilibre Optimal Sanad ✅',
    codebaseChecklist: 'Contrôle du Codebase & Preuves pour la Soutenance :',
    codeImplementation: 'Implémentation :',
    runtimeInvariant: 'Invariant d\'Exécution :',
    defenseProof: 'Preuve Soutenance :',
    enforcedIn: 'Appliqué dans',
    via: 'via',
    chapterQuiz: 'Mini-Quiz du Chapitre',
    coreConceptsMastered: 'Concepts Clés Maîtrisés',
    proceedToReviewRule: 'Poursuivez pour réviser la règle inviolable.',
    ruleAndMastery: 'Règle Inviolable & Validation',
  },
};

export const TRACK_TRANSLATIONS_FR: Record<string, { title: string; shortName: string }> = {
  'track-1': { title: 'Parcours 1 : Fondations & Cadence Agile', shortName: 'Gouvernance & Scrum' },
  'track-2': { title: 'Parcours 2 : Vision Produit & Accessibilité UX', shortName: 'Produit & UX' },
  'track-3': { title: 'Parcours 3 : Architecture Système & Persistance', shortName: 'Architecture & BDD' },
  'track-4': { title: 'Parcours 4 : Moteur IA & Raisonnement LangGraph', shortName: 'IA & LangGraph' },
  'track-5': { title: 'Parcours 5 : Sécurité Zero-Trust & Cloud', shortName: 'Sécurité & Cloud' },
  'track-6': { title: 'Parcours 6 : Catalogue Codebase & Packages', shortName: 'Catalogue Codebase' },
};

export const LESSON_TRANSLATIONS_FR: Record<string, string> = {
  'lesson-1': 'Cadre Scrum & Dynamique d\'Équipe (Binôme YL & MB)',
  'lesson-2': 'Cadence des Sprints Agiles (Sprints 0 à 6)',
  'lesson-3': 'Gouvernance, Portes de Sortie & Gestion des Risques',
  'lesson-4': 'Finalité Produit & Règles Non Négociables',
  'lesson-5': 'Inventaire Détaillé des Fonctionnalités (F-01 à F-16)',
  'lesson-6': 'Stratégie d\'Interface & Accessibilité (No-JS & RTL)',
  'lesson-7': 'Architecture Système, Structures de Données & Génie Logiciel',
  'lesson-8': 'Persistance des Données, Schémas BDD & Contrats d\'API',
  'lesson-9': 'Gestion des Erreurs, Résilience & Plan de Continuité',
  'lesson-10': 'Ingénierie IA, Pipeline d\'Extraction & Science d\'Évaluation',
  'lesson-11': 'Workflow de Raisonnement & Recherche Cyclique LangGraph',
  'lesson-12': 'Science d\'Évaluation, Portes de Sortie & Métriques Qualité',
  'lesson-13': 'Sécurité, Contrôle d\'Accès & Ingénierie de Déploiement',
  'lesson-14': 'Sécurité Web OWASP & Conformité Vie Privée (Loi 09-08)',
  'lesson-15': 'Stack Technique, Infrastructure & Déploiement Production',
  'lesson-16': 'Application Racine & Modules de Point d\'Entrée',
  'lesson-17': 'Immersion dans le Package Agent (agent/)',
  'lesson-18': 'Le Bibliothécaire Strict de la Base de Données (db/repo.py)',
  'lesson-19': 'Interface Web & Déploiement Sécurisé (ui & deploy)',
  'lesson-20': 'Suites d\'Évaluation & de Vérification (tests & benchmarks)',
};

export const SUBLESSON_TRANSLATIONS_FR: Record<string, Partial<SubLesson>> = {
  '1-1': {
    title: '1.1 Les Deux Architectes & La Règle 5 de Revue',
    metaphor: {
      emoji: '✈️',
      title: 'Copilotes dans un Avion de Chasse',
      description: 'Un pilote tient les commandes et surveille les instruments (YL : Architecture & Code) ; l\'autre scanne le radar et vérifie les règles de mission (MB : Qualité, Corpus Juridique & Soutenance). Aucun ne tire sans que l\'autre confirme le verrouillage.',
    },
    situation: {
      context: 'Un binôme d\'ingénieurs concevant un système d\'IA documentaire d\'entreprise avec une date de soutenance académique non négociable.',
      pressure: 'Si quelqu\'un pousse du code bâclé sans vérification, l\'IA hallucine devant le jury ou plante sous charge réelle.',
    },
    solution: {
      title: 'Règle 5 : Protocole de Revue Obligatoire à Deux',
      explanation: 'Aucune branche n\'est fusionnée dans la branche principale sans validation explicite des deux coéquipiers selon leur domaine de compétence.',
      keyPoints: [
        'YL pilote les schémas SQLite, les boucles LangGraph et le conteneur Docker.',
        'MB pilote les benchmarks RAGAS, le corpus juridique marocain et le mémoire.',
        'Revue croisée obligatoire sur toute décision architecturale ; zéro code improvisé.',
      ],
    },
    alternative: {
      title: 'Le Développeur Solitaire Sans Contrôle',
      explanation: 'Un développeur écrit tout sans relecture, ou les deux touchent à tout sans frontière de responsabilité.',
      downside: 'Multiplication des bugs silencieux et hallucinations fatales en démo publique.',
    },
    keyTakeaway: 'La vraie ingénierie IA commence par la gouvernance : des rôles clairs et une revue croisée obligatoire évitent toute dérive fatale.',
  },
  '1-2': {
    title: '1.2 Le Plan d\'Architecture à 10 000 Pieds',
    metaphor: {
      emoji: '🏭',
      title: 'Ligne de Production d\'Usine Sécurisée',
      description: 'Les documents entrent par le quai de déchargement (Extraction), sont découpés en petits colis (Parent-Enfant), rangés dans des coffres haute densité (SQLite & Qdrant), et contrôlés par 9 postes d\'inspection avant toute sortie.',
    },
    situation: {
      context: 'Les clients exigent d\'interroger des codes juridiques de 400 pages sans envoyer leurs données privées sur le cloud public.',
      pressure: 'Les chatbots naïfs envoient les PDF bruts sur des API cloud, dépassant les limites de contexte et violant la Loi 09-08.',
    },
    solution: {
      title: 'Architecture Locale Découplée à Double Stockage',
      explanation: 'Sanad unifie 4 piliers indépendants : un serveur FastAPI, une base SQLite pour les journaux d\'audit, Qdrant pour la recherche vectorielle, et un agent cyclique LangGraph.',
      keyPoints: [
        'Confidentialité locale : Tout l\'indexage et la recherche vectorielle tournent en local.',
        'Double stockage : SQLite gère le relationnel et le statut ; Qdrant gère les vecteurs 768-D.',
        'Découplage strict : Le raisonnement de l\'agent est isolé derrière 8 ports hexagonaux.',
      ],
    },
    alternative: {
      title: 'Wrapper Monolithique sur le Cloud',
      explanation: 'Envoyer les fichiers bruts vers une API hébergée tierce.',
      downside: 'Violation de la Loi 09-08 marocaine, fuite de données et facturation par jeton récurrente.',
    },
    keyTakeaway: 'Découpler stockage, ingestion et cerveau de raisonnement garantit la confidentialité, la testabilité et la robustesse.',
  },
  '1-3': {
    title: '1.3 La Règle d\'Or du RAG : Ne Devine Jamais, Prouve Toujours',
    metaphor: {
      emoji: '⚖️',
      title: 'L\'Examen Juridique à Livre Ouvert',
      description: 'Si tu rédiges une réponse de mémoire sans vérifier, tu es recalé d\'office. Tu ne peux affirmer que ce que tu peux citer avec l\'article exact et le numéro de page sous tes yeux.',
    },
    situation: {
      context: 'Responsables RH et juristes utilisant Sanad pour calculer des préavis ou des indemnités de licenciement.',
      pressure: 'Si l\'IA invente un mauvais chiffre de préavis, l\'entreprise s\'expose à de coûteux procès prud\'homaux.',
    },
    solution: {
      title: 'Traçabilité des Citations Encodée par le Système',
      explanation: 'L\'IA est techniquement bloquée si elle n\'a pas de citations exactes. Le code Python construit lui-même les cartes sources depuis les blocs du disque.',
      keyPoints: [
        'Toute réponse cite le fichier, la page, le numéro d\'article et l\'extrait.',
        'Si la pertinence est inférieure à 0.70 après 3 boucles, refus honnête immédiat (NOT_COVERED).',
        'Tolérance zéro pour le texte génératif sans preuve.',
      ],
    },
    alternative: {
      title: 'Génération Spéculative (Chatbot Standard)',
      explanation: 'Laisser le modèle inventer librement des réponses et citations.',
      downside: 'Le modèle fabrique de faux articles de loi convaincants (ex: Article 999).',
    },
    keyTakeaway: 'La véritable IA d\'entreprise privilégie le refus honnête et les citations vérifiées par code plutôt que l\'improvisation.',
  },
  '2-1': {
    title: '2.1 Sprints 0 & 1 : Ingestion, Stockage & Embeddings',
    metaphor: {
      emoji: '🏗️',
      title: 'Poser les Fondations en Béton Armé',
      description: 'On ne peut pas construire les étages d\'un gratte-ciel sans avoir coulé des piliers d\'acier et de béton inébranlables.',
    },
    situation: {
      context: 'Lancement du projet : choix des outils, de l\'environnement et des briques de stockage.',
      pressure: 'La lenteur de pip standard et les fuites de mémoire lors du parsing de gros fichiers menaçaient le calendrier.',
    },
    solution: {
      title: 'Stack Moderne : uv + SQLite WAL + E5 Multilingue',
      explanation: 'Adoption d\'Astral uv pour des builds sub-seconde, SQLite pour l\'état et Qdrant avec multilingual-e5-base.',
      keyPoints: [
        'Gestionnaire uv pour des installations instantanées déterministes.',
        'Détection de changements SHA-256 évitant de retraiter les fichiers identiques.',
        'Découpage parent-enfant : 500 car. pour chercher, 4 000 car. pour lire.',
      ],
    },
    alternative: {
      title: 'Pip Standard & Listes en Mémoire',
      explanation: 'Utiliser pip standard sans contraintes strictes et des recherches naïves.',
      downside: 'Builds de 5 minutes et crashs par saturation mémoire dès 100 documents.',
    },
    keyTakeaway: '80% de la précision d\'un système RAG se joue dans la qualité de l\'ingestion avant même le premier appel IA.',
  },
  '2-2': {
    title: '2.2 Sprints 2 & 3 : Agent LangGraph & Portes de Sortie RAGAS',
    metaphor: {
      emoji: '🏎️',
      title: 'La Piste d\'Essai Automobile Sécurisée',
      description: 'On ne teste pas une Formule 1 sur l\'autoroute publique ; on la fait tourner sur circuit fermé avec des capteurs de télémétrie ultra-précis.',
    },
    situation: {
      context: 'Passage de la simple recherche vectorielle au raisonnement par agent et à l\'évaluation automatique.',
      pressure: 'Les réponses des LLM dérivent au fil des changements de prompts sans arbitre objectif.',
    },
    solution: {
      title: 'Machine à États LangGraph + Lanceur RAGAS',
      explanation: 'Graphe cyclique à 9 nœuds gérant les ambiguïtés et script d\'évaluation automatisé sur benchmark figé.',
      keyPoints: [
        'Graphe LangGraph cyclique reformulant les requêtes imprécises.',
        'Métriques RAGAS calculant la fidélité et le rappel de contexte.',
        'Portes strictes : Porte 1 (Fidélité ≥ 90%) et Porte 2 (Refus = 100%).',
      ],
    },
    alternative: {
      title: 'Tests Manuels au Doigt Mouillé',
      explanation: 'Poser 3 questions au hasard pour déclarer une version prête.',
      downside: 'Régressions invisibles qui explosent lors des présentations clients.',
    },
    keyTakeaway: 'La science d\'évaluation transforme l\'IA en ingénierie logicielle prévisible et quantifiable.',
  },
  '2-3': {
    title: '2.3 Sprints 4, 5 & 6 : Répétitions Soutenance & Cloud Railway',
    metaphor: {
      emoji: '🥋',
      title: 'Le Passage de Ceinture Noire',
      description: 'Le karatéka répète chaque parade cent fois avant de se présenter devant le jury des maîtres.',
    },
    situation: {
      context: 'Préparation de la soutenance devant le jury universitaire et déploiement de production.',
      pressure: 'Une panne de réseau ou une question piège du jury sur les hallucinations pouvait ruiner le diplôme.',
    },
    solution: {
      title: 'Protocole de Répétition & Authentification Keycloak OIDC',
      explanation: '10 répétitions scénarisées avec vidéos de secours, banque de 30 questions de jury et déploiement cloud Railway.',
      keyPoints: [
        'Scénarios de démo rodés avec vidéos de repli en cas de coupure.',
        'Keycloak OIDC pour gérer les rôles et permissions d\'entreprise.',
        'Déploiement Railway avec disques persistants montés sur /app/data.',
      ],
    },
    alternative: {
      title: 'Démo en Direct Sans Filet',
      explanation: 'Compter sur la connexion WiFi de l\'université le jour J.',
      downside: 'Coupure réseau ou saturation d\'API bloquant la soutenance en direct.',
    },
    keyTakeaway: 'La livraison professionnelle exige une architecture cloud robuste et un protocole de répétition sans faille.',
  },
  '3-1': {
    title: '3.1 Les Journaux de Bord Vivants : Boîtes Noires de Vérité',
    metaphor: {
      emoji: '📓',
      title: 'La Boîte Noire de l\'Aviation',
      description: 'Chaque altitude, chaque commande et chaque alerte est enregistrée en continu dans la boîte noire. En cas de turbulence ou d\'incident, personne ne spécule : on consulte l\'enregistrement horodaté.',
    },
    situation: {
      context: 'Une cadence de sprint rapide où des dizaines de décisions d\'architecture et de correctifs de bugs s\'enchaînent chaque jour.',
      pressure: 'Oublier la raison d\'un choix technique, réintroduire un bug résolu la veille, ou être incapable de justifier une décision lors de la soutenance.',
    },
    solution: {
      title: 'Journaux de Bord Vivants (YL.md & MB.md)',
      explanation: 'Tenue rigoureuse d\'un journal quotidien par architecte structuré en quatre blocs immuables : Ce qui est Fait, Ce qui est En cours, Ce qui Reste, et Ce qui est Bloqué.',
      keyPoints: [
        'Traçabilité totale : Chaque entrée est datée et liée aux commits Git correspondants.',
        'Responsabilité partagée : YL consigne l\'ingénierie système ; MB consigne la validation qualité et juridique.',
        'Clarté instantanée : Le binôme commence chaque journée en lisant le journal de l\'autre.',
      ],
    },
    alternative: {
      title: 'Échanges Informels sur Messagerie Éphémère',
      explanation: 'Se reposer sur des discussions de couloir ou des messages éphémères sans historique structuré.',
      downside: 'Perte de connaissances critiques, amnésie technique et désaccords insolubles lors de la soutenance.',
    },
    keyTakeaway: 'Ce qui n\'est pas documenté n\'existe pas : les journaux de bord transforment le code en une démarche scientifique traçable.',
  },
  '3-2': {
    title: '3.2 Le Pack de Spécifications Scellé & La Règle Spec-Lock',
    metaphor: {
      emoji: '📜',
      title: 'Le Contrat Notarié Scellé à la Cire',
      description: 'Une fois le contrat signé et scellé par les deux parties chez le notaire, aucun signataire ne peut raturer discrètement une clause en coulisses sans un avenant formel.',
    },
    situation: {
      context: 'Un projet ambitieux de 20 spécifications techniques couvrant du parsing de fichiers jusqu\'au déploiement cloud sécurisé.',
      pressure: 'Le syndrome du « Scope Creep » : ajouter de nouvelles idées tentantes à chaque sprint et ne jamais terminer la version initiale.',
    },
    solution: {
      title: 'Règle Inviolable du Spec-Lock (Verrouillage des Spécifications)',
      explanation: 'Les 20 spécifications sont déclarées figées en lecture seule. Toute modification nécessite une revue formelle et l\'approbation conjointe des deux architectes.',
      keyPoints: [
        'Périmètre sanctuarisé : Les 20 specs définissent exactement ce qui doit être livré pour la v1.0.',
        'Protocole d\'amendement strict : Tout ajout nécessite une Pull Request documentée et chiffrée.',
        'Protection anti-dispersion : L\'énergie de l\'équipe reste focalisée sur l\'achèvement et l\'excellence.',
      ],
    },
    alternative: {
      title: 'Spécifications Flottantes et Évolutives',
      explanation: 'Modifier continuellement les exigences au fil de l\'eau selon l\'humeur du jour.',
      downside: 'Retard perpétuel, tests continuellement invalidés et épuisement de l\'équipe avant la soutenance.',
    },
    keyTakeaway: 'Figer ses spécifications par contrat d\'équipe est le seul moyen de convertir une vision en un produit réellement terminé.',
  },
  '3-3': {
    title: '3.3 Les Jalons C1-C3 & L\'Échelle de Délestage',
    metaphor: {
      emoji: '🧗',
      title: 'L\'Échelle de Lest de la Montgolfière',
      description: 'Quand la montgolfière perd de l\'altitude, on jette les sacs de sable d\'abord, puis le mobilier de cabine, mais on ne touche jamais au brûleur ni à la toile.',
    },
    situation: {
      context: 'Une date butoir de soutenance académique et de livraison client absolue qui ne peut être repoussée d\'un seul jour.',
      pressure: 'Face aux imprévus techniques, paniquer et commencer à saboter le cœur du moteur de recherche ou les tests de sécurité.',
    },
    solution: {
      title: 'Échelle de Délestage Préétablie (Jalons C1, C2, C3)',
      explanation: 'Une hiérarchie de priorités gravée à l\'avance définissant exactement quelles fonctionnalités abandonner en cas de pression temporelle.',
      keyPoints: [
        'Jalon C1 (Non Négociable) : Pipeline RAG, 100% de refus honnête, citations exactes et persistance SQLite.',
        'Jalon C2 (Négociable) : Visualisations graphiques avancées et tableaux de bord analytiques.',
        'Jalon C3 (Bonus de Confort) : Synthèse vocale neuronale et thèmes d\'interface secondaires.',
      ],
    },
    alternative: {
      title: 'Coupes d\'Urgence Désordonnées',
      explanation: 'Couper au hasard dans la panique la veille de la livraison en supprimant les tests ou l\'isolation des données.',
      downside: 'Livraison d\'un système corrompu, vulnérable aux injections et incapable de prouver ses citations.',
    },
    keyTakeaway: 'Une échelle de délestage décidée à tête reposée transforme une crise de temps en une retraite tactique parfaitement maîtrisée.',
  },
  '4-1': {
    title: '4.1 Cartes de Preuves Cliquables & Mentions Légales',
    metaphor: {
      emoji: '🏷️',
      title: 'L\'Étiquette d\'Origine Contrôlée (AOC) & Avertissement Sanitaire',
      description: 'Chaque produit noble porte son étiquette d\'origine traçable jusqu\'à la ferme, accompagnée des avertissements sanitaires clairs pour protéger le consommateur.',
    },
    situation: {
      context: 'Des responsables RH et juristes consultent Sanad pour appliquer des articles complexes du Code du Travail marocain.',
      pressure: 'Si l\'utilisateur prend une réponse générée par l\'IA pour un avis juridique officiel sans vérifier l\'article original, des erreurs lourdes de conséquences surviennent.',
    },
    solution: {
      title: 'Cartes de Preuves Cliquables (F-03) & Décharge Légale (F-04)',
      explanation: 'Chaque affirmation de l\'IA est ancrée dans une carte de preuve interactive affichant le document source, la page exacte et l\'extrait brut, sous une bannière de décharge légale.',
      keyPoints: [
        'Vérifiabilité en 1 clic : L\'utilisateur clique sur la citation pour ouvrir le document à la page exacte.',
        'Avertissement de non-responsabilité : Mention explicite que l\'outil est une aide à la décision, non un avocat.',
        'Extraction certifiée : Les cartes sources sont générées par le backend Python, jamais inventées par le LLM.',
      ],
    },
    alternative: {
      title: 'Réponses en Texte Brut Non Sourcées',
      explanation: 'Fournir des paragraphes de texte élégants sans lien direct vers le document de référence.',
      downside: 'Impossibilité pour l\'humain de vérifier l\'information, entraînant une méfiance totale ou des erreurs juridiques graves.',
    },
    keyTakeaway: 'La confiance dans l\'IA d\'entreprise repose sur l\'immédiateté de la preuve : une réponse sans citation vérifiable n\'a aucune valeur.',
  },
  '4-2': {
    title: '4.2 Le Refus Honnête Déterministe (F-05)',
    metaphor: {
      emoji: '🛑',
      title: 'Le Douanier Inflexible',
      description: 'Si votre visa est périmé ou absent, aucun sourire ni discours poétique ne vous fera franchir la frontière. La réponse est un refus net et réglementaire.',
    },
    situation: {
      context: 'Des utilisateurs posent des questions pièges, demandent la météo à Casablanca, ou interrogent un sujet absent des documents versés.',
      pressure: 'La propension naturelle des modèles de langage à vouloir être serviables et à inventer une réponse plausible de toutes pièces.',
    },
    solution: {
      title: 'Protocole de Refus Déterministe NOT_COVERED (F-05)',
      explanation: 'Dès que le score de pertinence des documents est insuffisant ou que l\'information n\'est pas trouvée après 3 cycles, le système renvoie un refus codé standard.',
      keyPoints: [
        'Détection stricte du hors-domaine : Blocage en amont de toute tentative de génération spéculative.',
        'Message clair et transparent : L\'agent indique précisément que les documents fournis ne contiennent pas la réponse.',
        'Zéro hallucination tolérée : 100% de refus exigé sur les questions hors-corpus lors des benchmarks.',
      ],
    },
    alternative: {
      title: 'L\'IA Complaisante qui Tente de Répondre',
      explanation: 'Laisser le modèle extrapoler et formuler une réponse approximative par politesse.',
      downside: 'Invention de lois imaginaires (ex: \'Article 999 du Code du Travail\') qui ruinent la crédibilité du système.',
    },
    keyTakeaway: 'Le refus honnête est la marque de fabrique des systèmes d\'IA de classe industrielle : mieux vaut un refus franc qu\'un mensonge élégant.',
  },
  '5-1': {
    title: '5.1 Cloisonnement des Espaces de Travail & Synchronisation en Direct',
    metaphor: {
      emoji: '🏢',
      title: 'Les Casiers Consignés Sécurisés',
      description: 'Chaque voyageur possède la clé unique de son casier ; il est physiquement impossible de voir ou d\'ouvrir le bagage d\'un autre voyageur dans le hall de gare.',
    },
    situation: {
      context: 'Une plateforme unique Sanad partagée entre plusieurs départements d\'entreprise (RH, Direction Financière, Juridique).',
      pressure: 'Un collaborateur RH pourrait accéder par erreur aux rapports d\'audit financier ou aux négociations d\'acquisition confidentielles.',
    },
    solution: {
      title: 'Isolation Stricte par Workspace & Synchronisation en Direct (F-01, F-02, F-13)',
      explanation: 'Chaque document, chunk vectoriel et fil de conversation est étiqueté avec un identifiant de workspace obligatoire, filtré au niveau base de données et vecteur.',
      keyPoints: [
        'Cloisonnement multicouche : Filtres obligatoires workspace_id dans SQLite et dans le payload Qdrant.',
        'Synchronisation temps réel : Mises à jour d\'état via WebSockets/SSE lors de l\'ingestion sans rechargement de page.',
        'Zéro fuite inter-locataires : Les recherches vectorielles ignorent mathématiquement les vecteurs des autres espaces.',
      ],
    },
    alternative: {
      title: 'Table Unique sans Partitionnement Strict',
      explanation: 'Partager un index global et filtrer superficiellement côté interface graphique.',
      downside: 'Une vulnérabilité BOLA permettrait à un utilisateur d\'aspirer l\'ensemble des documents de l\'entreprise.',
    },
    keyTakeaway: 'La sécurité multi-locataire commence au niveau du stockage physique : aucun octet ne doit être scanné sans preuve d\'appartenance.',
  },
  '5-2': {
    title: '5.2 Lecture Multi-Format & OCR pour Scans Numérisés',
    metaphor: {
      emoji: '🔍',
      title: 'Le Laboratoire de Paléographie Numérique',
      description: 'Les livres modernes sont numérisés par scanner laser ultra-rapide ; les parchemins anciens abîmés passent sous des loupes microscopiques à rayons UV.',
    },
    situation: {
      context: 'Les entreprises disposent d\'archives hétérogènes : PDF récents écrits sous Word, mais aussi photocopies de contrats de 1995 scannées de travers.',
      pressure: 'Les extracteurs de texte standards échouent lamentablement sur les images scannées, renvoyant des pages entièrement blanches.',
    },
    solution: {
      title: 'Échelle d\'Extraction Adaptative avec Bascule OCR (F-11, F-16)',
      explanation: 'Un moteur d\'extraction progressif utilisant PyMuPDF pour l\'extraction vectorielle rapide, et basculant automatiquement vers un OCR robuste sur les pages graphiques.',
      keyPoints: [
        'Détection automatique de texte vide : Si une page PDF ne contient aucun texte vectoriel, l\'OCR est déclenché.',
        'Support multi-formats : Prise en charge native de PDF, DOCX, TXT et images brutes scannées.',
        'Conservation de la pagination : Chaque morceau de texte extrait retient son numéro de page physique exact.',
      ],
    },
    alternative: {
      title: 'OCR Systématique Aveugle sur Tout le Fichier',
      explanation: 'Exécuter une reconnaissance optique lourde sur l\'intégralité des 400 pages d\'un PDF déjà textuel.',
      downside: 'Consommation CPU multipliée par 50, saturation de la mémoire et temps d\'ingestion insupportable.',
    },
    keyTakeaway: 'L\'ingénierie d\'ingestion intelligente analyse d\'abord la structure du fichier pour n\'appliquer le traitement lourd qu\'aux pages qui l\'exigent.',
  },
  '5-3': {
    title: '5.3 Mémoire Conversationnelle & Clarification Dynamique',
    metaphor: {
      emoji: '🧠',
      title: 'Le Conseil de l\'Expert au Fil de l\'Entretien',
      description: 'L\'expert se souvient de ce que vous avez mentionné il y a deux minutes, mais vous interrompt poliment dès qu\'une information clé manque pour résoudre votre cas.',
    },
    situation: {
      context: 'L\'utilisateur pose des questions en cascade (« Et pour un cadre supérieur ? ») ou pose des requêtes trop vagues (« Quels sont mes droits ? »).',
      pressure: 'Sans mémoire, chaque question est traitée isolément ; et avec une question vague, la recherche s\'éparpille sur des milliers de documents inutiles.',
    },
    solution: {
      title: 'Mémoire Sélective Découplée & Nœud de Clarification (F-06, F-07)',
      explanation: 'Maintien de l\'historique des derniers échanges en SQLite combiné à un nœud LangGraph détectant l\'ambiguïté pour poser des questions de cadrage avant de chercher.',
      keyPoints: [
        'Contexte glissant : Préservation des 5 derniers tours pour contextualiser les pronoms et références implicites.',
        'Détection d\'ambiguïté : Si la requête manque de précision juridique, l\'IA demande une clarification ciblée.',
        'Économie de calcul : Pas de recherche vectorielle lourde tant que le périmètre de la question n\'est pas clarifié.',
      ],
    },
    alternative: {
      title: 'Régurgitation de Tout l\'Historique dans le Prompt',
      explanation: 'Injecter 50 pages de discussion antérieure dans la fenêtre de contexte du modèle.',
      downside: 'Explosion des coûts d\'inférence, dépassement des quotas et oubli du sujet central par le modèle.',
    },
    keyTakeaway: 'Une bonne mémoire d\'IA est sélective et proactive : elle retient l\'essentiel et demande des éclaircissements avant de foncer.',
  },
  '6-1': {
    title: '6.1 Stratégie Écran Desktop-First & Contraintes Mobiles',
    metaphor: {
      emoji: '🖥️',
      title: 'Le Cockpit Professionnel Multi-Écrans',
      description: 'Les analystes financiers et juristes travaillent sur de larges moniteurs pour comparer plusieurs documents côte à côte, mais consultent un résumé sur tablette en déplacement.',
    },
    situation: {
      context: 'Les utilisateurs professionnels de Sanad ont besoin de lire la réponse de l\'IA tout en visualisant le PDF source en regard.',
      pressure: 'Une interface pensée uniquement pour smartphone comprime les panneaux, masque les citations et rend la vérification visuelle pénible.',
    },
    solution: {
      title: 'Conception Ergonomique Desktop-First avec Adaptation Réactive',
      explanation: 'Une interface en 3 colonnes optimisée pour les résolutions de bureau (Documents | Chat | Citations & Aperçu PDF), s\'adaptant élégamment sur tablette et mobile.',
      keyPoints: [
        'Disposition triple-panneau : Visualisation simultanée du contexte, du dialogue et des preuves juridiques.',
        'Hiérarchie visuelle claire : Typographie SF Pro et contrastes soignés pour limiter la fatigue cognitive.',
        'Repli fluide sur mobile : Navigation par onglets simples et panneaux coulissants pour les écrans réduits.',
      ],
    },
    alternative: {
      title: 'Approche Mobile-First Exclusive',
      explanation: 'Forcer les utilisateurs de bureau à naviguer dans une colonne étroite de 400 pixels de large.',
      downside: 'Sous-utilisation criante de l\'espace écran et frustration des professionnels habitués aux outils de productivité avancés.',
    },
    keyTakeaway: 'L\'ergonomie d\'un outil d\'entreprise doit épouser le matériel réel de ses utilisateurs : les écrans larges méritent une densité d\'information riche et ordonnée.',
  },
  '6-2': {
    title: '6.2 La Philosophie No-JS & Le Rendu Arabe RTL',
    metaphor: {
      emoji: '📖',
      title: 'L\'Ouvrage Bilingue Relié de Droite à Gauche',
      description: 'Un ouvrage soigné respecte les règles typographiques de chaque écriture : la calligraphie arabe se lit de droite à gauche avec ses ligatures, le français de gauche à droite.',
    },
    situation: {
      context: 'Le corpus juridique marocain est nativement bilingue (Arabe et Français), et les postes de travail d\'entreprise bloquent parfois les scripts JavaScript agressifs.',
      pressure: 'Des applications modernes deviennent des pages blanches si un script externe est bloqué, et le texte arabe apparaît inversé ou mal aligné.',
    },
    solution: {
      title: 'Philosophie Rendu Serveur No-JS & Support RTL Natif',
      explanation: 'Des gabarits Jinja2 générés côté serveur avec des formulaires HTML natifs et une détection automatique de l\'orientation RTL pour l\'arabe.',
      keyPoints: [
        'Résilience No-JS : Les fonctions critiques de recherche et de lecture restent accessibles sans JavaScript actif.',
        'Support arabe natif : Balises dir=\'rtl\' dynamiques et typographie optimisée pour la lecture du droit en arabe.',
        'Performance instantanée : Pas de temps de chargement de bundle JavaScript lourd au démarrage de la page.',
      ],
    },
    alternative: {
      title: 'Application Client-Side 100% JavaScript avec CSS RTL Bricolé',
      explanation: 'Télécharger 15 Mo de bibliothèques clientes et inverser les marges manuellement en CSS.',
      downside: 'Page blanche au moindre incident de réseau ou de proxy d\'entreprise, et typographie arabe déformée.',
    },
    keyTakeaway: 'La robustesse du web traditionnel et le respect des traditions typographiques créent des interfaces durables et universellement accessibles.',
  },
  '6-3': {
    title: '6.3 Accessibilité Lecteur d\'Écran & Norme WCAG 2.1 AA',
    metaphor: {
      emoji: '🦯',
      title: 'Le Guidage Podotactile et Sonore de la Gare',
      description: 'Des bandes podotactiles au sol et des annonces vocales claires permettent à tout voyageur non-voyant de monter dans le bon train avec une totale autonomie.',
    },
    situation: {
      context: 'Les systèmes informatiques publics et d\'entreprise doivent être accessibles à tous les collaborateurs, y compris ceux en situation de handicap visuel ou moteur.',
      pressure: 'Les lecteurs d\'écran restent totalement silencieux ou confus lorsqu\'ils rencontrent des balises génériques <div> sans attributs sémantiques.',
    },
    solution: {
      title: 'Conformité Stricte aux Directives WCAG 2.1 Niveau AA',
      explanation: 'Implémentation rigoureuse des balises sémantiques HTML5, des régions ARIA en direct (aria-live) pour les réponses IA et d\'une navigation intégrale au clavier.',
      keyPoints: [
        'Régions ARIA directes : Annonce vocale immédiate de la progression et des réponses du chatbot aux synthèses vocales.',
        'Navigation 100% clavier : Focus visible et ordre de tabulation logique sur chaque élément interactif.',
        'Contraste chromatique certifié : Ratios de contraste supérieurs à 4.5:1 conformes aux normes d\'accessibilité.',
      ],
    },
    alternative: {
      title: 'Boutons Fantômes et Divs Cliquables Anonymes',
      explanation: 'Créer des boutons avec de simples balises <div> stylisées en CSS sans rôles ni labels ARIA.',
      downside: 'Exclusion totale des utilisateurs utilisant un lecteur d\'écran et non-conformité aux exigences légales d\'accessibilité.',
    },
    keyTakeaway: 'L\'accessibilité n\'est pas une surcouche de confort : c\'est l\'essence même du web et le test ultime de la qualité de votre code HTML.',
  },
  '7-1': {
    title: '7.1 Architecture UML & Les 4 Piliers Fondamentaux',
    metaphor: {
      emoji: '🏛️',
      title: 'Les Quatre Colonnes du Temple Romain',
      description: 'Le toit du temple ne repose pas sur un bloc d\'argile informe, mais sur quatre colonnes de marbre distinctes qui portent chacune une charge précise.',
    },
    situation: {
      context: 'La complexité croissante d\'une plateforme d\'IA : ingestion, indexation vectorielle, gestion des sessions et orchestration d\'agents.',
      pressure: 'Mélanger le code de recherche vectorielle avec les routes d\'API et la logique de base de données dans un code spaghetti impossible à maintenir.',
    },
    solution: {
      title: 'Les 4 Piliers Découplés de l\'Architecture Sanad',
      explanation: 'Découpage architectural formel en 4 piliers indépendants : FastAPI (Interface), SQLite (État & Audit), Qdrant (Index Vectoriel), et LangGraph (Raisonnement).',
      keyPoints: [
        'FastAPI : Couche d\'exposition HTTP/REST asynchrone et validation Pydantic.',
        'SQLite WAL : Persistance relationnelle locale pour les métadonnées, sessions et traces d\'audit.',
        'Qdrant : Base vectorielle dédiée pour la recherche dense par similarité cosinus.',
        'LangGraph : Moteur de raisonnement cyclique orchestrant les nœuds de décision.',
      ],
    },
    alternative: {
      title: 'Le Monolithe Spaghetti Tout-en-Un',
      explanation: 'Écrire un seul fichier géant où les requêtes SQL, les appels d\'API et le code de parsing se mélangent sans frontière.',
      downside: 'Impossibilité d\'isoler les bugs, tests unitaires ingérables et effondrement du système à la moindre modification.',
    },
    keyTakeaway: 'Diviser son architecture en piliers aux responsabilités chirurgicales est la condition sine qua non de la pérennité logicielle.',
  },
  '7-2': {
    title: '7.2 Architecture Hexagonale & Les 8 Ports Explicites',
    metaphor: {
      emoji: '🔌',
      title: 'Le Tableau Électrique Modulaire avec Disjoncteurs Débrochables',
      description: 'Chaque circuit de la maison est branché sur un connecteur standardisé du tableau : vous pouvez changer le disjoncteur de la cuisine sans toucher au reste de l\'installation.',
    },
    situation: {
      context: 'La nécessité de tester unitairement la logique métier de l\'agent sans dépendre de l\'API OpenAI ou d\'un serveur Qdrant réel.',
      pressure: 'Coupler intimement le code de raisonnement aux SDKs de fournisseurs tiers rendant les tests lents, coûteux et fragiles.',
    },
    solution: {
      title: 'Architecture Hexagonale avec 8 Ports Abstraits Définis',
      explanation: 'Le domaine métier communique avec l\'extérieur uniquement à travers des interfaces (ports) explicites, implémentées par des adaptateurs interchangeables.',
      keyPoints: [
        'Ports d\'entrée et de sortie : IngestionPort, SearchPort, VectorPort, RelationalPort, LLMPort, etc.',
        'Testabilité absolue : Injection de simulacres (mocks) ultra-rapides en mémoire pendant les tests unitaires.',
        'Indépendance technologique : Possibilité de changer de base vectorielle ou de modèle LLM sans modifier une ligne de l\'agent.',
      ],
    },
    alternative: {
      title: 'Couplage Direct aux SDKs Externes',
      explanation: 'Instancier le client Qdrant ou OpenAI directement à l\'intérieur des boucles de raisonnement de l\'agent.',
      downside: 'Impossibilité de lancer des tests sans connexion internet et coûts d\'API exorbitants à chaque exécution de test.',
    },
    keyTakeaway: 'L\'architecture hexagonale protège votre valeur métier de la volatilité des technologies extérieures grâce à des interfaces étanches.',
  },
  '8-1': {
    title: '8.1 Schéma Relationnel SQLite, Cascades & Mode WAL',
    metaphor: {
      emoji: '📚',
      title: 'Le Registre Notarié Relié Plein Cuir',
      description: 'Chaque acte de propriété est numéroté dans l\'index général ; si une parcelle est officiellement dissoute, toutes ses sous-parcelles sont automatiquement invalidées.',
    },
    situation: {
      context: 'Des milliers de documents ingérés avec leurs métadonnées, versions, morceaux de texte et journaux d\'audit devant être lus et écrits simultanément.',
      pressure: 'Les corruptions de base de données SQLite en cas de crash intempestif ou les erreurs d\'incohérence (« document supprimé mais chunks encore présents »).',
    },
    solution: {
      title: 'Schéma Relationnel Rigoureux avec Suppressions en Cascade et Mode WAL',
      explanation: 'Définition stricte des clés étrangères ON DELETE CASCADE, typage SQL précis et activation permanente du Write-Ahead Logging (WAL) pour des lectures non-bloquantes.',
      keyPoints: [
        'Mode WAL activé : Concurrence élevée permettant des lectures simultanées pendant les opérations d\'écriture lourdes.',
        'Cascades automatiques : La suppression d\'un document nettoie immédiatement tous ses chunks et citations associées.',
        'Intégrité référentielle garantie : PRAGMA foreign_keys = ON activé à chaque ouverture de connexion.',
      ],
    },
    alternative: {
      title: 'Fichiers JSON Bruts Posés sur le Disque',
      explanation: 'Sauvegarder l\'état de l\'application dans de simples fichiers JSON modifiés par des scripts Python.',
      downside: 'Corruption irrémédiable des données lors d\'un arrêt forcé et présence de données orphelines fantômes.',
    },
    keyTakeaway: 'Une base relationnelle bien configurée avec intégrité référentielle et mode WAL offre la robustesse d\'un coffre-fort numérique sur un simple fichier local.',
  },
  '8-2': {
    title: '8.2 Topologie Qdrant & Moteur de Stockage Parent-Enfant',
    metaphor: {
      emoji: '🗂️',
      title: 'Les Fiches de Synthèse et les Classeurs d\'Archives',
      description: 'Pour trouver un dossier, vous consultez un fichier récapitulatif compact de 3 lignes ; une fois le dossier identifié, vous ouvrez le classeur complet de 10 pages.',
    },
    situation: {
      context: 'Le dilemme fondamental du RAG : un petit morceau de texte est idéal pour la recherche vectorielle précise, mais un grand morceau est nécessaire pour que le LLM comprenne le contexte.',
      pressure: 'Découper en gros morceaux dilue le vecteur et fait rater les réponses pointues ; découper en morceaux minuscules prive le LLM du contexte juridique global.',
    },
    solution: {
      title: 'Stockage Parent-Enfant Découplé (Parent-Child Indexing)',
      explanation: 'Indexation vectorielle dans Qdrant de morceaux enfants compacts (500 caractères) portant la référence vers un document parent plus large (4 000 caractères) stocké en SQLite.',
      keyPoints: [
        'Recherche chirurgicale : Qdrant calcule la distance cosinus sur des représentations denses et précises de 500 caractères.',
        'Restitution contextualisée : Lors de la génération, le système charge le bloc parent complet pour donner tout son sens au paragraphe.',
        'Métadonnées riches : Chaque vecteur stocke son numéro de page, son hash de fichier et son identifiant de workspace.',
      ],
    },
    alternative: {
      title: 'Taille de Chunk Unique Moyenne (ex: 1 000 caractères partout)',
      explanation: 'Utiliser une taille de découpage unique arbitraire pour la recherche et pour la génération.',
      downside: 'Compromis médiocre permanent : recherche imprécise et contexte tronqué au milieu d\'une phrase de loi.',
    },
    keyTakeaway: 'Le modèle parent-enfant réconcilie précision de recherche et exhaustivité de lecture en utilisant le bon format pour chaque étape.',
  },
  '8-3': {
    title: '8.3 Contrat d\'API OpenAPI 3.1 Figé & Détection de Dérive',
    metaphor: {
      emoji: '📐',
      title: 'Le Gabarit d\'Usinage Industriel en Acier Trempé',
      description: 'Chaque pièce sortie d\'usine doit s\'insérer au millimètre près dans le gabarit en acier ; si une cote varie d\'un dixième de millimètre, la chaîne s\'arrête net.',
    },
    situation: {
      context: 'Développement simultané de l\'interface utilisateur web et du backend FastAPI par deux personnes distinctes.',
      pressure: 'Un développeur modifie discrètement le nom d\'un champ JSON dans le backend (citation_id renommé en id), provoquant un crash silencieux de l\'interface en production.',
    },
    solution: {
      title: 'Contrat OpenAPI 3.1 Verrouillé avec Test Automatique de Dérive (Drift Test)',
      explanation: 'Spécification OpenAPI exportée et versionnée dans le dépôt Git, validée à chaque exécution de test pour détecter toute divergence entre le code et le contrat.',
      keyPoints: [
        'Schéma d\'API contractuel : Définition exacte des requêtes, réponses et codes d\'erreur HTTP.',
        'Test de non-dérive en CI : La suite de tests échoue automatiquement si un schéma Pydantic change sans mise à jour du contrat.',
        'Documentation interactive synchronisée : Swagger UI et Redoc reflètent fidèlement l\'état réel de l\'application.',
      ],
    },
    alternative: {
      title: 'Documentation d\'API Rédigée Manuellement sur Confluence',
      explanation: 'Décrire les points d\'entrée sur un wiki sans liaison automatique avec le code réel.',
      downside: 'Obsolescence immédiate de la documentation et perte de journées entières à déboguer des noms de paramètres incompatibles.',
    },
    keyTakeaway: 'Le contrat d\'API généré par le code et vérifié en continu est la seule garantie d\'une intégration sans friction entre frontend et backend.',
  },
  '9-1': {
    title: '9.1 Reprise Automatique des Ingestions Interrompues',
    metaphor: {
      emoji: '🔄',
      title: 'La Reprise de Téléchargement Résiliente',
      description: 'Si votre connexion internet coupe au milieu d\'un téléchargement volumineux, le gestionnaire reprend exactement à l\'octet où il s\'était arrêté sans tout recommencer.',
    },
    situation: {
      context: 'L\'ingestion d\'un classeur juridique de 500 pages peut prendre plusieurs minutes ; un redémarrage du serveur ou une coupure de courant peut survenir à tout instant.',
      pressure: 'Des documents bloqués indéfiniment avec le statut « En cours de traitement », ou la nécessité de supprimer manuellement la base pour tout relancer.',
    },
    solution: {
      title: 'Gestionnaire de Reprise au Démarrage (Recovery Lifecycle Hook)',
      explanation: 'Au lancement de FastAPI, un script scanne les documents en état suspendu (PROCESSING), vérifie les blocs déjà indexés et relance le travail interrompu.',
      keyPoints: [
        'Détection des tâches orphelines : Identification automatique des opérations interrompues par un crash.',
        'Idempotence de l\'ingestion : Traitement sûr pouvant être réexécuté sans créer de doublons dans SQLite ni dans Qdrant.',
        'Nettoyage préventif : Suppression des données temporaires corrompues avant reprise du flux normal.',
      ],
    },
    alternative: {
      title: 'Ignorer l\'État des Tâches Antérieures au Démarrage',
      explanation: 'Laisser les statuts en l\'état sans vérifier si le processus qui les traitait existe encore.',
      downside: 'Multiplication des documents bloqués à jamais et affichage d\'indicateurs de chargement infinis pour les utilisateurs.',
    },
    keyTakeaway: 'Un système de production doit savoir guérir de ses propres pannes : la routine de reprise au démarrage garantit la cohérence des données sans intervention humaine.',
  },
  '9-2': {
    title: '9.2 Chargement Unique Single-Flight & Protection de la RAM',
    metaphor: {
      emoji: '🛡️',
      title: 'Le Vigile du Monte-Charge d\'Immeuble',
      description: 'Dix déménageurs arrivent au même moment avec des cartons lourds : le vigile bloque la porte et fait monter un seul chariot à la fois pour éviter la rupture du câble.',
    },
    situation: {
      context: 'Le modèle d\'embedding multilingue pèse 500 Mo en mémoire vive ; charger plusieurs instances en parallèle lors de requêtes simultanées fait exploser la mémoire du conteneur.',
      pressure: 'L\'erreur fatale OOM (Out Of Memory) sous Linux où le système d\'exploitation tue brutalement le conteneur (SIGKILL).',
    },
    solution: {
      title: 'Verrou Mutex Single-Flight & Singleton de Modèle en Mémoire',
      explanation: 'Mise en place d\'un motif de conception Single-Flight avec verrou asynchrone : le premier thread charge le modèle une fois pour toutes, les autres attendent la référence partagée.',
      keyPoints: [
        'Instance unique (Singleton) : Le modèle d\'embedding n\'est présent qu\'une seule fois dans la mémoire vive du processus.',
        'Verrou d\'initialisation : Protection contre les conditions de concurrence au premier démarrage du serveur.',
        'Stabilité de l\'empreinte mémoire : Consommation RAM plafonnée et prévisible, parfaitement adaptée aux contraintes cloud (1 Go de RAM).',
      ],
    },
    alternative: {
      title: 'Instanciation Naïve par Requête',
      explanation: 'Créer une nouvelle instance de modèle à chaque appel de fonction d\'ingestion ou de recherche.',
      downside: 'Saturation immédiate de la mémoire vive et crash en chaîne du serveur en pleine démonstration.',
    },
    keyTakeaway: 'La maîtrise de l\'empreinte mémoire distingue le prototype de laboratoire du logiciel d\'ingénierie taillé pour la production.',
  },
  '10-1': {
    title: '10.1 Empreintes SHA-256 & Détection à 4 États',
    metaphor: {
      emoji: '🔍',
      title: 'L\'Empreinte Digitale Biométrique et le Tampon Notarié',
      description: 'Deux documents peuvent porter le même titre de couverture ; seul le scan de l\'empreinte digitale permet de savoir si une seule virgule a été changée à l\'intérieur.',
    },
    situation: {
      context: 'Des dossiers d\'entreprise synchronisés régulièrement où des centaines de fichiers sont re-téléversés alors que seuls trois d\'entre eux ont été modifiés.',
      pressure: 'Ré-ingérer et ré-indexer inutilement des milliers de pages, gaspillant des heures de calcul et saturant la base vectorielle de doublons.',
    },
    solution: {
      title: 'Détection Différentielle par Hash SHA-256 à 4 États',
      explanation: 'Calcul de l\'empreinte SHA-256 du contenu de chaque fichier et transition déterministe entre 4 états : NOUVEAU, INCHANGÉ, MODIFIÉ, et ORPHELIN.',
      keyPoints: [
        'État INCHANGÉ : Aucun calcul d\'ingestion ni d\'embedding exécuté si le hash correspond.',
        'État MODIFIÉ : Purge ciblée des anciens chunks et ré-indexation propre de la nouvelle version.',
        'État ORPHELIN : Détection et suppression automatique des vecteurs de fichiers supprimés du disque.',
      ],
    },
    alternative: {
      title: 'Ré-indexation Intégrale Aveugle à Chaque Synchronisation',
      explanation: 'Écraser toute la base de données et recalculer l\'intégralité des embeddings à chaque nouveau fichier.',
      downside: 'Temps d\'ingestion exponentiel, facturation excessive et indisponibilité prolongée du service.',
    },
    keyTakeaway: 'Le traitement différentiel par empreinte cryptographique transforme la maintenance documentaire lourde en une opération quasi-instantanée.',
  },
  '10-2': {
    title: '10.2 L\'Échelle de Conversion & L\'Extraction de Texte',
    metaphor: {
      emoji: '🪜',
      title: 'L\'Échelle Télescopique des Pompiers',
      description: 'Les pompiers déploient d\'abord l\'échelle légère pour accéder au balcon ; si l\'accès est bloqué par des décombres, ils sortent la grande échelle motorisée de sauvetage.',
    },
    situation: {
      context: 'Une variété hétérogène de documents juridiques : textes numériques parfaits, PDF générés par scan de photocopies, et documents Word complexes avec tableaux.',
      pressure: 'Les échecs d\'extraction silencieux : obtenir des chaînes de caractères vides ou des caractères corrompus (mojibake) qui polluent irrémédiablement la base de connaissances.',
    },
    solution: {
      title: 'Échelle de Conversion en Cascade avec Préservation de la Structure',
      explanation: 'Pipeline séquentiel tentant d\'abord l\'extraction native ultra-rapide (PyMuPDF), puis basculant vers l\'OCR haute fidélité si la densité de texte est inférieure au seuil critique.',
      keyPoints: [
        'Contrôle de densité textuelle : Vérification automatique du ratio caractères / surface de page.',
        'Extraction robuste des tableaux : Conservation de la structure tabulaire pour les barèmes d\'indemnités de licenciement.',
        'Nettoyage typographique : Normalisation des espaces insécables et suppression des artefacts d\'encodage.',
      ],
    },
    alternative: {
      title: 'Extraction Monolithique avec Outil Unique Rigide',
      explanation: 'Imposer une seule bibliothèque de lecture aveugle à tous les formats de fichiers sans contrôle de qualité intermédiaire.',
      downside: 'Extraction de textes tronqués, tableaux détruits et incapacité à lire les contrats scannés.',
    },
    keyTakeaway: 'Une cascade d\'extraction adaptative garantit qu\'aucun document n\'est laissé pour compte, quel que soit son état d\'origine.',
  },
  '10-3': {
    title: '10.3 Vecteurs Denses & Préfixes E5 Obligatoires',
    metaphor: {
      emoji: '🧭',
      title: 'Le Code Radio Militaire avec Indicatifs Réglementaires',
      description: 'Sur la fréquence radio, vous devez obligatoirement annoncer \'Ici Alpha, demandons confirmation...\' avant d\'émettre votre message ; sans cet indicatif, le centre de commandement rejette la transmission.',
    },
    situation: {
      context: 'Utilisation du modèle d\'embedding asymétrique de pointe multilingual-e5-base pour indexer des textes en français et en arabe.',
      pressure: 'Les modèles E5 ont été entraînés avec des préfixes obligatoires : oublier le préfixe réduit drastiquement la précision de similarité sémantique.',
    },
    solution: {
      title: 'Application Systématique des Préfixes E5 (\'passage:\' et \'query:\')',
      explanation: 'Le code d\'ingestion injecte automatiquement le préfixe passage:  avant tout chunk indexé, et le service de recherche injecte query:  avant la question de l\'utilisateur.',
      keyPoints: [
        'Alignement latent parfait : Les passages et les requêtes se positionnent dans les espaces optimaux prévus par les auteurs du modèle.',
        'Support multilingue natif : Rapprochement sémantique fluide entre des requêtes en arabe et des textes de loi en français.',
        'Normalisation L2 des vecteurs : Distance cosinus calculée par simple produit scalaire ultra-rapide.',
      ],
    },
    alternative: {
      title: 'Génération de Vecteurs sans Préfixe E5',
      explanation: 'Calculer les embeddings directement sur le texte brut sans le préfixe exigé par la documentation de HuggingFace.',
      downside: 'Chute vertigineuse de 15 à 25% de la précision de recherche (Recall@5) et faux positifs massifs.',
    },
    keyTakeaway: 'Respecter les contrats d\'entrée stricts des modèles d\'IA est le secret le plus rentable pour démultiplier la pertinence sans changer de modèle.',
  },
  '11-1': {
    title: '11.1 La Machine à États Cyclique à 9 Nœuds',
    metaphor: {
      emoji: '⚙️',
      title: 'Le Mécanisme d\'Horlogerie Suisse à Complications',
      description: 'Chaque rouage engrène le suivant avec une précision chirurgicale ; si une dent saute ou si le ressort bloque, un cliquet de rappel repositionne le balancier dans sa trajectoire normale.',
    },
    situation: {
      context: 'Les questions juridiques complexes ne peuvent pas être résolues par un simple appel \'Prompt + Recherche + Réponse\' linéaire sans contrôle qualité.',
      pressure: 'Les pipelines RAG naïfs renvoient des réponses directes même si la recherche initiale a ramené des documents totalement hors sujet.',
    },
    solution: {
      title: 'Orchestration Cyclique LangGraph à 9 Nœuds Dédiés',
      explanation: 'Une machine à états finis formelle modélisée sous LangGraph, intégrant des étapes de qualification, recherche hybride, notation de pertinence, reformulation et génération contrôlée.',
      keyPoints: [
        'Les 9 étapes clés : check_clarity, retrieve, grade_documents, reword_query, generate_answer, grade_answer, etc.',
        'Boucle conditionnelle : Capacité de réécrire la requête et de réitérer la recherche jusqu\'à 3 fois si les résultats sont insuffisants.',
        'Sortie déterministe : Si après 3 tentatives les documents ne suffisent pas, dérivation immédiate vers le nœud de refus honnête.',
      ],
    },
    alternative: {
      title: 'Chaîne Linéaire Naïve (Chain LangChain)',
      explanation: 'Enchaîner séquentiellement sans jamais pouvoir revenir en arrière ni vérifier la qualité intermédiaire des résultats.',
      downside: 'Génération forcée de réponses erronées dès que la première recherche renvoie un résultat imprécis.',
    },
    keyTakeaway: 'L\'architecture d\'agent cyclique avec points de contrôle intermédiaire est l\'unique façon de garantir la fiabilité du raisonnement automatisé.',
  },
  '11-2': {
    title: '11.2 Recherche Hybride & Fusion par Rang Réciproque (RRF)',
    metaphor: {
      emoji: '🎯',
      title: 'Les Deux Détectives aux Méthodes Complémentaires',
      description: 'L\'un des détectives cherche le numéro de plaque d\'immatriculation exact dans les registres (BM25) ; l\'autre étudie la psychologie et les motivations du suspect (Recherche Sémantique Qdrant). Quand leurs listes placent la même personne en tête, vous tenez le coupable.',
    },
    situation: {
      context: 'Des requêtes juridiques qui mélangent des termes exacts de référence d\'articles de loi (\'Article 62\') et des concepts flous (\'indemnité en cas de renvoi injustifié\').',
      pressure: 'La recherche purement vectorielle échoue souvent à retrouver les numéros d\'articles précis, tandis que la recherche par mots-clés échoue sur les synonymes.',
    },
    solution: {
      title: 'Recherche Hybride avec Algorithme RRF (k=60)',
      explanation: 'Combinaison de la recherche lexicale SQLite FTS5 et de la recherche dense Qdrant, fusionnées par la formule mathématique Reciprocal Rank Fusion avec constante k=60.',
      keyPoints: [
        'Formule RRF : RRF_Score(d) = somme(1 / (k + rang(d))) pour chaque méthode de recherche.',
        'Élimination des problèmes d\'échelle : Le rang relatif est utilisé au lieu des scores bruts incompatibles des deux moteurs.',
        'Rappel maximal (Recall@5) : Les documents contenant à la fois les bons mots-clés et le bon sens sémantique remontent mécaniquement au sommet.',
      ],
    },
    alternative: {
      title: 'Recherche Purement Sémantique Vectorielle',
      explanation: 'Se reposer exclusivement sur les embeddings sans recherche lexicale pour tous les types de questions.',
      downside: 'Incapacité frustrante à retrouver un numéro d\'article de loi pourtant tapé mot pour mot par le juriste.',
    },
    keyTakeaway: 'La fusion par rang réciproque tire parti du meilleur des deux mondes : la précision chirurgicale du mot-clé et l\'intelligence de la sémantique.',
  },
  '11-3': {
    title: '11.3 Notation de Pertinence & Boucles de Reformulation',
    metaphor: {
      emoji: '🔄',
      title: 'L\'Assistant Bibliothécaire qui Affine sa Recherche',
      description: 'L\'assistant lit les trois premiers livres trouvés. S\'il constate qu\'ils parlent d\'un autre décret, il retourne au fichier central, reformule sa recherche avec des termes plus précis, et rapporte enfin l\'ouvrage parfait.',
    },
    situation: {
      context: 'Des utilisateurs posant des questions avec un vocabulaire familier ou imprécis (\'licenciement abusif\' au lieu de \'licenciement sans motif valable\' selon le Code marocain).',
      pressure: 'Envoyer des extraits non pertinents au modèle de génération finale augmente exponentiellement le risque d\'hallucination ou de refus injustifié.',
    },
    solution: {
      title: 'Nœud de Notation Binaire (Grade Documents) & Reformulateur de Requête',
      explanation: 'Un appel ciblé et ultra-rapide à un petit modèle de notation qui classe chaque chunk comme PERTINENT ou NON-PERTINENT, déclenchant une reformulation si moins de 2 chunks sont valides.',
      keyPoints: [
        'Filtre de pertinence strict : Seuls les extraits réellement utiles sont conservés pour alimenter la synthèse finale.',
        'Reformulation intelligente : Le LLM réécrit la requête en employant le vocabulaire juridique formel marocain.',
        'Garde-fou de boucle : Compteur d\'itérations plafonné à 3 pour éviter toute boucle infinie et maîtriser les temps de réponse.',
      ],
    },
    alternative: {
      title: 'Alimentation Aveugle du Modèle Final',
      explanation: 'Injecter sans filtrage les 10 premiers résultats retournés par le moteur de recherche dans le prompt de génération.',
      downside: 'Le modèle est distrait par des informations connexes non pertinentes et fabrique des réponses ambiguës ou contradictoires.',
    },
    keyTakeaway: 'La notation intermédiaire des documents sépare le bon grain de l\'ivraie avant la phase finale d\'écriture : c\'est le secret d\'une réponse concise et fidèle.',
  },
  '12-1': {
    title: '12.1 Le Benchmark d\'Or Figé de 60 Questions',
    metaphor: {
      emoji: '📋',
      title: 'L\'Examen National Standardisé sous Clé',
      description: 'Chaque candidat à l\'examen d\'État passe exactement la même épreuve de 60 questions conçue par des juristes chevronnés, avec son barème de correction inviolable conservé au coffre-fort.',
    },
    situation: {
      context: 'La tentation d\'évaluer le système RAG avec 3 ou 4 questions informelles posées au clavier selon l\'inspiration du moment.',
      pressure: 'L\'illusion du progrès : corriger un bug sur une question et créer silencieusement dix régressions sur d\'autres sujets juridiques.',
    },
    solution: {
      title: 'Benchmark d\'Or de 60 Questions Couvrant Tous les Cas d\'Usage',
      explanation: 'Un jeu de données de référence figé de 60 questions-réponses minutieusement annotées par des experts juridiques et de test, couvrant droit du travail, pièges et questions hors-domaine.',
      keyPoints: [
        'Couverture exhaustive : Questions simples, questions à articles multiples, cas limites de calcul d\'indemnités et 10 questions hors-sujet.',
        'Vérités de terrain vérifiées : Chaque question est associée à son texte de référence attendu et aux articles de loi officiels.',
        'Exécution automatisée : Lancement du benchmark en une commande CLI unique générant un rapport statistique complet.',
      ],
    },
    alternative: {
      title: 'Évaluation Informelle Ad Hoc',
      explanation: 'Tester le chatbot en lui posant \'Bonjour, comment vas-tu ?\' et deux questions simples avant chaque mise en production.',
      downside: 'Découverte catastrophique des hallucinations lors de la démonstration devant le client ou le jury académique.',
    },
    keyTakeaway: 'Sans benchmark de référence figé, l\'amélioration d\'un système d\'IA n\'est qu\'une illusion d\'optique : mesurer avec rigueur est la première étape du contrôle.',
  },
  '12-2': {
    title: '12.2 Les 3 Portes de Sortie Non Négociables (Release Gates)',
    metaphor: {
      emoji: '🚪',
      title: 'Les Trois Sas de Sécurité du Laboratoire P4',
      description: 'Vous ne pouvez franchir le premier sas que si la combinaison est étanche ; le deuxième exige la douche décontaminante ; le troisième vérifie la pression négative. Si un seul indicateur est au rouge, les portes restent verrouillées.',
    },
    situation: {
      context: 'La tentation de déployer une nouvelle version du modèle pour respecter une date de livraison malgré des baisses de qualité.',
      pressure: 'Pousser en production une version qui régresse sur les citations ou commence à inventer des articles de loi fictifs.',
    },
    solution: {
      title: 'Les 3 Portes de Sortie Automatisées Inviolables',
      explanation: 'Trois critères métriques quantitatifs stricts imposés dans le script de validation avant toute autorisation de mise en production.',
      keyPoints: [
        'Porte 1 (Fidélité RAGAS) : Score de fidélité supérieur ou égal à 0.90 sur l\'ensemble du benchmark.',
        'Porte 2 (Refus Hors-Domaine) : 100% de refus déterministe (NOT_COVERED) sur les 10 questions hors-corpus.',
        'Porte 3 (Précision des Citations) : 100% des citations renvoyées doivent pointer vers un article et une page réellement existants.',
      ],
    },
    alternative: {
      title: 'Déploiement Basé sur l\'Intuition et l\'Urgence',
      explanation: 'Ignorer les résultats des tests automatiques pour tenir à tout prix la date promise au calendrier.',
      downside: 'Mise en danger immédiate des utilisateurs et perte irréversible de confiance envers la solution logicielle.',
    },
    keyTakeaway: 'Les portes de sortie automatisées retirent l\'émotion de la décision de livraison : le code ne passe que si les chiffres le prouvent.',
  },
  '12-3': {
    title: '12.3 Le Registre de Prompts Verrouillé & Versionnement SemVer',
    metaphor: {
      emoji: '📜',
      title: 'La Pharmacopée Officielle des Préparations Médicales',
      description: 'La formule de chaque médicament est enregistrée avec son numéro de version exact dans la pharmacopée nationale ; aucun pharmacien n\'a le droit de modifier une dose en douce sans réédition officielle.',
    },
    situation: {
      context: 'Des développeurs modifiant les textes de prompts système directement dans le code source Python au détour d\'un commit sans traçabilité.',
      pressure: 'L\'impossibilité de comprendre pourquoi le système s\'est mis subitement à halluciner le mardi alors qu\'il fonctionnait parfaitement le lundi.',
    },
    solution: {
      title: 'Registre Centralisé de Prompts sous Versionnement Sémantique',
      explanation: 'Tous les prompts de l\'agent sont isolés dans un module dédié (prompts.py), typés avec Pydantic, et identifiés par un numéro de version sémantique formel (ex: v1.2.0).',
      keyPoints: [
        'Isolation complète : Zéro chaîne de caractères de prompt dispersée dans les fonctions de l\'agent.',
        'Traçabilité historique : Chaque réponse enregistre en base la version exacte du prompt qui l\'a produite.',
        'Immutabilité : Une version de prompt publiée n\'est jamais modifiée sur place ; toute altération donne lieu à un nouveau numéro de version.',
      ],
    },
    alternative: {
      title: 'Prompts Éparpillés en Dur dans le Code',
      explanation: 'Écrire de longues chaînes de caractères de prompt au milieu des fonctions de nœuds de manière anonyme.',
      downside: 'Chaos de maintenance, impossibilité d\'effectuer des tests A/B fiables et régression permanente des comportements de l\'agent.',
    },
    keyTakeaway: 'Traiter les prompts d\'IA avec la même rigueur d\'ingénierie que les schémas de base de données est le garant de la reproductibilité scientifique.',
  },
  '13-1': {
    title: '13.1 Authentification Keycloak OIDC & Cookies Chiffrés',
    metaphor: {
      emoji: '🏰',
      title: 'Le Pont-Levis et les Passeports Royaux avec Sceau de Cire',
      description: 'Chaque visiteur doit présenter son passeport royal scellé au capitaine de la garde du pont-levis avant d\'entrer dans la forteresse ; une fois admis, il reçoit un médaillon chiffré infalsifiable.',
    },
    situation: {
      context: 'Une application d\'entreprise accédant à des documents juridiques et sociaux confidentiels nécessite une authentification de niveau bancaire.',
      pressure: 'Les jetons JWT stockés en clair dans le LocalStorage du navigateur sont vulnérables au vol par attaques Cross-Site Scripting (XSS).',
    },
    solution: {
      title: 'Fédération d\'Identité Keycloak OIDC avec Cookies Sécurisés AES-GCM',
      explanation: 'Authentification déléguée à un serveur Keycloak d\'entreprise via le protocole OpenID Connect, avec stockage de session dans des cookies HTTP-Only chiffrés côté serveur.',
      keyPoints: [
        'Protocole OIDC standard : Authentification centralisée avec gestion du cycle de vie des sessions et déconnexion unique (Single Sign-Out).',
        'Cookies HttpOnly & SameSite=Strict : Les jetons d\'accès sont inaccessibles au code JavaScript du navigateur, neutralisant le vol XSS.',
        'Chiffrement AES-GCM : La charge utile du cookie de session est cryptée avec une clé secrète tournante avant expédition au client.',
      ],
    },
    alternative: {
      title: 'Stockage des Jetons d\'Accès dans LocalStorage',
      explanation: 'Sauvegarder les jetons JWT directement dans le stockage local du navigateur par commodité de développement.',
      downside: 'Un simple script tiers malveillant ou une faille XSS mineure suffit pour aspirer toutes les sessions des utilisateurs actifs.',
    },
    keyTakeaway: 'La sécurité d\'authentification moderne protège les jetons sensibles derrière des cookies HttpOnly chiffrés : ce que le navigateur ne peut pas lire ne peut pas être volé.',
  },
  '13-2': {
    title: '13.2 Matrice RBAC à 4 Niveaux & Quarantaine des Nouveaux Inscrits',
    metaphor: {
      emoji: '🎖️',
      title: 'Les 4 Cercles d\'Habilitation et le Sas d\'Accueil des Visiteurs',
      description: 'Un visiteur qui s\'enregistre à l\'accueil reste dans le sas vitré sous surveillance ; il ne peut franchir aucune porte menant aux étages tant qu\'un officier de sécurité n\'a pas validé son accréditation.',
    },
    situation: {
      context: 'Des utilisateurs s\'inscrivant d\'eux-mêmes sur le portail d\'entreprise Sanad lors des phases de déploiement pilote.',
      pressure: 'Si un nouvel inscrit obtient immédiatement les droits de lecture par défaut, il pourrait consulter des contrats de travail sensibles dès sa première minute de connexion.',
    },
    solution: {
      title: 'Contrôle d\'Accès RBAC à 4 Rôles avec Statut Quarantaine Obligatoire',
      explanation: 'Matrice de permissions rigide à 4 rôles (Admin, Analyste, Juriste, Lecteur), avec affectation automatique du rôle temporaire \'EN_ATTENTE_VALIDATION\' à l\'inscription.',
      keyPoints: [
        'Les 4 rôles métiers : Administrateur (gestion globale), Analyste (ingestion et configuration), Juriste (consultation et requêtes expertes), Lecteur (consultation simple).',
        'Quarantaine par défaut : Tout nouvel utilisateur créé voit ses accès restreints au seul écran de bienvenue en attente d\'approbation par l\'administrateur.',
        'Application stricte dans FastAPI : Décorateurs de dépendance (Depends(require_role(...))) vérifiant les droits sur chaque point d\'accès.',
      ],
    },
    alternative: {
      title: 'Accès Ouvert par Défaut avec Permissions Implicites',
      explanation: 'Accorder automatiquement le droit de lecture de tous les documents à tout utilisateur qui réussit à se connecter.',
      downside: 'Violation flagrante du principe de moindre privilège et exposition incontrôlée de secrets d\'entreprise.',
    },
    keyTakeaway: 'Le principe du moindre privilège et la quarantaine des nouveaux inscrits garantissent qu\'aucune donnée confidentielle n\'est exposée sans acte d\'autorisation explicite.',
  },
  '14-1': {
    title: '14.1 Isolation des Workspaces & Parade BOLA par 404 Silencieux',
    metaphor: {
      emoji: '🚪',
      title: 'Les Chambres de Coffre Anonymes sans Numéro Apparent',
      description: 'Si un individu tente d\'ouvrir une porte avec une fausse clé, le garde ne lui dit pas \'Cette chambre appartient à Monsieur Dupont mais vous n\'avez pas la clé\' ; il répond simplement \'Cette porte n\'existe pas\'.',
    },
    situation: {
      context: 'Des attaquants manipulant les identifiants d\'objets dans les URLs (ex: passer de /workspace/1/doc/42 à /workspace/1/doc/43) pour sonder l\'existence de fichiers concurrents.',
      pressure: 'Une réponse HTTP 403 Forbidden confirme à l\'attaquant que la ressource existe bien et qu\'il a trouvé une cible intéressante à attaquer.',
    },
    solution: {
      title: 'Défense BOLA par Erreur 404 Silencieuse & Requêtes Toujours Paramétrées par Workspace',
      explanation: 'Toute requête de base de données filtre impérativement par workspace_id de l\'utilisateur connecté ; si la ressource n\'appartient pas au workspace, l\'API renvoie un 404 Not Found indifférencié.',
      keyPoints: [
        'Parade BOLA (Broken Object-Level Authorization) : Impossibilité totale de savoir si un identifiant de document existe dans un autre compte.',
        'Zéro fuite d\'information : Le code d\'état HTTP 404 masque l\'existence même de données confidentielles aux attaquants curieux.',
        'Double barrière physique : Contrôle au niveau de la requête SQL et au niveau du filtre de métadonnées vectoriel Qdrant.',
      ],
    },
    alternative: {
      title: 'Renvoyer des Erreurs 403 Forbidden Détaillées',
      explanation: 'Répondre avec un message d\'erreur indiquant que l\'utilisateur n\'a pas les droits requis pour consulter ce document particulier.',
      downside: 'L\'attaquant cartographie facilement l\'intégralité des identifiants valides de votre système par simple balayage séquentiel.',
    },
    keyTakeaway: 'En matière de sécurité d\'entreprise, le silence est d\'or : renvoyer un 404 indifférencié élimine toute possibilité de cartographie offensive.',
  },
  '14-2': {
    title: '14.2 Traversée de Répertoire, Injection SQL & Hygiène des Secrets',
    metaphor: {
      emoji: '🧱',
      title: 'Les Murs Pare-Feu et le Coffre-Fort à Combinaison',
      description: 'Les courriers sont inspectés à l\'entrée pour s\'assurer qu\'aucune poudre suspecte n\'y est cachée ; les codes d\'accès secrets ne sont jamais inscrits sur un post-it collé à l\'écran de l\'accueil.',
    },
    situation: {
      context: 'L\'ingestion de fichiers dont les noms sont forgés pour manipuler le système de fichiers (ex: ../../../../etc/passwd) ou injecter du code malveillant.',
      pressure: 'Une simple faille de traversée de répertoire (Path Traversal) permettrait à un attaquant de lire les fichiers de configuration du serveur ou le code source.',
    },
    solution: {
      title: 'Désinfection Stricte des Entrées & Zéro Secret dans Git',
      explanation: 'Validation chirurgicale des noms de fichiers avec remplacement par des UUIDs déterministes, requêtes SQL préparées à 100% et bannissement absolu des clés dans le dépôt Git.',
      keyPoints: [
        'Nommage sécurisé : Les fichiers téléversés sont renommés sur le disque avec des identifiants sécurisés sans jamais conserver les chemins relatifs d\'origine.',
        'Requêtes paramétrées : Aucune concaténation de chaînes SQL n\'est autorisée dans tout le code source de Sanad.',
        'Crochets pre-commit de sécurité : Outils automatiques (Trufflehog, GitGuardian) bloquant tout commit contenant une clé d\'API ou un mot de passe.',
      ],
    },
    alternative: {
      title: 'Faire Confiance au Nom de Fichier Fourni par le Client',
      explanation: 'Écrire le fichier directement sur le disque avec le nom envoyé par le navigateur dans l\'en-tête de requête.',
      downside: 'Écrasement accidentel ou malveillant de fichiers système critiques et prise de contrôle totale du serveur.',
    },
    keyTakeaway: 'Ne faites jamais confiance aux entrées de l\'utilisateur : assainissez les chemins, paramétrez les requêtes et gardez vos secrets hors de Git.',
  },
  '14-3': {
    title: '14.3 Conformité Loi Marocaine 09-08 & Protection des Données',
    metaphor: {
      emoji: '🇲🇦',
      title: 'L\'Auditeur Assermenté de la CNDP',
      description: 'L\'inspecteur de la Commission Nationale de contrôle de la protection des Données à caractère Personnel (CNDP) vérifie chaque registre de traitement et s\'assure que les données des citoyens restent sur le sol national.',
    },
    situation: {
      context: 'Le traitement de données personnelles de salariés marocains (bulletins de paie, sanctions disciplinaires, contrats de travail) par une solution d\'IA.',
      pressure: 'Le transfert illégal de données personnelles vers des serveurs étrangers non agréés constitue une infraction pénale passible de lourdes sanctions financières et judiciaires.',
    },
    solution: {
      title: 'Conformité Intégrale aux Exigences de la Loi 09-08',
      explanation: 'Architecture respectant scrupuleusement la souveraineté des données : hébergement souverain, anonymisation préalable des identifiants sensibles et droit à l\'oubli garanti.',
      keyPoints: [
        'Souveraineté territoriale : Indexation et traitement vectoriel assurés en local ou sur infrastructure conforme aux directives de la CNDP.',
        'Anonymisation à la volée : Masquage automatique des numéros de CIN, des coordonnées bancaires et des données de santé avant tout traitement.',
        'Purge intégrale certifiée : La suppression d\'un collaborateur efface immédiatement toutes ses traces dans SQLite, Qdrant et les sauvegardes.',
      ],
    },
    alternative: {
      title: 'Envoi Aveugle de Documents RH vers des APIs Étrangères',
      explanation: 'Téléverser des contrats de travail non anonymisés directement sur des modèles hébergés sur le cloud public sans convention de transfert.',
      downside: 'Violation frontale de la législation marocaine sur la vie privée et mise en demeure immédiate de l\'entreprise par la CNDP.',
    },
    keyTakeaway: 'L\'ingénierie responsable intègre la conformité juridique dès la première ligne de code : respecter la Loi 09-08 est un impératif d\'éthique et de sécurité.',
  },
  '15-1': {
    title: '15.1 Python 3.12, Astral uv & PyTorch Version CPU',
    metaphor: {
      emoji: '⚡',
      title: 'La Formule 1 Allégée pour la Course en Montagne',
      description: 'Sur une route étroite de montagne, vous ne prenez pas un camion lourd de 40 tonnes avec grue intégrée ; vous pilotez une sportive allégée qui négocie les virages en une fraction de seconde.',
    },
    situation: {
      context: 'L\'installation des bibliothèques de Machine Learning en Python prend souvent 15 minutes et télécharge 4 Go de pilotes graphiques CUDA inutiles sur un serveur CPU.',
      pressure: 'Des temps de construction de conteneur interminables qui ralentissent les cycles d\'itération et font dépasser les quotas de stockage des hébergeurs cloud.',
    },
    solution: {
      title: 'Modernisation Radicale avec uv et PyTorch CPU Léger',
      explanation: 'Adoption d\'Astral uv pour une gestion instantanée des paquets Python 3.12 et verrouillage strict des dépendances PyTorch sur l\'index CPU uniquement.',
      keyPoints: [
        'Builds instantanés : uv sync installe l\'ensemble des 80 dépendances en moins de 3 secondes montre en main.',
        'Empreinte allégée : Économie de 3 Go d\'espace disque en éliminant les binaires CUDA incompatibles avec les serveurs d\'hébergement CPU standard.',
        'Fichier de verrou déterministe : uv.lock garantit que chaque membre de l\'équipe et le serveur de production exécutent exactement les mêmes versions d\'octets.',
      ],
    },
    alternative: {
      title: 'Pip Standard avec Téléchargement CUDA par Défaut',
      explanation: 'Utiliser pip install torch standard sans spécifier l\'index de distribution CPU.',
      downside: 'Téléchargement interminable de 4 Go de pilotes Nvidia inutiles et échec systématique des builds sur les serveurs d\'intégration continue.',
    },
    keyTakeaway: 'La vélocité d\'une équipe technique commence par la légèreté de son outillage : des outils ultra-rapides comme uv rendent le développement fluide et agréable.',
  },
  '15-2': {
    title: '15.2 Construction Docker Multi-Étapes & Utilisateur Non-Privilégié',
    metaphor: {
      emoji: '🐳',
      title: 'La Combinaison Spatial avec Double Sas et Accréditation Civile',
      description: 'L\'ingénieur qui conçoit le moteur dans l\'atelier lourd d\'usinage n\'embarque pas ses tours et ses fraiseuses dans la fusée ; seule la pièce finie et polie est transférée dans la capsule, pilotée par un astronaute sans privilèges démesurés.',
    },
    situation: {
      context: 'L\'exécution d\'un conteneur d\'IA en production avec les droits super-utilisateur (root).',
      pressure: 'Si une faille de sécurité survient dans une bibliothèque d\'analyse de PDF, l\'attaquant qui prend le contrôle du processus hérite immédiatement des droits d\'administration sur tout le système.',
    },
    solution: {
      title: 'Dockerfile Multi-Stage Optimisé avec Utilisateur Non-Root \'sanaduser\'',
      explanation: 'Séparation stricte entre l\'étape de construction (compilation des dépendances) et l\'étape d\'exécution finale, exécutée sous un compte système non-privilégié (UID 10001).',
      keyPoints: [
        'Image finale dépouillée : Pas de compilateurs C ni de caches temporaires dans l\'image de production finale (gain de 70% de taille).',
        'Utilisateur système dédié : Exécution obligatoire sous USER sanaduser interdisant toute modification des fichiers système en cas d\'intrusion.',
        'Surface d\'attaque minimale : Seuls les répertoires de données montés explicitement sont accessibles en écriture par l\'application.',
      ],
    },
    alternative: {
      title: 'Image Unique Monolithique Exécutée en Root',
      explanation: 'Compiler et exécuter tout le code dans une même image Docker sous l\'utilisateur root par facilité.',
      downside: 'Conteneur obèse de 5 Go et risque majeur d\'évasion de conteneur en cas d\'exploitation d\'une vulnérabilité logicielle.',
    },
    keyTakeaway: 'Un conteneur d\'ingénierie propre est léger, ne contient aucun outil de développement inutile et refuse catégoriquement d\'exécuter son code en root.',
  },
  '15-3': {
    title: '15.3 Déploiement Cloud Railway, Disques Persistants & Sondes de Santé',
    metaphor: {
      emoji: '☁️',
      title: 'La Station Météo Autonome avec Balise de Détresse',
      description: 'La station météo perchée sur la montagne enregistre ses données sur une mémoire flash résistante au gel et émet un battement de cœur radio régulier vers la vallée ; si le signal s\'arrête, un drone de secours est dépêché automatiquement.',
    },
    situation: {
      context: 'Le déploiement de Sanad sur une infrastructure cloud sans serveur (Serverless) où le disque local est éphémère et s\'efface à chaque redémarrage.',
      pressure: 'Perdre l\'ensemble de la base SQLite et des index vectoriels Qdrant dès que la plateforme d\'hébergement redéploie le conteneur pour maintenance.',
    },
    solution: {
      title: 'Hébergement Railway avec Volume Persistant Monté sur /app/data & Sondes /health',
      explanation: 'Configuration d\'un volume de stockage persistant attaché au conteneur, complété par des sondes de santé HTTP pour surveiller la disponibilité des briques.',
      keyPoints: [
        'Persistance absolue : La base SQLite et les collections Qdrant résident sur le volume persistant, survivant à tous les redéploiements.',
        'Sonde de santé proactive (/health) : Vérification périodique de la disponibilité de la base et de la mémoire disponible.',
        'Redémarrage automatique : En cas d\'incident ou de saturation ponctuelle, le superviseur relance le conteneur proprement en moins de 5 secondes.',
      ],
    },
    alternative: {
      title: 'Stockage des Données dans le Système de Fichiers Éphémère',
      explanation: 'Enregistrer la base de données dans le répertoire racine du conteneur sans volume monté persistant.',
      downside: 'Perte intégrale et définitive de toutes les données d\'ingestion et de tous les comptes utilisateurs lors de la première mise à jour logicielle.',
    },
    keyTakeaway: 'Dans le cloud, tout conteneur est éphémère par nature : la persistance des données doit être explicitement garantie par des montages de volumes dédiés.',
  },
  '16-1': {
    title: '16.1 Cycle de Vie FastAPI & Validation de Configuration (app.py & config.py)',
    metaphor: {
      emoji: '🚦',
      title: 'La Procédure de Décollage Avant Vol du Pilote de Ligne',
      description: 'Avant d\'allumer les réacteurs, le commandant coche chaque ligne de sa liste de contrôle : pression hydraulique, quantité de carburant et instruments de bord. Si un seul voyant rouge s\'allume, l\'avion reste au parking.',
    },
    situation: {
      context: 'Démarrer le serveur d\'application alors qu\'une variable d\'environnement critique (clé d\'API, chemin de base de données) est manquante ou mal orthographiée.',
      pressure: 'Découvrir l\'erreur en pleine démonstration ou après 3 heures de fonctionnement lors du premier appel d\'un utilisateur.',
    },
    solution: {
      title: 'Validation Pydantic au Démarrage & Gestionnaire de Cycle de Vie \'Lifespan\'',
      explanation: 'Utilisation du gestionnaire de contexte lifespan de FastAPI pour initialiser et vérifier toutes les connexions (SQLite, Qdrant) avec validation stricte Pydantic de la configuration.',
      keyPoints: [
        'Échec bruyant immédiat (Fail-Fast) : Le serveur refuse catégoriquement de démarrer si une variable d\'environnement requise est invalide.',
        'Initialisation propre des ressources : Création des tables de base de données et connexion à la base vectorielle lors du démarrage du serveur.',
        'Fermeture gracieuse : Déconnexion propre et synchronisation des fichiers d\'écriture sur le disque lors de l\'arrêt du processus.',
      ],
    },
    alternative: {
      title: 'Lecture Tardive des Variables avec os.getenv() Dispersé',
      explanation: 'Lire les variables d\'environnement au milieu des fonctions de traitement sans validation préalable.',
      downside: 'Erreurs aléatoires TypeError: NoneType en plein milieu de requêtes critiques et détection tardive des pannes de configuration.',
    },
    keyTakeaway: 'Un système professionnel valide l\'intégralité de sa configuration avant d\'accepter sa toute première requête HTTP : la rigueur au démarrage évite les pannes en vol.',
  },
  '16-2': {
    title: '16.2 Pilotes de Synchronisation & Reprise sur Panne (sync.py & recovery.py)',
    metaphor: {
      emoji: '🔄',
      title: 'L\'Équipe de Patrouilleurs de l\'Autoroute',
      description: 'Les patrouilleurs sillonnent l\'autoroute en continu pour repérer les véhicules en panne, sécuriser la zone avec des cônes, et remorquer immédiatement les voitures bloquées vers le garage.',
    },
    situation: {
      context: 'Des pannes imprévues (coupure réseau, arrêt forcé du conteneur) survenant pendant une lourde opération d\'ingestion de documents.',
      pressure: 'Laisser des documents dans un état corrompu ou indéterminé qui bloque les synchronisations futures.',
    },
    solution: {
      title: 'Boucle de Synchronisation Résiliente & Script de Récupération Automatique',
      explanation: 'Découplage entre le pilote d\'ingestion asynchrone (sync.py) et le module de reprise après incident (recovery.py) capable de restaurer la cohérence de l\'état.',
      keyPoints: [
        'Transactions d\'ingestion atomiques : Chaque étape de traitement valide son statut pas à pas dans le journal SQLite.',
        'Nettoyage des résidus orphelins : Suppression automatique des chunks vectoriels incomplets en cas d\'échec de la phase de calcul des embeddings.',
        'Reprise sans duplication : Le système sait exactement où il s\'est arrêté et reprend le traitement sans créer de doublons d\'indexation.',
      ],
    },
    alternative: {
      title: 'Scripts de Réparation Manuelle Exécutés en Urgence',
      explanation: 'Devoir se connecter en SSH sur le serveur de production pour exécuter des requêtes SQL de déblocage manuelles.',
      downside: 'Risque d\'erreur humaine majeur, temps d\'indisponibilité prolongé et insatisfaction croissante des utilisateurs de l\'application.',
    },
    keyTakeaway: 'La véritable résilience logicielle s\'automatise : prévoyez dès l\'architecture le code qui nettoiera et réparera les conséquences des pannes inévitables.',
  },
  '17-1': {
    title: '17.1 Les Rails de Train & Le Presse-Papiers d\'Équipe (graph.py & state.py)',
    metaphor: {
      emoji: '🚂',
      title: 'Les Rails d\'Aiguillage et la Fiche de Suivi de Production',
      description: 'Le wagon avance sur des rails en acier et passe par des aiguillages stricts ; à bord, une pochette cartonnée contient la fiche de suivi où chaque ouvrier tamponne son étape et note ses observations.',
    },
    situation: {
      context: 'Le suivi complexe de l\'état d\'un agent de raisonnement à travers de multiples étapes de recherche, de reformulation et de validation de réponses.',
      pressure: 'Passer des dizaines d\'arguments non typés d\'une fonction à une autre dans un désordre inextricable propice aux erreurs de manipulation de données.',
    },
    solution: {
      title: 'Typage Formel avec SanadAgentState & Graphe Immuable',
      explanation: 'Définition d\'un schéma d\'état fortement typé sous forme de TypedDict Pydantic (state.py) transporté le long des nœuds du graphe d\'états (graph.py).',
      keyPoints: [
        'Presse-papiers unifié : SanadAgentState contient la question originale, les requêtes reformulées, les chunks récupérés et les scores d\'évaluation.',
        'Aiguillage conditionnel déterministe : Les arêtes conditionnelles du graphe orientent le flux en fonction des données inscrites dans l\'état.',
        'Immutabilité et pureté fonctionnelle : Chaque nœud prend l\'état en entrée et retourne uniquement les champs qu\'il met à jour, sans effet de bord caché.',
      ],
    },
    alternative: {
      title: 'Variables Globales Modifiées en Vrac par Divers Modules',
      explanation: 'Partager un dictionnaire global modifiable à travers toute l\'application sans contrôle de typage.',
      downside: 'Bugs de concurrence insolubles, écrasement silencieux de données et impossibilité totale de tester unitairement les étapes d\'analyse.',
    },
    keyTakeaway: 'Un état partagé typé et un graphe de flux explicite transforment un agent d\'IA imprévisible en une machinerie d\'une clarté et d\'une rigueur absolues.',
  },
  '17-2': {
    title: '17.2 Les 9 Ouvriers d\'Assemblage & Le Livre des Prompts (nodes.py & prompts.py)',
    metaphor: {
      emoji: '👷',
      title: 'La Ligne d\'Assemblage Spécialisée et le Manuel Opératoire',
      description: 'Chaque technicien de la chaîne monte une pièce bien précise selon les instructions d\'un classeur officiel plastifié posé sur son établi ; personne n\'improvise ses propres gestes.',
    },
    situation: {
      context: 'La complexité d\'implémenter les différents comportements d\'un agent d\'IA (clarification, recherche, notation, rédaction) sans dupliquer de code.',
      pressure: 'L\'éparpillement de chaînes de prompts non vérifiées et de règles métier contradictoires à travers des dizaines de fichiers Python.',
    },
    solution: {
      title: '9 Fonctions de Nœuds Pures Découplées & Registre de Prompts Centralisé',
      explanation: 'Chaque étape de raisonnement est encapsulée dans une fonction pure dédiée au sein de nodes.py, s\'appuyant sur des gabarits de prompts typés et immuables issus de prompts.py.',
      keyPoints: [
        'Division du travail : 9 ouvriers spécialisés (ex: check_clarity_node, grade_documents_node, generate_answer_node).',
        'Livre des prompts inviolable : Tous les textes de consignes sont centralisés, paramétrés et versionnés dans un unique fichier de référence.',
        'Auditabilité totale : Chaque décision prise par un nœud est horodatée et consignée dans le journal d\'audit pour analyse ultérieure.',
      ],
    },
    alternative: {
      title: 'Une Seule Fonction Monstre avec Prompt Géant',
      explanation: 'Rédiger un prompt gigantesque de 10 pages en demandant au modèle de tout faire en une seule fois.',
      downside: 'Incapacité du modèle à respecter l\'ensemble des consignes complexes et impossibilité d\'isoler la cause d\'une défaillance.',
    },
    keyTakeaway: 'Découper le raisonnement complexe en micro-tâches spécialisées confiées à des nœuds dédiés garantit une précision et une maîtrise incomparables.',
  },
  '18-1': {
    title: '18.1 Schéma Relationnel & Tables en Cascade (db/schema.sql)',
    metaphor: {
      emoji: '📐',
      title: 'Les Plans d\'Architecte des Fondations Immuables',
      description: 'Le plan en coupe de l\'immeuble stipule exactement où passent les canalisations et les colonnes de soutien ; toute modification structurelle exige la signature de l\'ingénieur en chef.',
    },
    situation: {
      context: 'La gestion cohérente des relations complexes entre espaces de travail, utilisateurs, documents téléversés, chunks de texte et citations juridiques.',
      pressure: 'L\'accumulation de données orphelines polluant la base de données après la suppression d\'un document ou d\'un espace de travail.',
    },
    solution: {
      title: 'Schéma SQL Normalisé avec Clés Étrangères & Cascades Déclaratives',
      explanation: 'Écriture d\'un fichier SQL de schéma (schema.sql) pur et documenté, instaurant des contraintes d\'intégrité strictes et des suppressions en cascade propres sur toutes les relations.',
      keyPoints: [
        'Normalisation 3NF : Élimination des redondances de données et cohérence logique absolue sur l\'ensemble des tables métier.',
        'Suppression propre ON DELETE CASCADE : Supprimer un document purge instantanément et automatiquement tous ses sous-éléments associés.',
        'Indexation stratégique : Index B-Tree ciblés sur les colonnes de filtrage fréquent (workspace_id, file_hash, created_at).',
      ],
    },
    alternative: {
      title: 'Tables Dénormalisées sans Clés Étrangères Déclarées',
      explanation: 'Créer des tables sans contraintes d\'intégrité en se disant que le code applicatif gérera les suppressions manuellement.',
      downside: 'Multiplication incontrôlée d\'enregistrements fantômes orphelins et corruption progressive de l\'intégrité des données d\'audit.',
    },
    keyTakeaway: 'Laissez le moteur de base de données garantir la cohérence physique de vos données grâce à des contraintes déclaratives inaltérables.',
  },
  '18-2': {
    title: '18.2 Les 5 Gardiens de Sécurité de la Base de Données (db/repo.py)',
    metaphor: {
      emoji: '🛡️',
      title: 'Les Cinq Clés d\'Accès du Gardien de Coffre-Fort',
      description: 'Pour accéder aux coffres de la banque, le gardien doit obligatoirement vérifier la carte d\'identité, enregistrer l\'heure, tourner deux clés simultanément et refermer la grille blindée.',
    },
    situation: {
      context: 'L\'accès aux données sensibles de l\'application depuis différentes routes d\'API et différents services métier.',
      pressure: 'Le risque qu\'un développeur pressé oublie de vérifier les permissions de workspace ou utilise une requête SQL mal sécurisée.',
    },
    solution: {
      title: 'Couche d\'Accès aux Données (Repository Pattern) avec 5 Gardiens Inviolables',
      explanation: 'Toute interaction avec la base de données transite obligatoirement par la classe DatabaseRepository, qui applique systématiquement les 5 règles d\'or de sécurité des données.',
      keyPoints: [
        'Gardien 1 : Filtrage impératif par workspace sur 100% des requêtes de lecture et d\'écriture.',
        'Gardien 2 : Utilisation exclusive de requêtes SQL préparées avec paramètres typés (zéro injection possible).',
        'Gardien 3 : Gestion atomique des transactions avec rollback automatique en cas d\'exception.',
        'Gardien 4 : Gestion des connexions en pool sécurisé avec fermeture systématique des curseurs.',
        'Gardien 5 : Journalisation cryptographique d\'audit sur chaque opération de modification de données sensibles.',
      ],
    },
    alternative: {
      title: 'Requêtes SQL Écrites Librement dans les Contrôleurs d\'API',
      explanation: 'Autoriser chaque développeur à écrire ses propres requêtes SELECT ou DELETE directement au milieu du code des routes web.',
      downside: 'Failles de sécurité inévitables, fuites de données entre espaces de travail et cauchemar absolu de maintenance logicielle.',
    },
    keyTakeaway: 'Centraliser l\'accès aux données derrière un dépôt strict et sécurisé garantit qu\'aucune donnée ne peut être consultée ni altérée en violation des règles fondamentales.',
  },
  '19-1': {
    title: '19.1 Gabarits Jinja2 Côté Serveur & Empreintes Cryptographiques (ui/)',
    metaphor: {
      emoji: '🎨',
      title: 'L\'Atelier Typographique Traditionnel avec Poinçons Métalliques',
      description: 'L\'imprimeur assemble ses caractères de plomb et presse les feuilles une à une ; chaque tirage sort complet, lisible et prêt à être distribué sans nécessiter de machine supplémentaire chez le lecteur.',
    },
    situation: {
      context: 'La distribution d\'interfaces web d\'entreprise au sein d\'environnements stricts où les réseaux sont instables et les navigateurs verrouillés par les équipes de sécurité informatique.',
      pressure: 'Les applications JavaScript complexes qui n\'affichent rien pendant 10 secondes ou restent blanches si un pare-feu bloque le téléchargement d\'un script externe.',
    },
    solution: {
      title: 'Rendu Serveur avec Jinja2 & Empreintes Antémémoire (Cache-Busting)',
      explanation: 'Génération intégrale des pages HTML côté serveur via le moteur de gabarits Jinja2, combinée à un système d\'empreintes cryptographiques sur les fichiers statiques pour un cache optimal.',
      keyPoints: [
        'Affichage instantané : L\'utilisateur reçoit du code HTML complet rendu par le serveur, immédiatement lisible et navigable sans latence de démarrage.',
        'Empreintes d\'actifs (Fingerprinting) : Noms de fichiers CSS et JS suffixés par leur hash SHA-256 évitant tout problème de cache obsolète lors des mises à jour.',
        'Robustesse éprouvée : Fonctionnement garanti sur tous les navigateurs d\'entreprise sans dépendance vis-à-vis d\'une chaîne d\'outillage front-end complexe.',
      ],
    },
    alternative: {
      title: 'Single Page Application (SPA) Cliente Obèse',
      explanation: 'Compiler un projet front-end lourd de 20 Mo de bibliothèques clientes dépendantes du bon vouloir du navigateur.',
      downside: 'Temps de chargement insupportables sur connexions lentes et pannes fréquentes derrière les serveurs proxy d\'entreprise.',
    },
    keyTakeaway: 'Le rendu côté serveur traditionnel allié à une gestion moderne des actifs statiques offre une fiabilité et une élégance intemporelles.',
  },
  '19-2': {
    title: '19.2 Portier de Staging & Mémoire de Session (access_gate.py & conversation.py)',
    metaphor: {
      emoji: '🚪',
      title: 'Le Portier du Club Privé et le Majordome Personnel',
      description: 'Le portier vérifie le mot de passe secret à la grille extérieure avant même de vous laisser approcher du bâtiment ; une fois à l\'intérieur, votre majordome attitré se rappelle exactement de vos préférences et de votre dernier échange.',
    },
    situation: {
      context: 'La protection des environnements de pré-production contre l\'indexation par les moteurs de recherche ou les accès non autorisés, couplée à la gestion fine des sessions des testeurs.',
      pressure: 'Exposer accidentellement une version en cours de test au public ou perdre le fil des échanges d\'un utilisateur au moindre rechargement de page.',
    },
    solution: {
      title: 'Sas de Sécurité d\'Accès Staging & Gestionnaire Dédié de Conversation',
      explanation: 'Mise en place d\'un intergiciel de protection (access_gate.py) filtrant les accès aux environnements de test, adossé à un gestionnaire robuste de sessions conversationnelles (conversation.py).',
      keyPoints: [
        'Portier de pré-production : Protection par mot de passe partagé et blocage strict des robots d\'indexation (robots.txt: Disallow /).',
        'Persistance de conversation : Sauvegarde automatique de chaque tour de dialogue en base de données avec identifiant de session persistant.',
        'Reprise transparente : L\'utilisateur peut rafraîchir son navigateur ou changer d\'appareil sans perdre l\'historique de sa consultation juridique.',
      ],
    },
    alternative: {
      title: 'Environnement de Test Ouvert aux Quatre Vents',
      explanation: 'Déployer l\'environnement de staging sur une URL publique sans aucune protection par mot de passe.',
      downside: 'Indexation involontaire de données de test par Google et risque de fuite d\'informations préalablement à la sortie officielle.',
    },
    keyTakeaway: 'Un sas d\'accès étanche en pré-production et une gestion rigoureuse des sessions d\'échange garantissent un cadre d\'expérimentation serein et professionnel.',
  },
  '20-1': {
    title: '20.1 Le Surveillant d\'Examen Automatisé (run_evaluation.py)',
    metaphor: {
      emoji: '🧑‍🏫',
      title: 'Le Surveillant d\'Examen Incorruptible avec Chronomètre Officiel',
      description: 'Le surveillant distribue les copies au son de la cloche, note scrupuleusement les temps de réponse de chaque étudiant et applique la grille d\'évaluation officielle sans aucun favoritisme.',
    },
    situation: {
      context: 'La nécessité de mesurer l\'impact de chaque modification de prompt ou de paramètre de recherche de manière scientifique et incontestable.',
      pressure: 'Se fier à des impressions subjectives (\'j\'ai l\'impression que la réponse est meilleure\') qui masquent souvent des dégradations profondes de la qualité globale.',
    },
    solution: {
      title: 'Script d\'Évaluation Automatisé sur Benchmark de Référence',
      explanation: 'Développement d\'un outil CLI complet (run_evaluation.py) exécutant les 60 questions du benchmark d\'or et calculant automatiquement les scores de fidélité, de rappel et de refus.',
      keyPoints: [
        'Mesure objective standardisée : Calcul rigoureux des métriques RAGAS (Faithfulness, Context Recall, Answer Relevance).',
        'Rapport détaillé horodaté : Génération automatique d\'un bilan d\'évaluation au format Markdown et JSON prêt à être archivé.',
        'Détection immédiate des régressions : Comparaison automatique des scores de la nouvelle version avec ceux de la version de référence.',
      ],
    },
    alternative: {
      title: 'Évaluation Manuelle Subjective par Sondage',
      explanation: 'Interroger manuellement le chatbot sur deux questions et décréter que le système fonctionne parfaitement à vue d\'œil.',
      downside: 'Impossibilité de détecter les effets de bord indésirables et surprise totale lors de l\'apparition d\'hallucinations en conditions réelles.',
    },
    keyTakeaway: 'La rigueur de l\'évaluation automatisée transforme la sorcellerie des modèles de langage en une discipline d\'ingénierie prévisible et maîtrisée.',
  },
  '20-2': {
    title: '20.2 Le Videur de la Porte de Sortie & Pyramide de Tests (release_gate.py)',
    metaphor: {
      emoji: '🥋',
      title: 'Le Videur du Salon VIP et le Contrôle Technique Automobile',
      description: 'Le véhicule passe sur les rouleaux de freinage, sous les projecteurs d\'alignement et subit le test antipollution ; si un seul voyant d\'anomalie reste allumé, l\'agent colle la vignette refusée sur le pare-brise.',
    },
    situation: {
      context: 'La validation finale indispensable avant d\'autoriser la publication d\'une nouvelle version de Sanad sur les serveurs de production.',
      pressure: 'Le risque de pousser en production du code dont les tests unitaires échouent ou dont les performances de sécurité ne respectent pas les critères non négociables.',
    },
    solution: {
      title: 'Garde-Fou de Déploiement Inflexible & Pyramide Complète de Tests',
      explanation: 'Script d\'arbitrage ultime (release_gate.py) orchestrant l\'exécution de la pyramide de tests (unitaires, intégration, sécurité, benchmarks) et bloquant le déploiement au moindre manquement.',
      keyPoints: [
        'Pyramide de tests complète : Plus de 100 tests unitaires et d\'intégration validant chaque brique logicielle.',
        'Validation absolue des 3 portes : Vérification stricte des seuils de fidélité (≥ 0.90), de refus honnête (100%) et de conformité des citations (100%).',
        'Code de retour bloquant (Exit Code) : Renvoi d\'un statut d\'erreur HTTP/CLI non-nul qui interrompt immédiatement la chaîne de déploiement continu.',
      ],
    },
    alternative: {
      title: 'Autorisation de Mise en Production Manuelle Informelle',
      explanation: 'Pousser le code en production par une commande manuelle rapide sans exécuter l\'ensemble des suites de validation.',
      downside: 'Déploiement de versions défectueuses, interruption inopinée du service et perte de crédibilité professionnelle face aux utilisateurs.',
    },
    keyTakeaway: 'La porte de sortie automatisée est l\'ultime rempart de la qualité : elle protège vos utilisateurs contre l\'erreur humaine en interdisant à tout code non certifié de franchir la frontière de la production.',
  },
};

/**
 * Returns localized track title & shortName
 */
export function getLocalizedTrack(track: Track, lang: 'en' | 'fr'): { title: string; shortName: string } {
  if (lang === 'fr' && TRACK_TRANSLATIONS_FR[track.id]) {
    return TRACK_TRANSLATIONS_FR[track.id];
  }
  return { title: track.title, shortName: track.shortName };
}

/**
 * Returns localized lesson title
 */
export function getLocalizedLessonTitle(lesson: Lesson, lang: 'en' | 'fr'): string {
  if (lang === 'fr' && LESSON_TRANSLATIONS_FR[lesson.id]) {
    return LESSON_TRANSLATIONS_FR[lesson.id];
  }
  return lesson.title;
}

/**
 * Returns a localized version of a SubLesson based on current language
 */
export function getLocalizedSubLesson(subLesson: SubLesson, lang: 'en' | 'fr'): SubLesson {
  if (lang !== 'fr') return subLesson;

  const frOverride = SUBLESSON_TRANSLATIONS_FR[subLesson.id];
  if (!frOverride) return subLesson;

  return {
    ...subLesson,
    title: frOverride.title || subLesson.title,
    metaphor: frOverride.metaphor || subLesson.metaphor,
    situation: frOverride.situation || subLesson.situation,
    solution: frOverride.solution || subLesson.solution,
    alternative: frOverride.alternative || subLesson.alternative,
    keyTakeaway: frOverride.keyTakeaway || subLesson.keyTakeaway,
  };
}
