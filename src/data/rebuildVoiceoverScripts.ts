// Studio Voiceover Scripts for Rebuilding Sanad (Stages 1 to 16)
// Voiced by YL (Systems Architect) and MB (Quality Guardian) in English & French
// Follows AIslop.md (no fluff, clear facts) and GUIDE-STYLE.md (Librarian Thread & Plain Language)

export interface StageVoiceover {
  stageNumber: number;
  stageId: string;
  speaker: 'YL (Systems Architect)' | 'MB (Quality Guardian)';
  scriptEn: string;
  scriptFr: string;
}

export const REBUILD_VOICEOVER_SCRIPTS: Record<string, StageVoiceover> = {
  'stage-1': {
    stageNumber: 1,
    stageId: 'stage-1',
    speaker: 'MB (Quality Guardian)',
    scriptEn:
      "Welcome to Stage 1. An enterprise HR department in Morocco oversees thousands of employment contracts governed by the Code du Travail. Standard keyword search misses synonyms, while commercial public language models hallucinate fictitious article numbers and leak private salary files. We translated the client demand into sixteen non-negotiable functional requirements, from multi-tenant workspace isolation to deterministic honest refusal. Every single requirement is backed by an automated verification test in our test suite.",
    scriptFr:
      "Bienvenue à l'étape 1. Une direction des ressources humaines au Maroc gère des milliers de contrats de travail régis par le Code du Travail. La recherche par mots-clés classique rate les synonymes légaux, tandis que les modèles de langage publics inventent de faux articles de loi et font fuiter des données salariales confidentielles. Nous avons traduit la demande du client en seize exigences fonctionnelles non négociables, de l'isolation des espaces de travail au refus honnête déterministe. Chaque exigence est garantie par un test automatisé dans notre codebase.",
  },
  'stage-2': {
    stageNumber: 2,
    stageId: 'stage-2',
    speaker: 'MB (Quality Guardian)',
    scriptEn:
      "Stage 2 examines why raw language models fail and why Retrieval-Augmented Generation is mathematically mandatory. In Mata versus Avianca, lawyers were fined five thousand dollars for citing six fictitious decisions made up by ChatGPT. In Moffatt versus Air Canada, the tribunal held the airline liable for its chatbot's lies. Stanford RegLab measured hallucination rates between seventeen and thirty-four percent on commercial legal tools. Fine-tuning only shifts probabilistic weights; it cannot guarantee factual truth or cite page numbers. RAG decouples fact storage from language synthesis, turning the model into an open-book reading clerk.",
    scriptFr:
      "L'étape 2 examine pourquoi les modèles de langage bruts échouent et pourquoi le RAG est mathématiquement obligatoire. Dans l'affaire Mata contre Avianca, des avocats ont été condamnés à cinq mille dollars d'amende pour avoir cité six faux jugements inventés par ChatGPT. Dans l'affaire Moffatt contre Air Canada, le tribunal a jugé la compagnie responsable des mensonges de son chatbot. L'étude de Stanford a mesuré entre dix-sept et trente-quatre pour cent d'erreurs sur les outils juridiques commerciaux. Le fine-tuning ne fait que modifier des poids probabilistes ; il ne garantit ni la vérité ni les citations. Le RAG sépare le stockage de la rédaction pour forcer le modèle à citer le livre ouvert.",
  },
  'stage-3': {
    stageNumber: 3,
    stageId: 'stage-3',
    speaker: 'YL (Systems Architect)',
    scriptEn:
      "Stage 3 establishes our Agile Scrum governance. We split responsibilities between two distinct architectural domains: I own the systems engineering, SQLite WAL schemas, Docker builds, and Railway deployment; Meriem owns the legal ground truth, the sixty-question golden benchmark, and academic defense verification. We instituted the Rule 5 review law: no pull request can merge into master without cryptographic dual sign-offs. Furthermore, our three-rollback circuit breaker automatically descopes any unstable feature to protect our delivery schedule.",
    scriptFr:
      "L'étape 3 pose notre gouvernance Agile Scrum. Nous avons séparé les responsabilités selon deux domaines architecturaux : je gère l'ingénierie système, les schémas SQLite WAL, les conteneurs Docker et le déploiement Railway ; Meriem garantit la vérité juridique, le benchmark doré de soixante questions et la soutenance. Nous avons instauré la règle numéro 5 : aucune Pull Request ne peut entrer sur master sans nos deux signatures cryptographiques. De plus, notre coupe-circuit à trois retours en arrière écarte immédiatement toute fonctionnalité instable pour protéger la date de livraison.",
  },
  'stage-4': {
    stageNumber: 4,
    stageId: 'stage-4',
    speaker: 'YL (Systems Architect)',
    scriptEn:
      "Stage 4 covers technical scouting. We evaluated every component with empirical benchmarks. We chose Qdrant in embedded mode because it delivers sub-eight-millisecond search under forty-five megabytes of RAM without a heavy background database daemon. We selected multilingual-e5-base for high-fidelity French and Arabic legal embeddings running in one hundred eighty milliseconds on CPU. We adopted LangGraph for cyclic state machine routing with strict loop limiters, and SQLite in WAL mode for zero-server relational speed.",
    scriptFr:
      "L'étape 4 détaille nos choix technologiques. Nous avons sélectionné chaque composant avec des benchmarks empiriques. Nous avons choisi Qdrant en mode embarqué car il répond en moins de huit millisecondes avec moins de quarante-cinq mégaoctets de RAM sans démon serveur lourd. Nous avons retenu multilingual-e5-base pour sa précision bilingue en français et en arabe tournant en cent quatre-vingts millisecondes sur CPU. Nous avons adopté LangGraph pour ses boucles cycliques contrôlées, et SQLite en mode WAL pour sa rapidité sans serveur.",
  },
  'stage-5': {
    stageNumber: 5,
    stageId: 'stage-5',
    speaker: 'YL (Systems Architect)',
    scriptEn:
      "Stage 5 presents our four invariant architecture pillars and hexagonal ports. Core legal reasoning is isolated from external storage and language models through eight explicit callable ports in agent/ports.py: summarize, clarify, rewrite, retrieve, grade, reword, fetch_parents, and write_answer. Noticeably, there are zero defaults. If an implementation is missing, the system fails loudly during initialization rather than silently returning a fabricated answer.",
    scriptFr:
      "L'étape 5 présente nos quatre piliers et l'architecture hexagonale. Le cœur de raisonnement juridique est isolé des bases de données et des modèles par huit ports explicites dans agent/ports.py : summarize, clarify, rewrite, retrieve, grade, reword, fetch_parents et write_answer. Il n'y a aucune valeur par défaut. Si une implémentation manque, le système échoue immédiatement au démarrage au lieu d'inventer silencieusement une fausse réponse.",
  },
  'stage-6': {
    stageNumber: 6,
    stageId: 'stage-6',
    speaker: 'YL (Systems Architect)',
    scriptEn:
      "Stage 6 details our data structures and schemas. We implement parent-child storage topology: small two-hundred-token child chunks are indexed in Qdrant collections for pinpoint cosine similarity matching, while full one-thousand-token parent sections are stored in SQLite and on disk to provide complete statutory context to the synthesis model. All relational tables in db/schema.sql adhere to Third Normal Form with active cascading deletes.",
    scriptFr:
      "L'étape 6 détaille nos structures de données. Nous appliquons la topologie parent-enfant : de petits fragments enfants de deux cents tokens sont indexés dans Qdrant pour une similarité cosinus précise, tandis que les sections parentes complètes de mille tokens sont stockées dans SQLite et sur disque pour donner tout le contexte légal au modèle. Toutes les tables relationnelles respectent la troisième forme normale avec suppressions en cascade actives.",
  },
  'stage-7': {
    stageNumber: 7,
    stageId: 'stage-7',
    speaker: 'YL (Systems Architect)',
    scriptEn:
      "Stage 7 explores our project file layout. Sanad avoids sprawling monoliths by structuring twenty-eight cohesive Python modules across four packages: root service drivers, the agent reasoning graph, the server-rendered user interface, and the evaluation suite. The entire architecture is guarded by one thousand three hundred seventy-seven automated tests organized into unit and integration suites.",
    scriptFr:
      "L'étape 7 explore l'arborescence du projet. Sanad évite les monolithes confus en structurant vingt-huit modules Python cohésifs en quatre paquets : les pilotes racine, le graphe d'agent, l'interface utilisateur en rendu serveur et la suite d'évaluation. L'ensemble de l'architecture est protégé par mille trois cent soixante-dix-sept tests automatisés répartis entre tests unitaires et d'intégration.",
  },
  'stage-8': {
    stageNumber: 8,
    stageId: 'stage-8',
    speaker: 'YL (Systems Architect)',
    scriptEn:
      "Stage 8 covers our DevOps and Docker packaging pipeline. By pruning unreachable NVIDIA GPU wheels from uv.lock and pinning CPU-only PyTorch, we reduced image size from six gigabytes down to four hundred fifty megabytes, and cut build times from two hours forty-six minutes down to under two minutes. The container runs under unprivileged user sanad with UID ten thousand one. Our four-tier testing pyramid validates unit tests, integration containers, security scans, and RAGAS benchmark gates.",
    scriptFr:
      "L'étape 8 couvre le packaging DevOps et Docker. En filtrant les pilotes GPU NVIDIA de uv.lock et en installant PyTorch pour processeur, nous avons réduit la taille de l'image de six gigaoctets à quatre cent cinquante mégaoctets, et ramené le temps de build de deux heures quarante-six minutes à moins de deux minutes. Le conteneur s'exécute sous l'utilisateur non privilégié sanad avec l'UID dix mille un. Notre pyramide de tests valide quatre niveaux stricts avant tout déploiement.",
  },
  'stage-9': {
    stageNumber: 9,
    stageId: 'stage-9',
    speaker: 'YL (Systems Architect)',
    scriptEn:
      "Stage 9 is our visual code walkthrough studio. To ensure junior engineers and jury members understand code logic without cognitive overload, this screen provides synchronized split-screen inspection: the left pane highlights the active logical block while dimming surrounding code to twenty-five percent opacity; the right pane explains the logic in plain language, details the failure prevented, and graphs the downstream blast radius.",
    scriptFr:
      "L'étape 9 est notre studio d'inspection de code. Pour permettre aux développeurs juniors et au jury de comprendre la logique sans surcharge, cet écran propose une vue scindée synchronisée : le volet gauche met en surbrillance le bloc actif en estompant le reste du fichier à vingt-cinq pour cent d'opacité ; le volet droit explique le fonctionnement en langage clair et cartographie le rayon d'impact des dépendances.",
  },
  'stage-10': {
    stageNumber: 10,
    stageId: 'stage-10',
    speaker: 'MB (Quality Guardian)',
    scriptEn:
      "Stage 10 details our Git workflow and review gates. Merges to master are strictly squash-only and must adhere to Conventional Commits. Every pull request is verified against our five-point checklist: named story criteria, green unit tests, manual demo script execution, decision journal update, and zero committed data files. Both YL and I must cryptographically sign off before any code reaches production.",
    scriptFr:
      "L'étape 10 présente notre flux Git et nos portes de relecture. Les fusions sur master sont obligatoirement en squash et suivent le format des commits conventionnels. Chaque PR doit valider notre liste de contrôle en cinq points : critères d'acceptation cochés, tests verts, exécution du script de démo, journal des décisions mis à jour et zéro fuite de données. Youssef et moi devons tous les deux valider le code avant toute fusion.",
  },
  'stage-11': {
    stageNumber: 11,
    stageId: 'stage-11',
    speaker: 'YL (Systems Architect)',
    scriptEn:
      "Stage 11 documents five critical production incidents solved during development: the SQLite concurrency lock trap resolved with WAL mode and busy_timeout; the vector dimension mismatch between MiniLM and E5 resolved with configuration assertions; the missing E5 query prefix that caused a thirty percent recall drop; out-of-memory container crashes on fifty-megabyte scans resolved with single-flight mutexes; and broken object-level authorization leaks resolved by returning silent four-zero-four responses.",
    scriptFr:
      "L'étape 11 consigne cinq incidents réels résolus en production : le verrouillage SQLite corrigé par le mode WAL et le busy_timeout ; le décalage de dimensions vectorielles corrigé par typage strict ; l'oubli du préfixe E5 qui faisait chuter le rappel de trente pour cent ; les dépassements de mémoire sur les gros scans PDF corrigés par un verrou d'ingestion unique ; et les fuites BOLA colmatées par des réponses 404 silencieuses.",
  },
  'stage-12': {
    stageNumber: 12,
    stageId: 'stage-12',
    speaker: 'MB (Quality Guardian)',
    scriptEn:
      "Stage 12 reviews our twenty Architecture Decision Records recorded in docs/journal/DECISIONS.md. Every significant architectural trade-off—from choosing SQLite WAL over PostgreSQL to implementing rolling summary memory and reciprocal rank fusion—is documented with its context, considered alternatives, empirical rationale, and accepted consequences. This provides total traceability during academic examination.",
    scriptFr:
      "L'étape 12 récapitule nos vingt fiches de décisions d'architecture consignées dans notre journal. Chaque compromis technique majeur — du choix de SQLite WAL face à PostgreSQL à l'adoption de la mémoire résumée et de la fusion RRF — est documenté avec son contexte, ses alternatives, sa preuve empirique et ses conséquences. Cela garantit une traçabilité totale devant le jury d'examen.",
  },
  'stage-13': {
    stageNumber: 13,
    stageId: 'stage-13',
    speaker: 'YL (Systems Architect)',
    scriptEn:
      "Stage 13 demonstrates our Railway cloud deployment. The application binds dynamically to port eight thousand eighty, mounts /app/data to a persistent cloud volume ensuring documents and vectors survive redeployments, and serves a sub-fifty-millisecond healthcheck probe. On cold boot, Pydantic BaseSettings asserts all required secrets; any missing key triggers an immediate exit code one to prevent insecure execution.",
    scriptFr:
      "L'étape 13 montre notre déploiement cloud sur Railway. L'application écoute sur le port injecté par Railway, monte /app/data sur un volume persistant pour que les bases survivent aux redémarrages, et répond aux sondes de santé en moins de cinquante millisecondes. Au démarrage, Pydantic valide tous les secrets d'environnement ; la moindre variable manquante stoppe le serveur immédiatement pour garantir la sécurité.",
  },
  'stage-14': {
    stageNumber: 14,
    stageId: 'stage-14',
    speaker: 'MB (Quality Guardian)',
    scriptEn:
      "Stage 14 presents our quantitative evaluation benchmark. We evaluate Sanad against sixty frozen golden questions covering the Moroccan Labor Code: forty in-scope queries that must achieve at least ninety percent faithfulness, and twenty out-of-scope queries that must trigger honest refusal with one hundred percent accuracy. The automated release gate bouncer halts deployment if any threshold is violated.",
    scriptFr:
      "L'étape 14 présente notre banc d'évaluation quantitative. Nous mesurons la précision de Sanad sur soixante questions de référence couvrant le Code du Travail : quarante questions dans le périmètre qui doivent atteindre au moins quatre-vingt-dix pour cent de fidélité, et vingt questions hors périmètre qui doivent déclencher un refus honnête avec cent pour cent de réussite. Le videur de release bloque le déploiement en cas de régression.",
  },
  'stage-15': {
    stageNumber: 15,
    stageId: 'stage-15',
    speaker: 'YL (Systems Architect)',
    scriptEn:
      "Stage 15 details operational monitoring and tracing. Sanad uses an in-process trace collector where the trace is the counter: retry loops and search counts are derived directly from recorded steps. SQLite records query latencies and user feedback via idempotent upserts, proving median latency under two seconds and ninety-fifth percentile latency under five seconds without external SaaS surveillance.",
    scriptFr:
      "L'étape 15 détaille l'observabilité et le traçage. Sanad utilise un collecteur de traces interne où la trace constitue le compteur : les réécritures et les recherches sont calculées à partir des étapes réelles. SQLite enregistre les temps de réponse et les avis utilisateurs par des écritures idempotentes, prouvant une latence médiane sous les deux secondes sans espionnage par des services tiers.",
  },
  'stage-16': {
    stageNumber: 16,
    stageId: 'stage-16',
    speaker: 'MB (Quality Guardian)',
    scriptEn:
      "Stage 16 brings our journey to completion: production release v3.1.0 and thesis defense readiness. Prompts are versioned under prompts/ with semantic version tags. Executing the complete verification suite confirms all one thousand three hundred seventy-seven tests pass, the golden benchmark satisfies release gates, and the system is granted Academic Defense Clearance for presentation to the ENSAF university jury.",
    scriptFr:
      "L'étape 16 conclut notre parcours : la version de production 3.1.0 et la préparation de la soutenance de diplôme. Les prompts sont versionnés sous prompts/ avec des numéros sémantiques. L'exécution de la suite complète confirme que les mille trois cent soixante-dix-sept tests réussissent, que le benchmark valide les portes de release et que le système obtient son autorisation officielle pour la soutenance devant le jury de l'ENSAF.",
  },
};
