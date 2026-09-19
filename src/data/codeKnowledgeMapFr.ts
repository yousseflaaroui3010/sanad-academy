// Sanad French Code Knowledge Map
// Authentic French translations for all 51 sublessons: metaphors, failure modes, code explanations and invariants.

export interface CodeKnowledgeFrItem {
  codeExplanation: string;
  clearMetaphor: {
    intuition: string;
    softwareMapping: string;
    whyItBreaksWithoutIt: string;
  };
  situationDetails: {
    operationalContext: string;
    disasterScenario: string;
    engineeringMitigation: string;
  };
  tradeOffInsight: {
    juniorShortcut: string;
    seniorResolution: string;
  };
  codeInvariants: string[];
}

export const CODE_KNOWLEDGE_MAP_FR: Record<string, CodeKnowledgeFrItem> = {
  "1-1": {
    "codeExplanation": "Vérifie que chaque Pull Request porte les approbations cryptographiques explicites des deux architectes (YL + MB) avant d'autoriser la fusion Git.",
    "clearMetaphor": {
      "intuition": "Avion de chasse supersonique biplace : le pilote 1 (YL) contrôle les instruments et la trajectoire ; le copilote (MB) scanne le radar, vérifie les règles d'engagement et verrouille les cibles. Aucun ne tire sans les deux clés insérées.",
      "softwareMapping": "YL gère l'ingénierie système, les schémas SQLite et les conteneurs Docker ; MB garantit la vérité juridique, les benchmarks RAGAS et la soutenance académique.",
      "whyItBreaksWithoutIt": "Un développeur isolé pousse du code bâclé directement sur la branche principale avant la démo ; le LLM hallucine lors de la soutenance devant le jury professoral."
    },
    "situationDetails": {
      "operationalContext": "Une équipe de deux ingénieurs concevant un système d'IA juridique marocain sous la pression d'une date de soutenance académique ferme.",
      "disasterScenario": "Un commit non validé modifiant les prompts est poussé 2h avant le jury, provoquant des hallucinations juridiques en direct.",
      "engineeringMitigation": "Protection de branche GitHub et script tests/review_rules.py imposant deux approbations obligatoires selon les deux domaines d'expertise."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Pousser en solitaire sans relecture pour aller vite, tester avec un seul prompt, et espérer que rien ne casse.",
      "seniorResolution": "Processus strict de revue croisée : zéro commit direct sur master, validation systématique des deux pairs sur chaque PR."
    },
    "codeInvariants": [
      "Zéro commit direct sur la branche master sans Pull Request",
      "Double signature obligatoire (YL + MB) sur chaque PR",
      "Suite de tests unitaires et linters CI validée à 100% avec code de retour 0"
    ]
  },
  "1-2": {
    "codeExplanation": "Matrice de flux de bout en bout reliant l'entrée brute du document au chunking, à l'indexation Qdrant, à la machine d'état LangGraph et à la réponse vérifiée.",
    "clearMetaphor": {
      "intuition": "Une raffinerie d'eau potable ultra-sécurisée : chaque goutte de pétrole brut traverse 7 étapes de filtrage étanches avant d'arriver au robinet de consommation.",
      "softwareMapping": "Les documents juridiques bruts sont convertis en Markdown, hachés en SHA-256, découpés en chunks parents/enfants, vectorisés avec préfixes E5, puis interrogés par un graphe cyclique LangGraph.",
      "whyItBreaksWithoutIt": "Si le pipeline mélange extraction et génération, un document corrompu bloque le serveur web tout entier et injecte du texte arbitraire dans le prompt LLM."
    },
    "situationDetails": {
      "operationalContext": "Ingestion de milliers de pages de textes juridiques marocains complexes (Dahirs, Bulletins Officiels) nécessitant une fidélité d'extraction totale.",
      "disasterScenario": "Une défaillance silencieuse lors du parsing d'un PDF juridique tronque les exceptions légales et induit les juristes en erreur.",
      "engineeringMitigation": "Pipeline découpé en 7 étapes déterministes et isolées, chaque étape validant ses invariants avant d'écrire en base."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Tout mettre dans un seul script monolithique de 2000 lignes faisant extraction, embedding et appel OpenAI d'un coup.",
      "seniorResolution": "Architecture modulaire stricte : ingestion asynchrone découplée, stockage relationnel SQLite WAL et base vectorielle Qdrant distincte."
    },
    "codeInvariants": [
      "Isolement total entre l'étape d'ingestion et l'étape d'interrogation en ligne",
      "Hachage cryptographique SHA-256 calculé avant toute transformation",
      "Chaque réponse doit comporter au moins une citation vérifiable avec numéro d'article"
    ]
  },
  "1-3": {
    "codeExplanation": "Règle absolue du RAG : Si le texte source ne contient pas la réponse explicite, le système doit refuser de répondre avec honnêteté (code d'erreur F-05).",
    "clearMetaphor": {
      "intuition": "Un greffier de tribunal sous serment : il ne lit que ce qui figure au dossier scellé. Si une pièce manque, il déclare 'Non mentionné au dossier' au lieu d'inventer.",
      "softwareMapping": "Le nœud de synthèse de l'agent compare strictement les assertions générées avec les chunks extraits du Dahir ; sans preuve, il émet le refus déterministe F-05.",
      "whyItBreaksWithoutIt": "Le modèle invente un faux article de loi ou une fausse indemnité de licenciement, exposant l'entreprise cliente à des sanctions pénales."
    },
    "situationDetails": {
      "operationalContext": "Consultation juridique par des directeurs des ressources humaines au Maroc demandant des calculs d'indemnités de rupture conventionnelle.",
      "disasterScenario": "Le système invente un article 78 bis inexistant dans le Code du Travail, provoquant un litige prud'homal coûteux pour l'employeur.",
      "engineeringMitigation": "Prompt de système avec ancrage absolu, extracteur de citations strict et seuil RAGAS de fidélité supérieure ou égale à 0.90."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Inciter le modèle à 'être utile et créatif' et répondre même s'il n'a pas trouvé de document pertinent.",
      "seniorResolution": "Refus honnête immédiat et déterministe dès que le score de pertinence des documents récupérés passe sous le seuil critique."
    },
    "codeInvariants": [
      "Interdiction formelle de spéculer hors du corpus documentaire vérifié",
      "Déclenchement du statut HONEST_REFUSAL si la confiance est insuffisante",
      "Score de fidélité RAGAS maintenu au-dessus de 0.90 en production"
    ]
  },
  "2-1": {
    "codeExplanation": "Initialisation rigoureuse de la base de données SQLite en mode WAL et de la collection vectorielle Qdrant lors du Sprint 0 & 1.",
    "clearMetaphor": {
      "intuition": "Fondations en béton armé d'un gratte-ciel : avant de poser la moindre brique décorative, on coule des pieux profondément ancrés dans le sol rocheux.",
      "softwareMapping": "Création des tables SQL avec contraintes de clés étrangères, activation du journal WAL pour les écritures concurrentes et indexation Cosine 1024-d dans Qdrant.",
      "whyItBreaksWithoutIt": "Si on commence par coder l'interface graphique sans base solide, les schémas changent chaque semaine et le projet s'effondre sous la dette technique."
    },
    "situationDetails": {
      "operationalContext": "Lancement du cycle de développement de Sanad avec un délai contraint de 6 sprints bi-hebdomadaires.",
      "disasterScenario": "La base de données se verrouille sous forte charge concurrente (database is locked) en pleine démonstration.",
      "engineeringMitigation": "Activation de SQLite WAL, pragmas de synchronisation et isolation des écritures avec single-flight mutex."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Utiliser un fichier JSON brut comme stockage temporaire en disant 'on mettra une vraie base plus tard'.",
      "seniorResolution": "Schéma 3NF complet avec migrations versionnées, clés étrangères actives et tests de concurrence dès le premier sprint."
    },
    "codeInvariants": [
      "PRAGMA journal_mode = WAL actif dès l'ouverture de la connexion",
      "PRAGMA foreign_keys = ON vérifié à chaque transaction",
      "Collection vectorielle Qdrant dimensionnée précisément à 1024 dimensions (multilingual-e5-base)"
    ]
  },
  "2-2": {
    "codeExplanation": "Construction du graphe cyclique d'agents LangGraph avec nœud de réécriture et portes d'évaluation RAGAS (Sprint 2 & 3).",
    "clearMetaphor": {
      "intuition": "Un conseil consultatif de révision : un premier greffier cherche, un censeur vérifie la pertinence juridique, et si les pièces sont floues, il ordonne de reformuler la question avant de rédiger.",
      "softwareMapping": "StateGraph LangGraph avec nœuds retrieve, grade_documents, rewrite_query, generate, et hallu_check avec condition d'arrêt à 2 boucles maximum.",
      "whyItBreaksWithoutIt": "Le pipeline RAG linéaire classique récupère de mauvais documents sur une requête ambiguë et génère une réponse hors sujet sans pouvoir corriger son tir."
    },
    "situationDetails": {
      "operationalContext": "Questions d'utilisateurs souvent formulées de façon imprécise (ex: 'congé payé démission') nécessitant une désambiguïsation juridique.",
      "disasterScenario": "Le système tourne en boucle infinie de réécriture ou génère une réponse à côté de la plaque sur 40% des requêtes réelles.",
      "engineeringMitigation": "Graphe cyclique avec compteur de retry strict (max 2 boucles) et fallback vers le refus honnête F-05 en cas d'échec."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Faire un simple appel direct retrieval + LLM en une seule passe et masquer les erreurs d'extraction.",
      "seniorResolution": "Graphe d'états typé avec nœuds purs déterministes, validation de pertinence binaire et boucle de reformulation contrôlée."
    },
    "codeInvariants": [
      "Nombre de reformulations borné strictement à 2 réécritures maximum",
      "État immuable SanadAgentState sérialisable et typé",
      "Évaluation binaire oui/non de la pertinence des documents avant toute génération"
    ]
  },
  "2-3": {
    "codeExplanation": "Mise en œuvre de la suite de répétition de soutenance, vérification des 3 portes de release et déploiement Docker multi-stage (Sprint 4, 5 & 6).",
    "clearMetaphor": {
      "intuition": "Répétition générale en costumes au théâtre avant la première officielle : la scène, les projecteurs, les micros et les répliques sont testés à la seconde près.",
      "softwareMapping": "Exécution automatisée du benchmark doré de 60 questions, calcul des métriques RAGAS et validation de l'image Docker non-root sous Linux.",
      "whyItBreaksWithoutIt": "L'application fonctionne sur Mac en local, mais plante sur le cloud Linux à cause d'une dépendance système manquante ou d'un droit de fichier."
    },
    "situationDetails": {
      "operationalContext": "Préparation de la soutenance finale face à un jury académique exigeant des preuves empiriques de rigueur logicielle.",
      "disasterScenario": "L'instance cloud redémarre en boucle (CrashLoopBackOff) pendant la démonstration live en raison d'un chemin de volume mal configuré.",
      "engineeringMitigation": "Conteneurisation multi-stage Docker Alpine, test de santé /healthz et persistance sur volume Railway /app/data."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Déployer manuellement un fichier zip via FTP la veille au soir en espérant que le serveur hôte ait la bonne version de Python.",
      "seniorResolution": "Pipeline CI/CD hermétique avec build Docker reproductible, utilisateur node/app sans privilèges et tests de santé automatisés."
    },
    "codeInvariants": [
      "Conteneur Docker exécuté sous utilisateur non-root sans privilèges",
      "Vérification de santé /healthz répondant 200 OK avec statut SQLite et Qdrant",
      "Validation des 3 portes de release avant toute promotion en production"
    ]
  },
  "3-1": {
    "codeExplanation": "Enregistrement chronologique et immuable de chaque décision d'architecture (ADR) dans docs/adr/ avec justification, alternatives et conséquences.",
    "clearMetaphor": {
      "intuition": "La boîte noire étanche d'un avion de ligne : elle enregistre chaque commande des pilotes et chaque paramètre de vol pour comprendre exactement chaque choix technique.",
      "softwareMapping": "Fichiers Markdown standardisés (ADR-001 à ADR-020) actant le choix de SQLite WAL plutôt que Postgres, LangGraph plutôt que CrewAI, et E5-base plutôt qu'OpenAI.",
      "whyItBreaksWithoutIt": "Trois mois plus tard, un développeur remplace SQLite par un ORM lourd sans savoir pourquoi SQLite WAL avait été choisi, réintroduisant des deadlocks."
    },
    "situationDetails": {
      "operationalContext": "Projet mené par deux ingénieurs devant justifier chaque arbitrage technologique lors de la soutenance de diplôme.",
      "disasterScenario": "Un membre du jury demande 'Pourquoi avoir choisi un graphe cyclique plutôt qu'un agent ReAct ?' et les étudiants se contredisent sans écrit.",
      "engineeringMitigation": "Registre d'ADR versionné sous Git détaillant le contexte, les options évaluées et la justification chiffrée de chaque décision."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Prendre des décisions d'architecture à l'oral sur un coin de table et changer d'avis chaque semaine sans laisser de trace.",
      "seniorResolution": "Rédaction systématique d'un ADR formel avant d'engager plus de deux jours de développement sur un composant structurant."
    },
    "codeInvariants": [
      "Toute modification structurante de schéma ou de pile doit être précédée d'un ADR",
      "Format MADR standard : Contexte, Décision, Statut, Conséquences positives et négatives",
      "Validation et fusion conjointe de l'ADR par les deux architectes"
    ]
  },
  "3-2": {
    "codeExplanation": "Verrouillage cryptographique des spécifications : interdiction absolue de modifier les exigences fonctionnelles une fois le sprint entamé.",
    "clearMetaphor": {
      "intuition": "Un contrat d'architecte signé chez le notaire avant le coulage des fondations : aucun client ne peut exiger d'ajouter un sous-sol une fois le béton pris.",
      "softwareMapping": "Vérification par hachage SHA-256 des fichiers de spécifications dans le pipeline CI ; tout changement déclenche une alerte de rupture de contrat.",
      "whyItBreaksWithoutIt": "Le périmètre fonctionnel dérive sans fin (scope creep), les fonctionnalités ne sont jamais terminées et le projet rate sa date de livraison."
    },
    "situationDetails": {
      "operationalContext": "Délai de projet incompressible de 12 semaines pour concevoir, tester et valider une architecture RAG complète.",
      "disasterScenario": "L'ajout de dernière minute d'une fonctionnalité non planifiée déstabilise le moteur de recherche la veille de la livraison.",
      "engineeringMitigation": "Règle de verrouillage des spécifications avec procédure formelle de demande de changement (RFC) et ré-estimation du planning."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Accepter toutes les idées nouvelles en plein milieu de sprint en pensant qu'il suffit de coder plus vite la nuit.",
      "seniorResolution": "Périmètre sanctuarisé : toute nouvelle idée est consignée dans le backlog du sprint suivant après arbitrage collégial."
    },
    "codeInvariants": [
      "Spécifications gelées à l'ouverture de chaque itération de développement",
      "Zéro modification d'API publique sans incrément de version majeure ou mineure",
      "Garde-fou CI vérifiant l'intégrité des signatures de contrats"
    ]
  },
  "3-3": {
    "codeExplanation": "Gestion de crise et protocole d'escalade en 3 paliers de dégradation contrôlée (C1, C2, C3) pour sauver la soutenance en cas d'imprévu.",
    "clearMetaphor": {
      "intuition": "Protocole d'atterrissage d'urgence d'un navire spatial : si le moteur à fusion flanche (C1), on passe sur les turbines auxiliaires ; si elles surchauffent (C2), on largue la soute pour préserver l'équipage (C3).",
      "softwareMapping": "En cas de quota API épuisé ou de latence réseau excessive, le système bascule sur le cache sémantique local, puis sur la recherche lexicale BM25 seule.",
      "whyItBreaksWithoutIt": "Une coupure d'API externe pendant la soutenance provoque un écran blanc 500 Internal Server Error devant le jury médusé."
    },
    "situationDetails": {
      "operationalContext": "Démonstration en direct devant un jury dans un amphithéâtre universitaire avec une connexion Internet potentiellement instable.",
      "disasterScenario": "L'API externe d'OpenAI ou de Qdrant Cloud renvoie des erreurs 429 Too Many Requests au moment exact où le juré teste l'application.",
      "engineeringMitigation": "Mode hors-ligne dégradé avec modèles locaux pré-téléchargés, cache SQLite et réponses déterministes de secours."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Faire reposer toute la démonstration sur une connexion Internet parfaite et paniquer si le Wi-Fi de l'école saute.",
      "seniorResolution": "Concevoir le système avec une échelle de dégradation gracieuse : l'application reste utilisable et informative même déconnectée."
    },
    "codeInvariants": [
      "Gestionnaire d'exceptions global interceptant toute défaillance réseau",
      "Basculement automatique en mode dégradé avec notification transparente à l'utilisateur",
      "Zéro blocage du serveur principal en cas d'échec d'un service tiers"
    ]
  },
  "4-1": {
    "codeExplanation": "Génération de fiches de preuves cliquables liant chaque affirmation juridique à son article précis du Code du Travail marocain.",
    "clearMetaphor": {
      "intuition": "Un dossier de plaidoirie pour avocat : chaque argument est étayé par une pièce à conviction numérotée et scellée, consultable d'un simple geste.",
      "softwareMapping": "L'interface web extrait les métadonnées de l'article (source_file, page_number, article_number) et génère des cartes d'inspection interactives.",
      "whyItBreaksWithoutIt": "L'utilisateur reçoit un pavé de texte sans source ; incapable de vérifier si l'article cité existe vraiment, il rejette l'outil par manque de confiance."
    },
    "situationDetails": {
      "operationalContext": "Cadres juridiques et directeurs RH marocains exigeant des citations légales exactes et vérifiables pour leurs dossiers de contentieux.",
      "disasterScenario": "Le système donne un conseil erroné sans mentionner de source, induisant un avocat en erreur lors de la rédaction de conclusions.",
      "engineeringMitigation": "Composant d'affichage de sources avec mise en surbrillance du passage exact et lien vers le texte officiel du Dahir."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Afficher une réponse brute générée par le LLM avec une mention vague 'selon la loi marocaine'.",
      "seniorResolution": "Exiger au moins une citation précise avec numéro d'article et lien direct vers le texte du Bulletin Officiel pour chaque paragraphe généré."
    },
    "codeInvariants": [
      "Toute affirmation juridique doit être assortie d'au moins une métadonnée d'article",
      "Présentation visuelle claire séparant le raisonnement de la citation légale brute",
      "Avertissement légal obligatoire stipulant la nature informative du système"
    ]
  },
  "4-2": {
    "codeExplanation": "Protocole déterministe d'aveu d'incompétence : le système refuse de répondre si les documents pertinents sont absents du corpus juridique indexé.",
    "clearMetaphor": {
      "intuition": "Un médecin spécialiste honnête : si un patient lui demande un traitement pour une pathologie hors de son domaine, il dit 'Je ne sais pas, consultez un confrère' au lieu de prescrire au hasard.",
      "softwareMapping": "Si le score de similarité vectorielle maximal est inférieur au seuil de 0.70, le nœud de décision court-circuite le LLM et renvoie le message F-05.",
      "whyItBreaksWithoutIt": "Interrogé sur le droit fiscal alors qu'il n'a indexé que le droit du travail, le modèle tente d'extrapoler et invente des règles fiscales absurdes."
    },
    "situationDetails": {
      "operationalContext": "Utilisateurs posant des questions pièges ou hors périmètre (droit pénal, fiscalité, questions personnelles) au système juridique.",
      "disasterScenario": "Le système donne des conseils en droit pénal imaginaire à un utilisateur qui pensait parler à un avocat assermenté.",
      "engineeringMitigation": "Filtrage strict par score de pertinence et gabarit de refus standardisé F-05 guidant l'utilisateur vers les professionnels compétents."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Pousser le LLM à répondre à tout pour donner une fausse impression d'omniscience.",
      "seniorResolution": "Valoriser le refus explicite et rapide comme une marque de rigueur scientifique et de sécurité juridique absolue."
    },
    "codeInvariants": [
      "Refus honnête déclenché dès que la similarité cosine est sous le seuil de 0.70",
      "Temps de réponse de refus inférieur à 300 millisecondes (court-circuit sans appel LLM)",
      "Message de refus orientant poliment vers les textes légaux ou un conseil juridique qualifié"
    ]
  },
  "5-1": {
    "codeExplanation": "Isolation multi-tenant par espace de travail (Workspace) avec synchronisation en temps réel et cloisonnement strict des données d'entreprises.",
    "clearMetaphor": {
      "intuition": "Les coffres-forts numérotés d'une grande banque suisse : chaque client possède sa propre clé et son propre compartiment ; un mur de blindage empêche tout transfert entre deux coffres.",
      "softwareMapping": "Chaque requête SQL et chaque filtre Qdrant intègre obligatoirement la clause workspace_id = :current_workspace pour empêcher toute fuite inter-entreprises.",
      "whyItBreaksWithoutIt": "L'entreprise A interroge le système et voit apparaître dans ses résultats les conventions salariales confidentielles de l'entreprise B."
    },
    "situationDetails": {
      "operationalContext": "Plateforme SaaS partagée entre plusieurs cabinets d'avocats et directions des ressources humaines concurrentes.",
      "disasterScenario": "Une requête sans filtre d'espace de travail renvoie le plan de restructuration confidentiel d'un concurrent, violant le secret des affaires.",
      "engineeringMitigation": "Sécurité BOLA intégrée au niveau du référentiel de données : injection automatique du workspace_id dans toutes les requêtes sans exception."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Faire confiance aux paramètres envoyés par le navigateur sans valider les droits côté serveur.",
      "seniorResolution": "Isolation hermétique dans la couche d'accès aux données : toute tentative d'accès hors workspace renvoie un 404 silencieux."
    },
    "codeInvariants": [
      "Clause WHERE workspace_id = ? obligatoire sur toutes les requêtes SQL de sélection et de mise à jour",
      "Filtre de métadonnées workspace_id systématiquement injecté dans les requêtes vectorielles Qdrant",
      "Réponse 404 Not Found silencieuse en cas de tentative d'accès à un workspace non autorisé"
    ]
  },
  "5-2": {
    "codeExplanation": "Moteur d'ingestion multi-formats supportant PDF natifs, documents scannés via OCR Tesseract, fichiers Word et Markdown avec normalisation UTF-8.",
    "clearMetaphor": {
      "intuition": "Un centre de tri postal automatisé capable de lire aussi bien les lettres dactylographiées que les courriers manuscrits froissés, en les convertissant tous en fiches numériques standardisées.",
      "softwareMapping": "Pipeline de conversion en cascade : pdftotext en premier choix rapide, basculement vers OCR si le taux de caractères alphabétiques est inférieur à 40%.",
      "whyItBreaksWithoutIt": "Le juriste téléverse un Dahir scanné des années 1960 ; le système extrait une chaîne vide sans lever d'erreur et prétend que le document est vierge."
    },
    "situationDetails": {
      "operationalContext": "Numérisation de décennies de Bulletins Officiels marocains sous forme de scans PDF de qualité variable souvent jaunis ou inclinés.",
      "disasterScenario": "Le système ingère silencieusement des pages blanches parce que le PDF ne contient pas de couche texte, privant le RAG de textes clés.",
      "engineeringMitigation": "Détection automatique des pages d'images et déclenchement d'un OCR avec seuil de confiance minimum et redressement d'image."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Utiliser une bibliothèque PDF basique qui ne lit que le texte vectoriel et ignorer silencieusement les scans.",
      "seniorResolution": "Échelle de conversion robuste avec fallback OCR automatique, nettoyage des artéfacts d'impression et validation de la densité textuelle."
    },
    "codeInvariants": [
      "Contrôle de densité textuelle sur chaque page extraite (seuil minimal de 50 caractères)",
      "Bascule automatique en mode OCR Tesseract si la couche texte est absente ou corrompue",
      "Normalisation systématique de la casse et des espaces insécables en UTF-8"
    ]
  },
  "5-3": {
    "codeExplanation": "Gestion de la mémoire conversationnelle et clarification dynamique des questions vagues avant soumission au moteur de recherche.",
    "clearMetaphor": {
      "intuition": "Un assistant juridique expérimenté qui prend des notes pendant votre exposé : si vous dites 'Et pour son préavis ?', il sait immédiatement de quel salarié vous parliez deux minutes plus tôt.",
      "softwareMapping": "Nœud de reformulation conversationnelle injectant l'historique des 3 derniers tours de parole dans le prompt pour contextualiser la question avant le RAG.",
      "whyItBreaksWithoutIt": "Sur la question 'Quelle est la durée de ce délai ?', le système cherche 'ce délai' dans le vide et renvoie des résultats sans aucun rapport."
    },
    "situationDetails": {
      "operationalContext": "Utilisateurs dialoguant naturellement en plusieurs étapes pour explorer des cas juridiques complexes.",
      "disasterScenario": "Le modèle oublie le contexte dès la deuxième question et demande à l'utilisateur de réécrire tout son historique à chaque message.",
      "engineeringMitigation": "Fenêtre glissante de mémoire conversationnelle stockée en base de données et condensée par un prompt de réécriture dédié."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Envoyer l'intégralité de l'historique de 50 messages dans le prompt LLM et saturer la fenêtre de contexte.",
      "seniorResolution": "Fenêtre glissante compacte couplée à un nœud de contextualisation qui produit une requête de recherche autonome et précise."
    },
    "codeInvariants": [
      "Historique conversationnel borné aux 6 derniers messages (3 tours d'échange complets)",
      "Génération d'une requête autonome sans pronoms relatifs ambigus avant interrogation vectorielle",
      "Persistance de la session en base de données SQLite avec horodatage strict"
    ]
  },
  "6-1": {
    "codeExplanation": "Interface utilisateur pensée en priorité pour l'environnement de bureau des professionnels du droit, avec adaptation fluide aux contraintes mobiles.",
    "clearMetaphor": {
      "intuition": "Un bureau de magistrat spacieux avec double écran : d'un côté le dossier complet avec les pièces sources, de l'autre le rapport d'analyse juridique prêt à être validé.",
      "softwareMapping": "Mise en page à deux volets (split-screen) sur écran large avec volet de sources repliable automatiquement en tiroir coulissant sur smartphone.",
      "whyItBreaksWithoutIt": "L'interface conçue uniquement pour mobile tasse les tableaux juridiques et tronque les citations, rendant le travail des juristes insupportable sur PC."
    },
    "situationDetails": {
      "operationalContext": "Juristes d'entreprise et directeurs des ressources humaines passant 8 heures par jour sur des écrans d'ordinateurs portables ou fixes.",
      "disasterScenario": "Une interface type réseau social mobile oblige l'avocat à scroller pendant 5 minutes pour comparer deux articles de loi.",
      "engineeringMitigation": "Conception Desktop-First offrant un espace de lecture généreux, des raccourcis clavier et un panneau latéral de documents synchronisé."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Appliquer aveuglément le principe Mobile-First à une application professionnelle de recherche documentaire lourde.",
      "seniorResolution": "Concevoir d'abord l'expérience riche sur grand écran (volets synchronisés, raccourcis) puis adapter élégamment l'interface aux écrans tactiles."
    },
    "codeInvariants": [
      "Disposition en double panneau ergonomique pour les résolutions supérieures à 1024px",
      "Accessibilité immédiate aux raccourcis clavier de navigation (Échap, Flèches, V)",
      "Contraste visuel élevé conforme aux exigences de lecture juridique prolongée"
    ]
  },
  "6-2": {
    "codeExplanation": "Architecture web résiliente privilégiant le rendu HTML rapide et support natif complet de l'écriture arabe de droite à gauche (RTL).",
    "clearMetaphor": {
      "intuition": "Un parchemin officiel de décret royal bilingue : le texte arabe est calligraphié de droite à gauche avec sa typographie propre, et la traduction française s'ordonne de gauche à droite sans déformation.",
      "softwareMapping": "Attributs HTML dir='rtl' dynamiques, polices arabes optimisées (Amiri / Noto Sans Arabic) et mise en page CSS Logical Properties (margin-inline, padding-inline).",
      "whyItBreaksWithoutIt": "Le texte juridique arabe s'affiche inversé, les parenthèses de citations sautent de ligne et la ponctuation détruit le sens légal de l'article."
    },
    "situationDetails": {
      "operationalContext": "Système juridique marocain où les versions arabes des Dahirs et décrets font foi devant les tribunaux du Royaume.",
      "disasterScenario": "Une citation d'article en arabe est mal alignée et les chiffres s'inversent (l'article 62 devient 26), induisant en erreur les juristes arabophones.",
      "engineeringMitigation": "Support RTL natif au niveau du document racine, polices typographiques dédiées et tests d'affichage bilingues automatisés."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Forcer un alignement à gauche pour tout le monde et utiliser Google Translate à la volée.",
      "seniorResolution": "Intégration soignée de la typographie arabe avec inversion des contrôles d'interface et respect des normes typographiques du Bulletin Officiel."
    },
    "codeInvariants": [
      "Attribut dir='rtl' et lang='ar' appliqués dynamiquement selon la langue de la source",
      "Utilisation des propriétés CSS logiques (start, end) pour garantir un miroir parfait de l'interface",
      "Zéro dépendance JavaScript lourde pour le rendu initial des textes juridiques"
    ]
  },
  "6-3": {
    "codeExplanation": "Accessibilité numérique complète et conformité WCAG 2.1 AA pour les lecteurs d'écran et la navigation intégrale au clavier.",
    "clearMetaphor": {
      "intuition": "Les rampes d'accès inclinées, les bandes podotactiles et les ascenseurs vocaux d'un palais de justice moderne : tout citoyen peut accéder aux salles d'audience en toute autonomie.",
      "softwareMapping": "Balises HTML sémantiques (main, nav, article), rôles ARIA explicites, annonces dynamiques aria-live pour les réponses et navigation tabulaire ordonnée.",
      "whyItBreaksWithoutIt": "Un juriste malvoyant utilisant un lecteur d'écran NVDA ou VoiceOver n'entend que 'bouton, bouton' et ne peut pas lire les citations d'articles."
    },
    "situationDetails": {
      "operationalContext": "Exigence de conformité légale et d'inclusion pour tous les fonctionnaires et professionnels du droit.",
      "disasterScenario": "L'application est rejetée lors de l'audit d'accessibilité de l'institution publique à cause de boutons non étiquetés et d'un contraste insuffisant.",
      "engineeringMitigation": "Audit automatisé Lighthouse et axe-core validant un score d'accessibilité de 100% et navigation 100% faisable au clavier."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Mettre des balises <div> avec des écouteurs onClick partout et ignorer l'accessibilité vocale.",
      "seniorResolution": "Employer une structure HTML sémantique native, des libellés aria-label explicites et des indicateurs de focus visibles."
    },
    "codeInvariants": [
      "Ratio de contraste textuel supérieur ou égal à 4.5:1 sur tous les éléments d'interface",
      "Tous les boutons et liens interactifs manipulables au clavier avec focus visible",
      "Annonces aria-live='polite' lors de la réception des réponses générées"
    ]
  },
  "7-1": {
    "codeExplanation": "Architecture en 4 piliers invariants garantissant l'indépendance totale entre ingestion, stockage, raisonnement par agent et surface d'API.",
    "clearMetaphor": {
      "intuition": "Les quatre colonnes de marbre soutenant la coupole d'un monument historique : si une colonne subit des travaux, les trois autres maintiennent l'édifice intact sans la moindre fissure.",
      "softwareMapping": "Pilier 1 (Ingestion asynchrone), Pilier 2 (Double stockage SQLite WAL + Qdrant), Pilier 3 (Orchestration cyclique LangGraph), Pilier 4 (Contrat d'API FastAPI OpenAPI 3.1).",
      "whyItBreaksWithoutIt": "Si l'API appelle directement le code d'extraction PDF ou si l'agent modifie directement les fichiers sur disque, un bug dans un parseur paralyse tout le service."
    },
    "situationDetails": {
      "operationalContext": "Système RAG de niveau entreprise devant évoluer pendant des années sans nécessiter de réécriture complète.",
      "disasterScenario": "Une mise à jour de la bibliothèque de vectorisation brise silencieusement l'authentification et le moteur de recherche à cause de dépendances circulaires.",
      "engineeringMitigation": "Séparation stricte des responsabilités en 4 piliers avec contrats d'interfaces explicites et tests d'intégration découplés."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Mélanger logique métier, requêtes SQL et prompts LLM dans les contrôleurs d'API pour aller plus vite.",
      "seniorResolution": "Isolation hermétique des 4 piliers : chaque composant ne communique qu'à travers des interfaces abstraites bien définies."
    },
    "codeInvariants": [
      "Zéro import direct de modules d'ingestion dans les contrôleurs de consultation en ligne",
      "Couplage lâche entre le moteur de vectorisation et le moteur de stockage relationnel",
      "Indépendance totale du domaine métier vis-à-vis des bibliothèques externes d'IA"
    ]
  },
  "7-2": {
    "codeExplanation": "Architecture hexagonale isolant le cœur de domaine de Sanad via 8 ports et adaptateurs explicites (IStoragePort, IVectorPort, ILLMPort, etc.).",
    "clearMetaphor": {
      "intuition": "La prise murale universelle de courant électrique : peu importe que la centrale soit nucléaire, solaire ou éolienne, votre appareil se branche sur la même fiche standard 230V.",
      "softwareMapping": "Le domaine métier interagit uniquement avec des interfaces Python abstraites (Abstract Base Classes) ; les adaptateurs concrets (SQLite, Qdrant, Ollama, OpenAI) sont injectés à l'exécution.",
      "whyItBreaksWithoutIt": "Si le code dépend directement du SDK Qdrant, passer à pgvector ou Milvus exige de réécrire 50 fichiers et 200 fonctions métier."
    },
    "situationDetails": {
      "operationalContext": "Besoin de pouvoir exécuter Sanad soit en local avec Ollama et SQLite, soit dans le cloud avec Qdrant Cloud et des LLM distants.",
      "disasterScenario": "Le fournisseur de cloud d'IA change ses tarifs ou son API ; l'équipe est incapable de basculer sur un modèle local car le code est truffé d'appels propriétaires.",
      "engineeringMitigation": "8 ports hexagonaux étanches : inversion de dépendances stricte et injection des adaptateurs concrets au démarrage du serveur."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Appeler les méthodes du SDK Qdrant et de langchain directement au beau milieu des fonctions métier.",
      "seniorResolution": "Définir des ports abstraits (IVectorStore, ILLMClient) et n'écrire que du code métier agnostique de l'infrastructure."
    },
    "codeInvariants": [
      "Toutes les dépendances pointent vers l'intérieur, vers les abstractions du domaine",
      "Zéro fuite de types propriétaires (classes Qdrant/LangChain) dans le domaine métier",
      "Remplacement d'un adaptateur de stockage possible sans toucher une seule ligne de logique métier"
    ]
  },
  "8-1": {
    "codeExplanation": "Configuration de SQLite en mode WAL (Write-Ahead Logging) avec suppressions en cascade et gestion des transactions concurrentes.",
    "clearMetaphor": {
      "intuition": "Le grand livre d'un notaire avec un carnet de brouillon scellé : les assistants écrivent les nouveaux actes sur le carnet sans bloquer les clients qui lisent les volumes reliés à la bibliothèque.",
      "softwareMapping": "PRAGMA journal_mode = WAL permet des lectures hautement concurrentes sans verrouillage pendant qu'un travailleur en arrière-plan écrit de nouveaux documents.",
      "whyItBreaksWithoutIt": "En mode de journalisation classique, une ingestion lourde de 100 pages verrouille la base SQLite pendant 30 secondes et renvoie des erreurs 500 à tous les utilisateurs en ligne."
    },
    "situationDetails": {
      "operationalContext": "Plateforme juridique accueillant simultanément des utilisateurs consultant des réponses et des administrateurs téléversant de nouveaux décrets.",
      "disasterScenario": "Une erreur fatale 'sqlite3.OperationalError: database is locked' apparaît sur l'écran du juriste pendant qu'un scan PDF est en cours de traitement.",
      "engineeringMitigation": "Activation du mode WAL, réglage du busy_timeout à 5000ms et utilisation d'une connexion d'écriture unique contrôlée."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Conserver la configuration SQLite par défaut et s'étonner des blocages dès le deuxième utilisateur simultané.",
      "seniorResolution": "Configuration optimisée WAL, synchronisation NORMAL, clés étrangères activées et mise en cache des déclarations préparées."
    },
    "codeInvariants": [
      "Exécution obligatoire de PRAGMA journal_mode = WAL à l'initialisation",
      "PRAGMA foreign_keys = ON vérifié sur chaque connexion de pool",
      "PRAGMA busy_timeout = 5000 pour éviter tout échec immédiat sous contention"
    ]
  },
  "8-2": {
    "codeExplanation": "Topologie de recherche vectorielle Qdrant avec architecture Parent-Enfant : recherche sur de petits enfants précis et restitution du grand parent complet au LLM.",
    "clearMetaphor": {
      "intuition": "L'index thématique alphabétique à la fin d'un traité de médecine de 1000 pages : vous trouvez le terme exact en 2 secondes grâce à un mot-clé précis, puis vous lisez le chapitre entier de 5 pages pour comprendre.",
      "softwareMapping": "Les chunks enfants de 200 tokens captent la similarité cosinus avec précision dans Qdrant ; l'identifiant parent_id permet de récupérer le texte parent complet de 1000 tokens dans SQLite.",
      "whyItBreaksWithoutIt": "Des chunks de 200 tokens seuls manquent de contexte et trompent le LLM ; des chunks de 2000 tokens noient la sémantique et diminuent drastiquement la précision de recherche."
    },
    "situationDetails": {
      "operationalContext": "Articles de lois marocaines contenant des définitions en préambule et des exceptions restrictives 3 paragraphes plus loin.",
      "disasterScenario": "Le système ne récupère que l'exception sans la règle générale, amenant le juriste à croire que l'exception s'applique à tous les salariés.",
      "engineeringMitigation": "Architecture Parent-Enfant découplée : indexation fine pour la recherche, expansion au paragraphe parent complet pour la synthèse LLM."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Utiliser une taille de chunk fixe unique de 500 tokens pour tout faire et perdre à la fois en précision et en contexte.",
      "seniorResolution": "Architecture hiérarchique Parent-Enfant : enfants précis pour la similarité vectorielle et parents riches pour la fidélité de réponse."
    },
    "codeInvariants": [
      "Chaque point vectoriel Qdrant contient la métadonnée parent_id liant au parent SQLite",
      "Les vecteurs d'enfants utilisent les dimensions exactes de multilingual-e5-base (1024d)",
      "Récupération garantie du texte parent complet avant injection dans le prompt de synthèse"
    ]
  },
  "8-3": {
    "codeExplanation": "Vérification automatisée de l'alignement entre le contrat OpenAPI 3.1 et les schémas Pydantic du backend pour prévenir toute dérive d'API.",
    "clearMetaphor": {
      "intuition": "Le calibre de contrôle de l'horloger : chaque roue dentée usinée doit s'insérer exactement dans le gabarit d'acier avant de pouvoir être montée dans le mécanisme.",
      "softwareMapping": "Test unitaire tests/test_openapi_drift.py générant le schéma JSON de FastAPI et le comparant avec openapi.json gelé sous contrôle de version.",
      "whyItBreaksWithoutIt": "Un développeur renomme un champ 'doc_id' en 'document_id' côté Python ; le frontend plante silencieusement car il attend toujours l'ancien nom de champ."
    },
    "situationDetails": {
      "operationalContext": "Développement conjoint de l'API backend et du frontend web par deux architectes travaillant en parallèle.",
      "disasterScenario": "Le frontend ne peut plus afficher les résultats de recherche après un déploiement car la structure JSON de la réponse a été modifiée sans concertation.",
      "engineeringMitigation": "Porte CI bloquante détectant toute modification de contrat d'API non accompagnée d'une mise à jour documentée et concertée."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Modifier les modèles backend à la volée sans mettre à jour les schémas du frontend ni la documentation de l'API.",
      "seniorResolution": "Contrat d'API gelé et test de dérive automatique en CI : toute modification de signature casse le build tant que le contrat n'est pas révisé."
    },
    "codeInvariants": [
      "Le test tests/test_openapi_drift.py doit réussir à chaque exécution de pipeline CI",
      "Zéro suppression ou modification de type sur les champs existants sans versionnage d'API",
      "Documentation OpenAPI 3.1 générée automatiquement et conforme à 100% aux modèles réels"
    ]
  },
  "9-1": {
    "codeExplanation": "Protocole de reprise sur incident détectant et nettoyant les tâches d'ingestion abandonnées suite à un arrêt brutal du serveur.",
    "clearMetaphor": {
      "intuition": "Le contremaître d'un chantier qui inspecte les échafaudages au matin d'une tempête : il démonte les structures à moitié posées avant d'autoriser la reprise du travail en toute sécurité.",
      "softwareMapping": "Au démarrage de FastAPI (lifespan), recovery.py recherche tous les documents marqués 'PROCESSING' depuis plus de 15 minutes et les réinitialise à 'FAILED' ou les relance proprement.",
      "whyItBreaksWithoutIt": "Si le conteneur Docker redémarre pendant l'ingestion d'un PDF, le fichier reste bloqué indéfiniment en statut 'EN COURS' et ne peut plus jamais être retraité."
    },
    "situationDetails": {
      "operationalContext": "Environnement de production conteneurisé sur Railway soumis à des redémarrages automatiques lors des déploiements.",
      "disasterScenario": "Des centaines de décrets restent dans un état zombie 'PROCESSING' après un redémarrage nocturne, invisibles dans les recherches des juristes.",
      "engineeringMitigation": "Routine d'auto-guérison au démarrage scannant la base de données et libérant les verrous des tâches orphelines."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Ignorer les états de crash et forcer l'utilisateur à redémarrer manuellement la base ou à ré-importer ses fichiers.",
      "seniorResolution": "Mécanisme de recovery automatique au démarrage avec détection des tâches périmées et journalisation des causes d'échec."
    },
    "codeInvariants": [
      "Exécution automatique du scanner de récupération au lancement du serveur FastAPI",
      "Aucun document ne peut rester en statut PROCESSING plus de 15 minutes sans battement de cœur",
      "Nettoyage transactionnel des chunks orphelins dans SQLite et Qdrant en cas d'échec"
    ]
  },
  "9-2": {
    "codeExplanation": "Mécanisme de verrouillage à vol unique (Single-Flight Mutex) empêchant le traitement concurrent du même document et protégeant la mémoire vive.",
    "clearMetaphor": {
      "intuition": "Le tourniquet d'accès d'un musée prestigieux : il ne laisse passer qu'un visiteur à la fois pour éviter l'engorgement des salles d'exposition et la bousculade.",
      "softwareMapping": "asyncio.Lock et table SQLite ingestion_locks garantissant qu'un même fichier n'est jamais analysé par deux travailleurs en parallèle.",
      "whyItBreaksWithoutIt": "Un utilisateur clique nerveusement 5 fois sur le bouton 'Importer' ; le serveur lance 5 OCR simultanés, sature la RAM de 8 Go et le serveur s'éteint (OOM Kill)."
    },
    "situationDetails": {
      "operationalContext": "Serveur de production tournant sur une machine virtuelle aux ressources limitées (2 vCPU, 4 Go de RAM).",
      "disasterScenario": "Une double ingestion accidentelle d'un PDF de 50 Mo déclenche deux vectorisations concurrentes qui épuisent la mémoire et font planter l'instance.",
      "engineeringMitigation": "Verrou applicatif asynchrone et verrou transactionnel en base de données rejetant immédiatement les soumissions redondantes."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Lancer un thread non surveillé à chaque requête sans limiter le parallélisme ni vérifier les doublons.",
      "seniorResolution": "Verrouillage single-flight strict par empreinte SHA-256 avec mise en file d'attente contrôlée et rejet des requêtes en double."
    },
    "codeInvariants": [
      "Un seul processus d'ingestion actif par empreinte de document à un instant t",
      "Consommation mémoire bornée ne dépassant jamais 75% du plafond alloué à l'instance",
      "Libération garantie du mutex dans un bloc try...finally même en cas d'exception non gérée"
    ]
  },
  "10-1": {
    "codeExplanation": "Hachage cryptographique du contenu par SHA-256 et machine à 4 états (NEW, UNCHANGED, MODIFIED, ORPHAN) pour éviter les ré-ingestions inutiles.",
    "clearMetaphor": {
      "intuition": "Le lecteur d'empreintes digitales aux frontières : si votre empreinte correspond exactement à celle enregistrée au passeport, vous passez sans refaire tout le dossier administratif.",
      "softwareMapping": "Le SHA-256 du fichier entrant est comparé aux empreintes stockées en base ; si l'empreinte est identique, le document passe directement en statut UNCHANGED sans recalcul de vecteurs.",
      "whyItBreaksWithoutIt": "Chaque synchronisation ré-ingère et ré-émet des milliers de requêtes d'embedding coûteuses pour des documents qui n'ont pas changé d'une seule virgule."
    },
    "situationDetails": {
      "operationalContext": "Synchronisation quotidienne d'un dossier documentaire de 10 000 articles juridiques dont seuls 2 ou 3 décrets sont modifiés par mois.",
      "disasterScenario": "La facture de calcul d'embedding explose inutilement et le serveur tourne à 100% de CPU pendant 4 heures chaque matin pour rien.",
      "engineeringMitigation": "Détection différentielle basée sur le hash SHA-256 évitant tout travail superflu sur les fichiers inchangés."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Supprimer toute la base et tout ré-indexer depuis le début à chaque nouveau téléversement de fichier.",
      "seniorResolution": "Gestion fine du cycle de vie par empreinte cryptographique : seules les nouveautés et les modifications réelles sont indexées."
    },
    "codeInvariants": [
      "Calcul systématique du hash SHA-256 sur le binaire brut avant toute opération",
      "Les documents avec statut UNCHANGED sont ignorés sans aucun appel au modèle de vectorisation",
      "Suppression propre des anciens vecteurs dans Qdrant lorsqu'un document passe en MODIFIED"
    ]
  },
  "10-2": {
    "codeExplanation": "Échelle de conversion de documents juridiques en texte pur Markdown avec extraction des métadonnées structurelles (articles, sections, alinéas).",
    "clearMetaphor": {
      "intuition": "Un atelier de traduction de manuscrits anciens : on sépare soigneusement le texte du parchemin, on numérote les strophes et on indexe les chapitres pour les rendre exploitables.",
      "softwareMapping": "Conversion ordonnée PDF/Docx -> Markdown nettoyé -> Découpage hiérarchique préservant l'intitulé exact de l'article de loi dans l'en-tête de chaque chunk.",
      "whyItBreaksWithoutIt": "Un chunk contient 'La peine est de 3 ans de prison' sans préciser quel crime est visé car l'en-tête de chapitre a été découpé dans le chunk précédent."
    },
    "situationDetails": {
      "operationalContext": "Textes du Code du Travail marocain où la portée juridique d'un alinéa dépend impérativement du titre du chapitre qui le chapeaute.",
      "disasterScenario": "Le système attribue par erreur les sanctions du travail clandestin à une simple omission de déclaration à cause d'un chunk orphelin de contexte.",
      "engineeringMitigation": "Injection automatique des métadonnées hiérarchiques (Chapitre, Section, Article) au début de chaque fragment de texte découpé."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Découper le texte bêtement tous les 500 caractères sans se soucier des frontières de phrases ni des titres de sections.",
      "seniorResolution": "Découpage conscient de la structure juridique (Semantic Hierarchy Chunking) préservant l'arborescence légale du texte."
    },
    "codeInvariants": [
      "Chaque chunk commence obligatoirement par son chemin hiérarchique juridique complet",
      "Interdiction de couper un mot au milieu ou de casser une phrase entre deux chunks",
      "Préservation intégrale des tableaux de barèmes et d'indemnités sous forme de tables Markdown"
    ]
  },
  "10-3": {
    "codeExplanation": "Génération de vecteurs denses avec le modèle multilingual-e5-base et application obligatoire des préfixes E5 asymétriques ('passage:' vs 'query:').",
    "clearMetaphor": {
      "intuition": "Un dictionnaire de traduction avec codes de couleurs : les entrées du lexique sont surlignées en bleu (passage) et les questions des étudiants sont notées en vert (requête). Les couleurs guident la correspondance idéale.",
      "softwareMapping": "Le modèle multilingual-e5 a été entraîné de manière asymétrique : les textes de loi doivent être préfixés par 'passage: ' et les questions d'utilisateurs par 'query: '.",
      "whyItBreaksWithoutIt": "Si on oublie le préfixe 'query: ', l'espace géométrique des embeddings est faussé et la similarité cosinus s'effondre de 30% sur les textes multilingues."
    },
    "situationDetails": {
      "operationalContext": "Indexation de textes juridiques rédigés en français et en arabe nécessitant une recherche sémantique croisée haute fidélité.",
      "disasterScenario": "La recherche vectorielle renvoie des résultats totalement hors sujet parce que les vecteurs ont été générés sans le préfixe asymétrique obligatoire.",
      "engineeringMitigation": "Fonction d'encapsulation de l'embedding appliquant systématiquement le bon préfixe selon le contexte (ingestion vs interrogation)."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Passer directement le texte brut au modèle d'embedding sans lire la documentation officielle sur les préfixes.",
      "seniorResolution": "Normalisation stricte dans l'adaptateur vectoriel : préfixe 'passage: ' garanti à l'indexation et 'query: ' garanti à la recherche."
    },
    "codeInvariants": [
      "Tous les documents indexés dans Qdrant portent le préfixe 'passage: '",
      "Toutes les requêtes de recherche utilisateur sont préfixées par 'query: ' avant vectorisation",
      "Normalisation L2 des vecteurs pour que le produit scalaire équivaille rigoureusement à la similarité cosinus"
    ]
  },
  "11-1": {
    "codeExplanation": "Machine d'états cyclique LangGraph orchestrant 9 nœuds spécialisés avec transitions conditionnelles et compteurs de boucle stricts.",
    "clearMetaphor": {
      "intuition": "La chaîne d'assemblage automatisée d'une manufacture de montres de précision : chaque artisan inspecte la pièce, effectue un réglage unique, et peut renvoyer la montre à l'artisan précédent si le réglage n'est pas parfait.",
      "softwareMapping": "Graphe d'états d'agents : router -> retrieve -> grade -> rewrite -> generate -> check_hallucination -> deliver, avec routage dynamique selon les résultats.",
      "whyItBreaksWithoutIt": "Un script linéaire ne peut pas s'auto-corriger lorsqu'une recherche initiale donne des documents imprécis, et se retrouve condamné à halluciner."
    },
    "situationDetails": {
      "operationalContext": "Traitement de requêtes complexes nécessitant parfois une clarification, une réécriture ou un filtrage des documents non pertinents.",
      "disasterScenario": "Une question formulée de manière informelle échoue sur la recherche vectorielle et l'utilisateur reçoit une réponse vide au lieu d'une question de clarification.",
      "engineeringMitigation": "Graphe cyclique avec nœud d'auto-évaluation et boucle de rétroaction intelligente vers la reformulation."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Utiliser une chaîne séquentielle rigide (RetrievalQA de base) incapable de s'adapter aux requêtes difficiles.",
      "seniorResolution": "Graphe d'état piloté par LangGraph avec état immuable, transitions conditionnelles explicites et sécurité anti-boucle infinie."
    },
    "codeInvariants": [
      "L'état SanadAgentState est immuable et transmis de nœud en nœud sans effets de bord",
      "Plafond de réécriture fixé à 2 boucles maximum avant bascule automatique vers le refus poli",
      "Chaque transition du graphe est journalisée avec ses métadonnées d'exécution pour la traçabilité"
    ]
  },
  "11-2": {
    "codeExplanation": "Moteur de recherche hybride combinant la similarité vectorielle dense et la recherche lexicale BM25 via l'algorithme Reciprocal Rank Fusion (RRF k=60).",
    "clearMetaphor": {
      "intuition": "Un détective travaillant en tandem avec un archiviste : le détective comprend le sens sous-jacent et les mobiles (dense), tandis que l'archiviste retrouve la cote exacte du dossier au mot près (BM25).",
      "softwareMapping": "RRF score = 1 / (60 + dense_rank) + 1 / (60 + bm25_rank). Cette formule mathématique réconcilie les classements sans biais d'échelle de score.",
      "whyItBreaksWithoutIt": "La recherche vectorielle seule peine sur les acronymes légaux précis (ex: 'CNSS', 'CDD') ; la recherche lexicale seule rate les synonymes ('licenciement' vs 'rupture de contrat')."
    },
    "situationDetails": {
      "operationalContext": "Utilisateurs cherchant des termes techniques spécifiques ou des numéros d'articles précis mêlés à des questions en langage naturel.",
      "disasterScenario": "L'utilisateur tape 'Article 62 Code du Travail' et le vecteur renvoie des dissertations générales sur le contrat de travail sans trouver l'article exact.",
      "engineeringMitigation": "Fusion hybride RRF équilibrant la précision du mot-clé exact (BM25) et la compréhension sémantique profonde (Qdrant dense)."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Ne faire qu'une simple recherche vectorielle et espérer que le modèle devine les numéros d'articles obscurs.",
      "seniorResolution": "Recherche hybride Dense + Creuse avec fusion RRF normalisée (k=60) offrant le meilleur des deux mondes de l'IR."
    },
    "codeInvariants": [
      "Constante RRF k fixée rigoureusement à 60 selon le standard d'évaluation TREC",
      "Exécution conjointe de la recherche BM25 et de la recherche vectorielle Qdrant",
      "Dédoublonnage strict des documents avant transmission au nœud de filtrage"
    ]
  },
  "11-3": {
    "codeExplanation": "Nœud de filtrage binaire évaluant la pertinence juridique réelle de chaque document extrait avant de l'autoriser à entrer dans le prompt de synthèse.",
    "clearMetaphor": {
      "intuition": "L'agent de sécurité au tribunal qui passe chaque bagage au scanner à rayons X : si un objet suspect ou sans rapport avec le procès est détecté, il est immédiatement écarté de la salle d'audience.",
      "softwareMapping": "Le nœud grade_documents soumet chaque paire (requête, chunk) à un évaluateur rapide qui répond par 'yes' ou 'no' ; les chunks 'no' sont éliminés du contexte.",
      "whyItBreaksWithoutIt": "Un document non pertinent inséré dans le prompt 'distrait' le modèle de synthèse et provoque des confusions ou des réponses contradictoires."
    },
    "situationDetails": {
      "operationalContext": "Recherches juridiques où un seul document hors sujet peut introduire une ambiguïté fatale dans l'analyse légale.",
      "disasterScenario": "Le système intègre par erreur un décret abrogé dans le contexte et conseille à l'employeur d'appliquer une procédure obsolète depuis 10 ans.",
      "engineeringMitigation": "Filtrage binaire sans compromis ne retenant que les extraits apportant une valeur de preuve incontestable à la question posée."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Prendre les 5 premiers résultats de la recherche vectorielle et les injecter tous tels quels dans le prompt LLM.",
      "seniorResolution": "Filtrage rigoureux de chaque extrait documentaire avec rejet des éléments bruités pour ne nourrir le LLM qu'avec de l'information pure."
    },
    "codeInvariants": [
      "Évaluation de pertinence sous forme de décision binaire stricte ('yes' / 'no')",
      "Élimination sans appel des fragments jugés non pertinents avant la synthèse",
      "Déclenchement immédiat de la boucle de reformulation si aucun document n'est validé"
    ]
  },
  "12-1": {
    "codeExplanation": "Benchmark doré gelé de 60 questions juridiques réelles avec vérité de terrain vérifiée et mesure continue de la triade RAGAS (Fidélité, Pertinence de réponse, Pertinence de contexte).",
    "clearMetaphor": {
      "intuition": "L'examen national du barreau : 60 cas pratiques standardisés aux corrigés officiels immuables ; chaque promotion d'étudiants est notée selon la même grille de correction rigoureuse.",
      "softwareMapping": "Script tests/run_benchmark.py exécutant les 60 cas types et calculant automatiquement les scores RAGAS avec seuil d'admissibilité fixé à 0.85.",
      "whyItBreaksWithoutIt": "L'équipe modifie un prompt pour corriger un cas particulier et dégrade silencieusement les performances sur 50 autres questions sans s'en rendre compte."
    },
    "situationDetails": {
      "operationalContext": "Cycle d'amélioration continue où chaque ajustement de prompt ou de découpage de texte doit prouver scientifiquement son apport.",
      "disasterScenario": "Une régression majeure est introduite en production et l'équipe ne le découvre qu'après les plaintes d'utilisateurs furieux.",
      "engineeringMitigation": "Exécution systématique du benchmark doré en intégration continue avec alerte immédiate en cas de baisse de score."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Tester l'application à la main avec 2 ou 3 questions rapides dans son navigateur et déclarer que 'ça a l'air de bien marcher'.",
      "seniorResolution": "Évaluation automatisée sur 60 questions d'or représentatives avec métriques RAGAS quantifiées et historiques de scores comparés."
    },
    "codeInvariants": [
      "Corpus de 60 questions gelé et versionné dans data/golden_benchmark.json",
      "Calcul systématique des métriques de Fidélité (Faithfulness) et de Pertinence (Answer Relevance)",
      "Seuil de non-régression : score global RAGAS supérieur ou égal à 0.85 pour valider le sprint"
    ]
  },
  "12-2": {
    "codeExplanation": "Les 3 portes de release non négociables (Gate 1 : Couverture de tests, Gate 2 : Benchmark RAGAS, Gate 3 : Absence de failles de sécurité) interdisant toute mise en production non conforme.",
    "clearMetaphor": {
      "intuition": "Les trois sas de décontamination d'un laboratoire de haute sécurité P4 : le chercheur ne peut franchir le sas suivant que si l'analyse de pureté du sas précédent est validée à 100%.",
      "softwareMapping": "Pipeline GitHub Actions exécutant tests unitaires (couverture > 80%), benchmark doré (RAGAS > 0.85) et audit de vulnérabilités (Safety & Bandit).",
      "whyItBreaksWithoutIt": "Sous la pression de la date de soutenance, un développeur déploie une version non testée comportant une faille de sécurité critique ou des erreurs 500."
    },
    "situationDetails": {
      "operationalContext": "Exigence d'excellence technique imposée pour la soutenance finale devant le jury universitaire.",
      "disasterScenario": "Le système plante lamentablement pendant l'évaluation en direct à cause d'une régression qui aurait été arrêtée par la porte 1.",
      "engineeringMitigation": "Verrouillage absolu du déploiement automatisé par 3 portes logiques indépendantes sans dérogation possible."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Désactiver les tests en CI avec un flag '--skip-tests' parce qu'on est pressé de livrer.",
      "seniorResolution": "Respect inconditionnel des 3 portes : aucun déploiement ne peut être validé si un seul voyant est à l'orange ou au rouge."
    },
    "codeInvariants": [
      "Gate 1 : Suite de tests unitaires et d'intégration validée à 100% avec couverture supérieure à 80%",
      "Gate 2 : Score de fidélité RAGAS au-dessus de 0.85 sur l'ensemble du benchmark doré",
      "Gate 3 : Zéro vulnérabilité critique ou élevée détectée par le scanner de sécurité"
    ]
  },
  "12-3": {
    "codeExplanation": "Gestion sémantique et catalogage des versions de prompts (SemVer) dans prompts/ avec historique des modifications et graines d'évaluation reproductibles.",
    "clearMetaphor": {
      "intuition": "La pharmacopée officielle des médicaments : chaque formule chimique est numérotée avec une version précise et un protocole clinique prouvant son efficacité avant autorisation.",
      "softwareMapping": "Fichiers de prompts versionnés (system_prompt_v1.2.0.txt) assortis d'un fichier de métadonnées indiquant le modèle cible, la température et le score RAGAS obtenu.",
      "whyItBreaksWithoutIt": "Un développeur modifie une phrase dans un prompt directement dans le code sans laisser de trace ; les résultats chutent et personne ne sait comment revenir à la version précédente."
    },
    "situationDetails": {
      "operationalContext": "Optimisation itérative de la précision des réponses juridiques nécessitant une rigueur de traçabilité digne d'un laboratoire scientifique.",
      "disasterScenario": "Perte de la version de prompt qui avait obtenu d'excellents résultats lors des répétitions, sans aucun moyen de la restaurer fidèlement.",
      "engineeringMitigation": "Registre centralisé de prompts versionné sous Git avec tests de non-régression couplés à chaque incrément de version."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Écrire les prompts en dur sous forme de chaînes de caractères au milieu du code Python sans versionnage.",
      "seniorResolution": "Isoler les prompts dans un catalogue dédié, appliquer le versionnage sémantique et documenter l'impact de chaque modification de formulation."
    },
    "codeInvariants": [
      "Tous les prompts de production sont stockés dans le dossier prompts/ avec version sémantique",
      "Chaque version de prompt est liée à son rapport d'évaluation benchmark correspondant",
      "Interdiction d'injecter des prompts non validés ou modifiés à la volée en environnement de production"
    ]
  },
  "13-1": {
    "codeExplanation": "Authentification OIDC avec Keycloak et sécurisation des sessions utilisateur par cookies chiffrés en AES-GCM 256 bits avec drapeaux HttpOnly et SameSite=Strict.",
    "clearMetaphor": {
      "intuition": "Le badge d'accès biométrique infalsifiable d'un ministère régalien : la puce électronique est scellée par chiffrement militaire ; aucun faussaire ne peut copier les droits ni écouter les transmissions.",
      "softwareMapping": "FastAPI valide le jeton JWT OIDC émis par Keycloak, dérive une clé cryptographique locale et chiffre l'identifiant de session dans un cookie opaque hermétique aux scripts tiers.",
      "whyItBreaksWithoutIt": "Si les jetons sont stockés en clair dans le localStorage du navigateur, une simple injection XSS sur une bibliothèque tierce permet le vol immédiat de toutes les sessions."
    },
    "situationDetails": {
      "operationalContext": "Plateforme juridique traitant des secrets d'affaires et des données RH hautement confidentielles sous réglementation stricte.",
      "disasterScenario": "Un attaquant extrait le jeton de session d'un directeur juridique et accède en toute impunité à l'ensemble des requêtes et documents d'entreprise.",
      "engineeringMitigation": "Gestion des sessions côté serveur, cookies chiffrés AES-GCM inviolables, drapeaux HttpOnly, Secure et rotation continue des secrets."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Stocker les jetons JWT bruts dans le localStorage du navigateur et désactiver la vérification des signatures pour tester plus vite.",
      "seniorResolution": "Chiffrement AES-GCM hermétique des cookies de session avec drapeaux de protection stricts et validation cryptographique systématique auprès de Keycloak."
    },
    "codeInvariants": [
      "Drapeaux de cookies obligatoires : HttpOnly = True, Secure = True, SameSite = Strict",
      "Chiffrement symétrique AES-256-GCM avec vecteur d'initialisation unique par session",
      "Révocation immédiate de session en cas d'invalidation ou d'expiration du jeton OIDC"
    ]
  },
  "13-2": {
    "codeExplanation": "Matrice de contrôle d'accès RBAC à 4 niveaux (SuperAdmin, OrgAdmin, LegalUser, ReadOnly) et mise en quarantaine automatique des nouveaux inscrits sans rôle validé.",
    "clearMetaphor": {
      "intuition": "Le protocole de sécurité d'un état-major militaire : un nouveau visiteur qui s'enregistre à l'accueil est conduit dans un salon d'attente vitré sans accès aux couloirs tant qu'un officier supérieur n'a pas signé son laissez-passer.",
      "softwareMapping": "Tout compte créé via auto-inscription reçoit le rôle 'QUARANTINE' ; l'accès aux endpoints d'API de recherche et d'ingestion est bloqué jusqu'à validation par un OrgAdmin.",
      "whyItBreaksWithoutIt": "Un utilisateur externe s'inscrit librement et commence immédiatement à interroger ou saturer le corpus juridique interne sans aucune vérification d'identité."
    },
    "situationDetails": {
      "operationalContext": "Déploiement en entreprise où l'accès aux documents juridiques sensibles doit être soumis à une approbation hiérarchique explicite.",
      "disasterScenario": "Un employé licencié ou un tiers non autorisé crée un compte et consulte des dossiers prud'homaux confidentiels sans que personne ne s'en aperçoive.",
      "engineeringMitigation": "SAS de quarantaine natif et middleware de contrôle des permissions vérifiant l'appartenance organisationnelle et le rôle validé."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Accorder automatiquement les droits d'écriture et de lecture standard à toute personne qui valide son adresse e-mail.",
      "seniorResolution": "Politique de moindre privilège par défaut : mise en quarantaine immédiate de tout nouvel utilisateur jusqu'à autorisation expresse d'un administrateur."
    },
    "codeInvariants": [
      "Rôle initial par défaut systématiquement fixé à 'QUARANTINE' lors de l'enregistrement",
      "Blocage de toutes les routes de données pour les utilisateurs non vérifiés avec code 403 Forbidden",
      "Journalisation immuable de chaque changement de rôle dans la table des pistes d'audit"
    ]
  },
  "14-1": {
    "codeExplanation": "Protection contre les attaques BOLA (Broken Object Level Authorization) : toute tentative d'accès à un document d'un autre espace de travail renvoie un code HTTP 404 Not Found silencieux au lieu d'un 403 explicite.",
    "clearMetaphor": {
      "intuition": "Un majordome discret dans un hôtel d'ambassadeurs : si un individu demande 'Qui loge dans la suite 402 ?', il répond calmement 'Il n'y a pas de suite de ce nom ici' sans jamais révéler si la chambre existe ou qui l'occupe.",
      "softwareMapping": "Les requêtes SQL filtrent à la fois par id ET par org_id ; si la ligne n'appartient pas à l'organisation de l'utilisateur, elle n'est pas trouvée, générant un 404 standard.",
      "whyItBreaksWithoutIt": "Si l'API renvoie une erreur 403 'Accès interdit au document 452', l'attaquant apprend que le document 452 existe et peut cartographier tous les documents confidentiels par force brute."
    },
    "situationDetails": {
      "operationalContext": "API REST multi-entreprises exposée sur Internet et soumise à des scans de vulnérabilités et des attaques par énumération d'identifiants.",
      "disasterScenario": "Un concurrent utilise un script automatisé pour énumérer les identifiants de documents et déduit l'activité contentieuse de ses rivaux grâce aux messages d'erreur 403.",
      "engineeringMitigation": "Défense BOLA par refus silencieux 404 : zéro fuite d'information sur l'existence ou la structure des données d'autres organisations."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Renvoyer une erreur 403 'Vous n'avez pas la permission d'accéder à ce document d'une autre entreprise' et révéler l'existence de la ressource.",
      "seniorResolution": "Défense silencieuse avec 404 Not Found : rendre les données des autres organisations mathématiquement invisibles et indétectables."
    },
    "codeInvariants": [
      "Toute tentative d'accès non autorisé à un objet tiers renvoie rigoureusement un code HTTP 404",
      "Zéro différence de temps de réponse observable entre un document inexistant et un document non autorisé",
      "Interdiction formelle des messages d'erreur mentionnant l'existence d'autres organisations"
    ]
  },
  "14-2": {
    "codeExplanation": "Validation stricte des identifiants par UUID v4 et assainissement des chemins de fichiers pour empêcher les traversées de répertoires (Path Traversal) et injections SQL.",
    "clearMetaphor": {
      "intuition": "Le sas hermétique d'une banque centrale : tout paquet entrant passe par un scanner dimensionnel strict. Si le colis ne respecte pas exactement la géométrie standard, il est instantanément refoulé sans toucher au coffre.",
      "softwareMapping": "Pydantic et uuid.UUID rejettent immédiatement toute tentative d'injection de chemins type '../../etc/passwd' ou de chaînes SQL malveillantes avant que le code métier ne s'exécute.",
      "whyItBreaksWithoutIt": "Un fichier téléversé nommé '../../../app/config.py' écrase le fichier de configuration du serveur et ouvre un accès racine complet à l'attaquant."
    },
    "situationDetails": {
      "operationalContext": "Téléversement de documents juridiques par des utilisateurs externes et manipulation de fichiers sur le système de stockage local du conteneur.",
      "disasterScenario": "Une attaque par traversée de répertoires permet à un utilisateur malveillant de lire les variables d'environnement et les clés de chiffrement de production.",
      "engineeringMitigation": "Assainissement systématique des noms de fichiers par conversion en UUID v4 aléatoires et dissociation complète du nom d'origine."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Faire confiance au nom de fichier fourni par le navigateur et concaténer les chemins avec os.path.join sans validation.",
      "seniorResolution": "Renommer immédiatement tout fichier entrant avec un UUID v4 unique et vérifier que le chemin résolu demeure strictement dans le dossier de stockage dédié."
    },
    "codeInvariants": [
      "Tous les fichiers stockés sur disque portent un nom UUID v4 aléatoire pur sans extension risquée",
      "Vérification que os.path.realpath() réside rigoureusement dans le sous-dossier de stockage autorisé",
      "Paramétrage strict de toutes les requêtes SQL sans aucune concaténation directe de chaînes"
    ]
  },
  "14-3": {
    "codeExplanation": "Module de détection et de masquage des données personnelles (PII) conforme à la Loi marocaine 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.",
    "clearMetaphor": {
      "intuition": "Le stylo feutre noir du greffier en chef qui biffe méthodiquement les noms, adresses et numéros de cartes d'identité sur les jugements avant de les rendre publics pour la jurisprudence.",
      "softwareMapping": "Expressions régulières et reconnaissance d'entités nommées repérant les numéros de CIN marocaine, numéros de téléphone et adresses e-mail pour les remplacer par des balises [ANONYMISÉ].",
      "whyItBreaksWithoutIt": "Un arrêt de tribunal contenant le nom, le salaire et l'adresse personnelle d'un salarié est indexé en clair dans la base vectorielle, violant gravement la loi 09-08 et exposant l'entreprise à de lourdes sanctions de la CNDP."
    },
    "situationDetails": {
      "operationalContext": "Traitement de contentieux prud'homaux et de conventions collectives contenant des données nominatives sensibles soumises au contrôle de la CNDP marocaine.",
      "disasterScenario": "Le système d'IA divulgue le numéro de sécurité sociale et le dossier médical d'un employé lors d'une recherche juridique générale.",
      "engineeringMitigation": "Pipeline d'anonymisation automatique et irréversible en amont de la vectorisation, garantissant qu'aucune donnée PII n'entre dans les vecteurs ni dans les prompts LLM."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Penser que la protection de la vie privée ne concerne que les bases de données SQL et ignorer les données injectées dans les embeddings.",
      "seniorResolution": "Masquage cryptographique et détection automatique des PII avant tout découpage ou indexation vectorielle dans le respect scrupuleux de la loi 09-08."
    },
    "codeInvariants": [
      "Masquage systématique des numéros de CIN marocaine (format 1-2 lettres suivies de 5-6 chiffres)",
      "Anonymisation des numéros de téléphone et adresses e-mail avant tout stockage vectoriel",
      "Conformité vérifiée aux directives de la Commission Nationale de contrôle de la protection des Données à caractère Personnel (CNDP)"
    ]
  },
  "15-1": {
    "codeExplanation": "Gestionnaire de paquets ultra-rapide Astral uv et environnement Python 3.12 avec PyTorch compilé pour processeur (CPU-only) garantissant une image conteneur légère et un démarrage instantané.",
    "clearMetaphor": {
      "intuition": "Un bolide de course d'endurance dont on a retiré tous les sièges superflus et le capitonnage lourd : le véhicule gagne 500 kg et démarre au quart de tour avec une efficacité énergétique maximale.",
      "softwareMapping": "Utilisation de l'indicateur d'index PyTorch CPU dédié (https://download.pytorch.org/whl/cpu) réduisant la taille des dépendances de 4 Go à 200 Mo et divisant par 10 le temps de build.",
      "whyItBreaksWithoutIt": "Télécharger par mégarde les binaires PyTorch avec les pilotes NVIDIA CUDA alourdit l'image Docker de 6 Go et fait exploser les limites de stockage du serveur cloud."
    },
    "situationDetails": {
      "operationalContext": "Hébergement sur des serveurs cloud mutualisés sans processeur graphique GPU dédié, nécessitant une utilisation optimale du CPU.",
      "disasterScenario": "Le build Docker échoue sur le cloud par manque d'espace disque lors du téléchargement des 5 Go de bibliothèques CUDA inutiles.",
      "engineeringMitigation": "Configuration uv avec index de packages CPU explicite et compilation optimisée pour les architectures x86_64 et ARM64."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Faire un simple 'pip install torch' sans spécifier d'index et télécharger 4 Go de pilotes graphiques inutiles.",
      "seniorResolution": "Cibler précisément la version PyTorch CPU ultra-légère via le gestionnaire uv pour garantir un déploiement éclair et économique."
    },
    "codeInvariants": [
      "Installation exclusive de la version PyTorch CPU sans dépendance CUDA superflue",
      "Utilisation du gestionnaire Astral uv pour des temps de build inférieurs à 30 secondes",
      "Verrouillage strict des versions dans uv.lock pour une reproductibilité binaire parfaite"
    ]
  },
  "15-2": {
    "codeExplanation": "Construction Docker multi-étapes (Multi-Stage Build) avec image finale minimale Alpine/Debian-slim exécutée sous un utilisateur système non privilégié sans droits root.",
    "clearMetaphor": {
      "intuition": "L'organisation d'une salle des coffres : les ouvriers et les maçons qui ont construit les murs quittent le bâtiment avec tous leurs outils lourds ; seuls les gardiens assermentés restent à l'intérieur avec le strict nécessaire.",
      "softwareMapping": "Étape de build avec compilateurs C et outils uv, puis copie des seuls artefacts compilés dans l'image d'exécution finale sous l'utilisateur 'appuser' (UID 10001).",
      "whyItBreaksWithoutIt": "Si l'application tourne en tant que root, la moindre faille applicative dans une bibliothèque tiers permet à un attaquant de prendre le contrôle complet de la machine hôte."
    },
    "situationDetails": {
      "operationalContext": "Audit de sécurité rigoureux avant la mise en service dans un environnement d'entreprise exigeant le respect des normes CIS Docker Benchmark.",
      "disasterScenario": "Une vulnérabilité dans une dépendance PDF permet l'exécution de code à distance avec les privilèges root sur le serveur de production.",
      "engineeringMitigation": "Image finale épurée sans compilateurs, utilisateur non-root sans accès sudo et système de fichiers racine monté en lecture seule."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Utiliser une image Docker 'python:latest' géante et lancer le serveur en tant que root par simplicité.",
      "seniorResolution": "Multi-stage build hermétique avec bascule vers un utilisateur système non privilégié et surface d'attaque réduite au minimum absolu."
    },
    "codeInvariants": [
      "Instruction 'USER appuser' obligatoire avant le point d'entrée CMD ou ENTRYPOINT",
      "Zéro compilateur (gcc, make) ni paquet de développement présent dans l'image finale",
      "Audit de sécurité Trivy validant l'absence de vulnérabilités système critiques dans l'image"
    ]
  },
  "15-3": {
    "codeExplanation": "Déploiement sur l'infrastructure cloud Railway avec montage de volumes persistants sur /app/data et sondes de santé périodiques /healthz.",
    "clearMetaphor": {
      "intuition": "Un navire d'exploration amarré au port : il peut lever l'ancre et changer d'équipage à tout moment, mais ses archives et ses cartes restent en sécurité dans un coffre étanche scellé au quai.",
      "softwareMapping": "Le stockage SQLite WAL et les données Qdrant sont montés sur le volume persistant /app/data ; les sondes HTTP vérifient en continu la réactivité de l'application.",
      "whyItBreaksWithoutIt": "Sans volume persistant monté, chaque redéploiement de code réinitialise le conteneur et efface l'intégralité des documents et des index juridiques accumulés."
    },
    "situationDetails": {
      "operationalContext": "Environnement d'hébergement cloud moderne où les conteneurs sont par nature éphémères et redémarrés fréquemment lors des mises à jour.",
      "disasterScenario": "Une mise à jour automatique efface les 500 décrets indexés la veille au soir, obligeant l'équipe à tout ré-ingérer en catastrophe.",
      "engineeringMitigation": "Configuration explicite des points de montage persistants et sondes d'activité garantissant le redémarrage automatique en cas de blocage."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Stocker la base de données directement dans le système de fichiers éphémère du conteneur Docker.",
      "seniorResolution": "Séparation totale du code exécutable et des données persistantes via un volume cloud sécurisé avec sauvegardes régulières."
    },
    "codeInvariants": [
      "Toutes les bases de données (SQLite, Qdrant) doivent résider exclusivement sur le montage /app/data",
      "La sonde /healthz vérifie l'accessibilité en écriture du volume persistant",
      "Temps de réponse de la sonde de santé inférieur à 50 millisecondes sous charge normale"
    ]
  },
  "16-1": {
    "codeExplanation": "Configuration au démarrage basée sur Pydantic BaseSettings avec stratégie Fail-Fast : le serveur refuse de démarrer si une variable d'environnement critique est manquante ou invalide.",
    "clearMetaphor": {
      "intuition": "La liste de vérification avant décollage d'un commandant de bord : si un seul voyant de pression de carburant ou d'oxygène n'est pas au vert, les moteurs sont coupés avant même de quitter le tarmac.",
      "softwareMapping": "AppConfig hérite de BaseSettings avec validation stricte des types ; une clé secrète manquante ou un port invalide lève une exception ValidationError et stoppe le boot immédiatement.",
      "whyItBreaksWithoutIt": "L'application démarre sans clé API ou avec un chemin de base erroné, et ne plante que 3 heures plus tard au milieu d'une transaction client critique."
    },
    "situationDetails": {
      "operationalContext": "Déploiement automatisé sur plusieurs environnements (Développement, Recette, Staging, Production) avec des configurations distinctes.",
      "disasterScenario": "Le serveur démarre avec une configuration par défaut vulnérable et écrit les données de test dans la base de production sans avertissement.",
      "engineeringMitigation": "Validation déterministe au lancement avec affichage clair des variables manquantes et arrêt immédiat du processus (code de sortie 1)."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Lire les variables d'environnement avec os.getenv('KEY') au fil de l'eau avec des valeurs par défaut silencieuses.",
      "seniorResolution": "Centraliser toute la configuration dans une classe Pydantic typée et valider l'intégrité de l'environnement dès la première milliseconde."
    },
    "codeInvariants": [
      "Arrêt immédiat du processus au démarrage si une variable obligatoire est absente",
      "Validation typée de toutes les URLs, chemins et entiers de configuration",
      "Interdiction d'accéder directement à os.environ en dehors du module de configuration centralisé"
    ]
  },
  "16-2": {
    "codeExplanation": "Pilote asynchrone de synchronisation ordonnée garantissant l'insertion des chunks parents dans SQLite avant l'indexation des vecteurs enfants dans Qdrant.",
    "clearMetaphor": {
      "intuition": "La construction d'un pont suspendu : on ancre d'abord solidement les piliers massifs dans la roche avant de tendre les câbles de suspension légers qui s'y rattachent.",
      "softwareMapping": "Transaction SQL validée (commit) pour les enregistrements parents, suivie de l'insertion vectorielle des enfants avec vérification de l'existence de la clé étrangère parent_id.",
      "whyItBreaksWithoutIt": "Si les vecteurs enfants sont indexés en premier et que l'écriture SQL échoue, les enfants pointent vers un néant informationnel et provoquent des erreurs de référence introuvable."
    },
    "situationDetails": {
      "operationalContext": "Synchronisation de flux massifs de documents juridiques où la cohérence entre le magasin relationnel et la base vectorielle est vitale.",
      "disasterScenario": "Le LLM récupère un vecteur enfant pertinent dans Qdrant mais ne trouve pas le texte parent dans SQLite, générant une réponse tronquée ou un crash applicatif.",
      "engineeringMitigation": "Séquencement strict des opérations avec garantie transactionnelle : aucun vecteur n'est écrit sans son parent validé en base."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Lancer les écritures dans SQLite et Qdrant en parallèle sans coordination pour essayer de gagner quelques millisecondes.",
      "seniorResolution": "Ordonnancement transactionnel rigoureux (Parents d'abord, Enfants ensuite) avec mécanisme de rollback complet en cas d'échec."
    },
    "codeInvariants": [
      "Validation transactionnelle obligatoire des parents dans SQLite avant toute écriture vectorielle",
      "Vérification de l'intégrité référentielle entre l'identifiant parent de Qdrant et la clé primaire SQLite",
      "Nettoyage automatique des orphelins si une étape du pipeline de synchronisation échoue"
    ]
  },
  "17-1": {
    "codeExplanation": "Structure d'état immuable SanadAgentState définie par un TypedDict strict servant de tableau de bord partagé entre tous les nœuds de la machine d'états.",
    "clearMetaphor": {
      "intuition": "Le dossier médical à couverture cartonnée d'un patient d'hôpital : chaque médecin consulte les antécédents, y inscrit ses observations datées sans raturer les pages précédentes, et transmet le classeur au confrère suivant.",
      "softwareMapping": "TypedDict Python avec clés typées (messages, documents, rewritten_query, loop_count, is_hallucination) garantissant qu'aucun nœud ne reçoit un état corrompu.",
      "whyItBreaksWithoutIt": "Un nœud modifie sournoisement une variable globale ou passe un dictionnaire sans structure ; un nœud en aval plante avec un 'KeyError: query' incompréhensible."
    },
    "situationDetails": {
      "operationalContext": "Orchestration complexe d'agents avec plusieurs passages en boucle et étapes de décision nécessitant une transparence totale.",
      "disasterScenario": "Une variable d'état est écrasée par inadvertance au cours d'une boucle de réécriture, effaçant la question d'origine posée par l'utilisateur.",
      "engineeringMitigation": "Typage statique avec Mypy et structure immuable où chaque nœud renvoie uniquement un delta d'état contrôlé."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Passer un dictionnaire Python générique non typé (dict) où chaque fonction ajoute ses propres clés sans convention.",
      "seniorResolution": "Schéma d'état formel avec TypedDict explicite, typage statique strict et traçabilité claire de chaque champ modifié."
    },
    "codeInvariants": [
      "SanadAgentState hérite obligatoirement de TypedDict avec annotations de types complètes",
      "Les nœuds retournent uniquement un dictionnaire des clés qu'ils ont vocation à modifier",
      "Validation statique Mypy sans erreur sur l'ensemble des modules d'orchestration"
    ]
  },
  "17-2": {
    "codeExplanation": "Ensemble de 9 nœuds purs et déterministes sans variables globales, interrogeant un catalogue de prompts centralisé et versionné.",
    "clearMetaphor": {
      "intuition": "Une brigade de haute cuisine étoilée : le commis aux sauces ne touche pas aux poissons, l'écailler ne s'occupe que des huîtres, et chacun suit à la lettre la fiche recette affichée sans improviser.",
      "softwareMapping": "Chaque fonction de nœud (ex: grade_node, rewrite_node, generate_node) prend l'état en entrée, appelle un prompt pur, et renvoie un résultat déterministe testable isolément.",
      "whyItBreaksWithoutIt": "Des nœuds ayant des effets de bord cachés ou lisant des variables globales deviennent impossibles à tester unitairement et créent des comportements aléatoires en production."
    },
    "situationDetails": {
      "operationalContext": "Architecture de production nécessitant des tests de régression unitaires automatisés pour chaque maillon du raisonnement d'IA.",
      "disasterScenario": "Un changement dans le nœud de réécriture brise mystérieusement la vérification d'hallucinations à cause d'une variable globale partagée.",
      "engineeringMitigation": "Nœuds conçus comme des fonctions pures (Pure Functions) dépendant exclusivement de leurs arguments d'entrée sans état externe masqué."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Créer des classes tentaculaires avec des dizaines d'attributs self et des états mutables dans tous les sens.",
      "seniorResolution": "Fonctions de nœuds pures et autonomes, facilement testables avec des mocks et intégrables sans risque dans le graphe d'orchestration."
    },
    "codeInvariants": [
      "Zéro variable globale mutable au sein des modules de nœuds d'agents",
      "Chaque nœud dispose d'au moins un test unitaire dédié avec état d'entrée simulé",
      "Tous les prompts utilisés par les nœuds proviennent exclusivement du registre centralisé"
    ]
  },
  "18-1": {
    "codeExplanation": "Schéma relationnel en 3e forme normale (3NF) dans SQLite garantissant l'intégrité référentielle et la suppression en cascade entre documents, chunks et pistes d'audit.",
    "clearMetaphor": {
      "intuition": "Le cadastre national des propriétés foncières : chaque parcelle est rattachée à une commune et à un propriétaire unique ; si un découpage est modifié, toutes les références juridiques sont mises à jour sans doublon.",
      "softwareMapping": "Tables SQL reliées par clés étrangères explicites avec clause ON DELETE CASCADE : la suppression d'un document supprime automatiquement tous ses chunks et ses historiques orphelins.",
      "whyItBreaksWithoutIt": "La suppression d'un document laisse des centaines de chunks orphelins en base de données qui continuent d'apparaître dans les résultats de recherche."
    },
    "situationDetails": {
      "operationalContext": "Maintenance à long terme d'un corpus documentaire juridique avec opérations régulières d'ajout, de mise à jour et d'abrogation de textes.",
      "disasterScenario": "Des extraits de décrets abrogés réapparaissent dans les réponses du système parce que leurs chunks orphelins n'avaient pas été purgés lors du retrait du document parent.",
      "engineeringMitigation": "Contraintes relationnelles 3NF avec intégrité référentielle activée par PRAGMA foreign_keys = ON et cascades automatiques."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Créer une table fourre-tout avec des colonnes de texte contenant du JSON non normalisé sans contraintes de clés étrangères.",
      "seniorResolution": "Modélisation relationnelle rigoureuse en 3NF avec typage strict, contraintes d'unicité et suppressions en cascade pour une propreté absolue des données."
    },
    "codeInvariants": [
      "Toutes les relations entre tables sont régies par des clés étrangères avec ON DELETE CASCADE",
      "Absence totale de redondance d'information conformément aux règles strictes de la 3NF",
      "Index B-Tree sur toutes les colonnes de clés étrangères et de filtres fréquents (workspace_id, status)"
    ]
  },
  "18-2": {
    "codeExplanation": "Les 5 garde-fous de base de données (Connexion unique d'écriture, Pragmas WAL, Requêtes paramétrées, Transactions atomiques et Timeouts de busy) interdisant toute corruption de données.",
    "clearMetaphor": {
      "intuition": "Le système de sas et de sécurités d'un sous-marin nucléaire : cinq clapets anti-retour indépendants empêchent l'eau d'envahir la coque même en cas de rupture de pression extérieure.",
      "softwareMapping": "Le dépôt central db/repo.py applique systématiquement des context managers de transactions, des déclarations SQL paramétrées (? au lieu de f-strings) et un timeout de verrouillage à 5000ms.",
      "whyItBreaksWithoutIt": "Une injection SQL ou une écriture simultanée mal gérée corrompt le fichier sqlite3 et détruit l'intégralité des données du projet la veille de la soutenance."
    },
    "situationDetails": {
      "operationalContext": "Système de production critique manipulant des données juridiques sensibles sous des accès concurrents intenses.",
      "disasterScenario": "Le fichier de base de données se corrompt (database disk image is malformed) suite à des écritures non synchronisées en plein test de charge.",
      "engineeringMitigation": "Couche d'accès aux données centralisée appliquant mécaniquement les 5 garde-fous sans laisser la moindre liberté aux développeurs."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Ouvrir des connexions SQL sqlite3.connect() un peu partout dans le code et concaténer des variables directement dans les chaînes de requêtes.",
      "seniorResolution": "Passer exclusivement par un référentiel unique (Repository Pattern) encapsulant les transactions et garantissant le respect des 5 garde-fous de sécurité."
    },
    "codeInvariants": [
      "Interdiction formelle de toute interpolation de chaîne dans les requêtes SQL (injection d'arguments paramétrés uniquement)",
      "Gestion de toutes les opérations d'écriture dans des blocs transactionnels atomiques with db.transaction()",
      "Gestion du verrouillage concurrent avec PRAGMA busy_timeout = 5000 activé sur toutes les connexions"
    ]
  },
  "19-1": {
    "codeExplanation": "Rendu côté serveur (SSR) ultra-performant via les gabarits Jinja2 et Tailwind CSS avec empreinte cryptographique des fichiers statiques (Cache-Busting).",
    "clearMetaphor": {
      "intuition": "L'imprimerie du Journal Officiel qui livre les gazettes fraîches dès l'aube : les citoyens découvrent immédiatement les textes de lois imprimés sans attendre qu'un ouvrier vienne assembler les pages sous leurs yeux.",
      "softwareMapping": "FastAPI génère le HTML complet en quelques millisecondes côté serveur ; le navigateur affiche la page immédiatement sans temps de chargement de framework JavaScript lourd.",
      "whyItBreaksWithoutIt": "Une application monopage (SPA) JavaScript trop lourde met 5 secondes à charger sur les connexions lentes et affiche un écran blanc en cas d'erreur de script du client."
    },
    "situationDetails": {
      "operationalContext": "Magistrats et juristes accédant à la plateforme depuis des réseaux professionnels d'administrations publiques parfois restreints ou bridés.",
      "disasterScenario": "La page d'accueil ne s'affiche pas sur le navigateur d'un membre du jury car le pare-feu de son université bloque le téléchargement des gros bundles JavaScript.",
      "engineeringMitigation": "Rendu HTML pur généré côté serveur avec styles CSS intégrés et mise en cache performante via empreintes de hachage de fichiers."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Créer une SPA React lourde de 15 Mo avec des dizaines de dépendances pour un simple formulaire de recherche documentaire.",
      "seniorResolution": "Architecture sobre et rapide : rendu serveur Jinja2, styles utilitaires Tailwind CSS et interactivité légère pour une accessibilité maximale."
    },
    "codeInvariants": [
      "Temps de rendu du HTML initial inférieur à 50 millisecondes sur le serveur",
      "Empreinte de hachage SHA-256 apposée sur tous les fichiers statiques pour un cache-busting infaillible",
      "Fonctionnement complet des fonctions clés de consultation même sans exécution de scripts côté client"
    ]
  },
  "19-2": {
    "codeExplanation": "Garde-fou de staging et gestion de session en mémoire validant les autorisations d'accès avant d'autoriser la promotion du code vers l'environnement de production.",
    "clearMetaphor": {
      "intuition": "Le protocole de réception d'un chantier d'ingénierie : avant d'ouvrir un pont à la circulation publique, une flotte de camions chargés à bloc roule sur l'ouvrage sous le contrôle des experts pour vérifier la flèche sous charge.",
      "softwareMapping": "Module access_gate.py vérifiant la présence du mot de passe de pré-production ou de la session autorisée avant de donner accès à l'environnement de test de staging.",
      "whyItBreaksWithoutIt": "L'environnement de pré-production reste ouvert aux quatre vents sur Internet ; des moteurs d'indexation publics découvrent des fonctionnalités non stabilisées."
    },
    "situationDetails": {
      "operationalContext": "Phase de validation finale et tests utilisateurs préliminaires avec des partenaires juridiques pilotes.",
      "disasterScenario": "Des données de démonstration temporaires ou des prototypes d'analyses sont indexés publiquement par Google avant la validation officielle.",
      "engineeringMitigation": "Sas de protection de staging par mot de passe ou authentification restreinte isolant totalement la pré-production."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Laisser l'instance de pré-production accessible publiquement sur Internet sans aucune protection d'accès.",
      "seniorResolution": "Verrouillage hermétique de staging avec barrière d'accès contrôlée et gestion de sessions éphémères sécurisées."
    },
    "codeInvariants": [
      "Accès à l'environnement de staging conditionné à une authentification explicite de protection",
      "En-têtes HTTP 'X-Robots-Tag: noindex, nofollow' systématiquement injectés sur toutes les réponses de pré-production",
      "Isolement absolu entre les clés d'API et les bases de données de staging et de production"
    ]
  },
  "20-1": {
    "codeExplanation": "Exécuteur en ligne de commande (CLI) de la suite d'évaluation automatisée calculant les métriques RAGAS, la latence et la conformité des citations juridiques.",
    "clearMetaphor": {
      "intuition": "Le banc d'essai d'homologation d'un moteur d'avion : un ordinateur de test injecte 1000 scénarios de vol extrêmes, mesure la température, la consommation et les vibrations, et délivre un rapport de certification indiscutable.",
      "softwareMapping": "Commande python -m tests.run_evaluation exécutant les requêtes de test en parallèle, agrégeant les résultats et générant un rapport JSON complet avec horodatage et empreinte Git.",
      "whyItBreaksWithoutIt": "L'équipe passe des heures à tester manuellement les questions avant chaque réunion sans pouvoir fournir de chiffres de performance précis ni de graphiques fiables."
    },
    "situationDetails": {
      "operationalContext": "Préparation des pièces justificatives et des annexes chiffrées pour le mémoire de soutenance de diplôme d'ingénieur.",
      "disasterScenario": "Le jury demande des preuves tangibles de la fidélité du système et les étudiants sont incapables de produire des métriques objectives issues d'un outil automatisé.",
      "engineeringMitigation": "Outil CLI clé en main permettant de lancer une campagne d'évaluation complète en une seule ligne de commande avec génération automatique de rapports."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Présenter des captures d'écran de conversations sélectionnées où le modèle répond bien en guise de démonstration d'efficacité.",
      "seniorResolution": "Présenter un rapport d'audit rigoureux issu d'un banc d'évaluation scientifique automatisé testant 60 cas d'or documentés."
    },
    "codeInvariants": [
      "Génération d'un fichier de synthèse de rapport d'évaluation JSON après chaque exécution",
      "Calcul précis des temps de latence au 95e centile (p95) et de la consommation de jetons",
      "Association systématique du rapport d'évaluation au hash du commit Git testé"
    ]
  },
  "20-2": {
    "codeExplanation": "Pyramide de tests complète et videur de déploiement (Release Gate Bouncer) certifiant que le système est fin prêt pour la soutenance finale face au jury.",
    "clearMetaphor": {
      "intuition": "La commission de sécurité incendie avant l'inauguration d'un grand palais des congrès : un groupe d'experts indépendants vérifie les alarmes, les extincteurs, les portes coupe-feu et les issues de secours. Si un seul voyant clignote, l'autorisation d'ouverture est refusée.",
      "softwareMapping": "Script tests/release_gate.py orchestrant la pyramide complète : Tests unitaires -> Tests d'intégration des ports -> Benchmark RAGAS -> Contrôle des failles Bandit -> Bilan de soutenance.",
      "whyItBreaksWithoutIt": "Le jour de la soutenance, le système flanche sur une question simple du président du jury parce qu'un test d'intégration de base n'avait pas été vérifié après la dernière retouche."
    },
    "situationDetails": {
      "operationalContext": "L'épreuve décisive de la soutenance académique d'ingénierie où chaque affirmation technique doit être démontrable en temps réel.",
      "disasterScenario": "L'examinateur tente une question piège sur un décret spécifique et le système se bloque à cause d'une exception non interceptée dans un adaptateur.",
      "engineeringMitigation": "Validation préalable absolue par le Release Gate Bouncer : la certification de soutenance n'est attribuée que lorsque tous les tests de la pyramide sont passés au vert."
    },
    "tradeOffInsight": {
      "juniorShortcut": "Considérer que les tests ne sont qu'une formalité scolaire et arrêter d'en écrire dès que les premières démos fonctionnent.",
      "seniorResolution": "Faire de la pyramide de tests le bouclier suprême de son travail d'ingénieur : c'est la preuve irréfutable de la solidité et de la maturité industrielle du système."
    },
    "codeInvariants": [
      "Code de retour 0 obligatoire sur l'intégralité de la pyramide de tests avant validation de soutenance",
      "Couverture de code supérieure ou égale à 80% sur les modules du cœur de domaine de Sanad",
      "Génération du certificat d'aptitude à la soutenance validant l'exhaustivité des 20 spécifications techniques"
    ]
  }
};
