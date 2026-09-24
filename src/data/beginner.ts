// Couche « débutant » de chaque leçon : l'idée en mots simples, les mots techniques
// expliqués avec un exemple, puis l'image complète racontée pas à pas.
// Les faits viennent des leçons (src/data/lessons.ts) ; ici on les reformule seulement.
export interface Word {
  term: string;
  meaning: string;
  example: string;
}

export interface Beginner {
  plain: string;
  words: Word[];
  story: string[];
}

export const beginner: Record<number, Beginner> = {
  1: {
    plain: 'Sanad est un assistant qui répond à des questions en lisant vos documents à vous, pas en inventant. S’il trouve le bon passage, il répond et montre d’où vient la réponse. S’il ne trouve rien, il le dit honnêtement.',
    words: [
      { term: 'Modèle de langage (LLM)', meaning: 'Un programme qui a lu énormément de textes et qui sait écrire des phrases qui « sonnent juste ». Il devine la suite la plus probable d’un texte ; il ne vérifie pas si c’est vrai.', example: 'ChatGPT ou Gemini sont des modèles de langage. Ils peuvent écrire une règle de loi très convaincante… et fausse.' },
      { term: 'RAG', meaning: '« Génération augmentée par recherche ». En clair : d’abord chercher les bons passages dans les documents, ensuite seulement écrire la réponse à partir d’eux.', example: 'Comme un étudiant qui ouvre son cours et cherche la page avant de répondre, au lieu de répondre de mémoire.' },
      { term: 'Espace (de travail)', meaning: 'Un dossier de documents gardé à part des autres. Sanad ne cherche que dans l’espace choisi.', example: 'Un espace « RH » avec le Code du travail, un espace « Technique » avec des manuels de machines.' },
      { term: 'Synchroniser (Sync)', meaning: 'Le bouton qui fait lire les nouveaux fichiers à Sanad et les prépare pour la recherche.', example: 'Vous ajoutez un PDF dans l’espace, vous cliquez sur Synchroniser : Sanad le lit et le range.' },
      { term: 'Index', meaning: 'Un catalogue qui permet de retrouver vite un passage, sans relire tous les documents à chaque question.', example: 'L’index à la fin d’un livre : « congés… page 142 ».' },
      { term: 'Source (carte source)', meaning: 'L’encadré affiché sous la réponse qui dit de quel fichier et de quel passage elle vient.', example: '« Code du travail, article 184 » sous une réponse sur la durée du travail.' },
      { term: 'Refus', meaning: 'Quand Sanad dit « mes documents ne couvrent pas cette question » au lieu d’inventer.', example: 'Vous demandez la météo dans un espace qui ne contient que des lois : Sanad refuse.' },
    ],
    story: [
      'Une responsable RH met le Code du travail dans un espace « RH » et clique sur Synchroniser. Sanad lit le fichier, le découpe en morceaux et range ces morceaux dans son index.',
      'Elle demande : « Quelle est la durée de travail par semaine ? ». Sanad cherche dans l’index les petits morceaux qui parlent de ça, puis lit les sections complètes d’où ils viennent.',
      'Si ces sections contiennent la réponse, le modèle écrit une réponse à partir d’elles, et Sanad affiche la source pour qu’elle puisse vérifier.',
      'Si rien ne répond, Sanad cherche autrement, puis refuse : « les documents ne couvrent pas cette question ». Il n’invente pas.',
      'Attention : la source montre où vérifier. Elle ne garantit pas que chaque phrase de la réponse est parfaitement fidèle au texte.',
    ],
  },
  3: {
    plain: 'Une réponse bien écrite n’est pas forcément vraie. Pour une décision sérieuse (RH, droit), il faut pouvoir montrer le texte d’où vient la réponse. Sanad existe pour ça : répondre avec la source, ou dire qu’il ne sait pas.',
    words: [
      { term: 'Réponse plausible', meaning: 'Une réponse qui a l’air correcte, bien formulée, crédible. Mais « avoir l’air vrai » ne veut pas dire « être vrai ».', example: '« La période d’essai est de 6 mois renouvelable » : ça sonne juste, mais sans l’article de loi, on ne sait pas.' },
      { term: 'Prédire le texte', meaning: 'Ce que fait un modèle de langage : il choisit, mot après mot, le mot le plus probable. Il n’ouvre pas vos fichiers et ne vérifie rien.', example: 'Comme la saisie automatique du téléphone, en beaucoup plus puissant.' },
      { term: 'Entraînement', meaning: 'La phase où le modèle a lu des milliards de textes. Il en garde des « souvenirs statistiques », pas des copies exactes ni à jour.', example: 'Il a peut-être lu une loi il y a deux ans ; si elle a changé depuis, il ne le sait pas.' },
      { term: 'Preuve / référence', meaning: 'Le passage exact d’un document qui permet de vérifier une affirmation.', example: 'L’article 14 du Code du travail, qu’on peut ouvrir et lire.' },
    ],
    story: [
      'Une responsable RH demande à un chatbot : « Peut-on renouveler une période d’essai ? ».',
      'Le chatbot répond avec assurance, sans citer aucun texte. La réponse est peut-être juste, peut-être fausse : impossible de le savoir.',
      'Avec Sanad, la même question déclenche une recherche dans le Code du travail. La réponse arrive avec l’article, qu’on peut ouvrir et relire.',
      'Si la loi ne parle pas de ce cas, Sanad le dit au lieu d’inventer. C’est tout le problème que le projet veut résoudre.',
    ],
  },
  4: {
    plain: 'Dire « notre assistant est fiable » ne prouve rien. L’équipe a donc fixé trois tests chiffrés, G1, G2 et G3. Si un seul échoue, la nouvelle version n’est pas publiée.',
    words: [
      { term: 'G1 : réponses appuyées', meaning: 'Sur 40 questions dont la réponse EST dans les documents, au moins 36 réponses doivent être entièrement appuyées par le texte cité.', example: '37/40 : réussi. 35/40 : échoué.' },
      { term: 'G2 : refus corrects', meaning: 'Sur 20 questions dont la réponse N’EST PAS dans les documents, Sanad doit refuser les 20.', example: 'Demander le prix du train à un espace RH : il faut refuser. 20/20 exigé.' },
      { term: 'G3 : présence de sources', meaning: 'Chaque réponse donnée doit afficher au moins une source.', example: 'Si une seule réponse n’a pas de source, G3 échoue.' },
      { term: 'Question couverte / hors documents', meaning: 'Couverte : la réponse est dans les fichiers. Hors documents : elle n’y est pas.', example: '« Durée du travail ? » est couverte par le Code du travail. « Prix du train ? » est hors documents.' },
      { term: 'Seuil', meaning: 'Le score minimum à atteindre pour réussir un test.', example: 'Le seuil de G1 est 36 sur 40.' },
      { term: 'Porte de publication', meaning: 'Un script (petit programme) qui lit les résultats et bloque la version si un test échoue.', example: 'Comme un contrôle technique de voiture : un seul point rouge, et la voiture ne sort pas.' },
    ],
    story: [
      'L’équipe prépare une nouvelle version de Sanad et la fait passer sur les 60 questions de test.',
      'Résultat : G1 = 35/40, G2 = 20/20, G3 = 100 %.',
      'G2 et G3 sont parfaits, mais G1 est sous 36. Le script de la porte refuse donc la version.',
      'Pourquoi ne pas faire une moyenne ? Parce que les trois tests mesurent des choses différentes. Afficher des sources (G3) ne prouve pas que les réponses sont fidèles (G1).',
    ],
  },
  5: {
    plain: 'Le RAG, c’est « chercher, puis écrire ». Ça aide beaucoup, mais ça ne rend pas le système parfait : la recherche peut ramener le mauvais passage, et le modèle peut mal le lire. Sanad ajoute donc une vérification entre les deux.',
    words: [
      { term: 'État de l’art', meaning: 'Ce qui existe déjà dans le domaine : les méthodes et les outils connus avant votre projet.', example: 'Présenter le RAG et des outils concurrents avant d’expliquer Sanad.' },
      { term: 'Recherche par mots (BM25)', meaning: 'Trouve les passages qui contiennent les mêmes mots que la question. Très bonne pour les mots exacts.', example: 'Chercher « Article 14 » trouve le passage qui contient exactement « Article 14 ».' },
      { term: 'Recherche par sens', meaning: 'Trouve les passages qui veulent dire la même chose, même avec d’autres mots. Chaque texte est transformé en une liste de nombres qui représente son sens (on appelle cette liste un « vecteur » ou « embedding »).', example: '« délai de préavis » peut retrouver « notification de rupture ».' },
      { term: 'Fusion', meaning: 'Sanad combine les deux classements (mots et sens) pour garder les meilleurs passages.', example: 'Comme demander conseil à deux amis et garder les restaurants que les deux recommandent.' },
      { term: 'Étape de vérification', meaning: 'Avant d’écrire, Sanad vérifie si les passages trouvés répondent vraiment à la question.', example: 'Le passage parle de congés, mais pas du congé demandé : la vérification dit non.' },
    ],
    story: [
      'On demande : « Combien de jours de congé de maternité ? ».',
      'La recherche ramène un passage sur les congés… mais sur les congés payés, pas la maternité. Même sujet, mauvaise réponse.',
      'Sans vérification, le modèle pourrait écrire une réponse à partir de ce mauvais passage. Elle aurait une source, et serait pourtant fausse.',
      'Avec la vérification, Sanad voit que le passage ne répond pas. Il cherche autrement, puis refuse s’il ne trouve toujours rien.',
    ],
  },
  6: {
    plain: 'Le projet a été fait à deux, YL et MB, par petites tâches. Il y avait un plan (qui devait faire quoi) et un journal (qui a vraiment fait quoi). Au jury, il faut dire la vérité du journal, même quand elle diffère du plan.',
    words: [
      { term: 'Tâche (ST-xx)', meaning: 'Un petit morceau de travail avec un numéro, par exemple ST-19. Chaque tâche a un objectif clair et des critères pour dire si elle est finie.', example: 'ST-35 : figer le jeu de questions de test.' },
      { term: 'Branche', meaning: 'Une copie de travail du code où l’on fait une modification sans toucher la version principale.', example: 'Comme écrire un brouillon à part avant de recopier au propre.' },
      { term: 'Fusion (merge)', meaning: 'Le moment où la modification d’une branche est ajoutée à la version principale du code.', example: 'Le brouillon validé est recopié dans le cahier officiel.' },
      { term: 'Revue', meaning: 'Une autre personne relit la modification avant la fusion, pour trouver les erreurs.', example: 'MB relit le code de YL avant qu’il soit ajouté.' },
      { term: 'Plan (BUILD-PLAN.md)', meaning: 'Le document qui dit qui DEVAIT faire chaque tâche.', example: 'Le plan attribue le moteur à YL.' },
      { term: 'Journal (BUILD-STATE.md, CHANGELOG.md)', meaning: 'Les documents qui notent ce qui s’est VRAIMENT passé : qui a fait quoi, les exceptions, les corrections.', example: 'Le journal note que MB a réalisé une tâche prévue pour YL.' },
    ],
    story: [
      'Au début, le plan partage le travail : surtout le moteur et les écrans pour YL ; le corpus, les questions de test, les contrôles qualité et une partie du mémoire pour MB.',
      'En cours de route, certaines tâches changent de mains. Le journal le note.',
      'Au jury, dire « YL a fait tout le code » serait faux. La phrase juste : « le plan prévoyait YL, le journal montre que MB l’a réalisé ».',
      'Même prudence pour « chaque modification a été relue » : le journal montre quelques exceptions.',
    ],
  },
  7: {
    plain: 'Chaque personne connectée a ses propres espaces de documents. Elle peut voir et modifier les siens, mais pas ceux des autres. Le serveur le vérifie à chaque demande, même si quelqu’un connaît le numéro de l’espace d’un autre.',
    words: [
      { term: 'Keycloak', meaning: 'Un logiciel qui gère les comptes et la connexion (identifiant + mot de passe). Sanad lui demande « qui est cette personne ? ».', example: 'Comme l’accueil d’un immeuble qui vérifie votre badge.' },
      { term: 'Propriétaire', meaning: 'La personne qui a créé l’espace. Elle seule peut le modifier.', example: 'Salma crée l’espace « RH » : elle en est propriétaire.' },
      { term: 'Identifiant (id)', meaning: 'Le numéro unique de quelque chose : un espace, un fichier, une personne.', example: 'L’espace de Salma a peut-être l’identifiant 42.' },
      { term: 'Route', meaning: 'Une « porte » du serveur qui répond à une demande précise, par exemple « renommer l’espace 42 ».', example: 'Chaque bouton de l’écran appelle une route du serveur.' },
      { term: 'Rôle', meaning: 'Une catégorie de droits (par exemple « gestionnaire »). Sanad n’utilise plus de rôles : il vérifie le propriétaire.', example: 'Il n’y a pas de « chef » qui peut tout modifier.' },
      { term: 'Collection (d’index)', meaning: 'Chaque espace a son propre index de recherche, séparé des autres.', example: 'Une question posée dans l’espace RH ne peut pas ramener un passage de l’espace Technique.' },
    ],
    story: [
      'Salma se connecte (Keycloak vérifie son compte) et crée l’espace « RH ». Elle y dépose un PDF.',
      'Yassine se connecte à son tour. Il voit ses propres espaces, et les anciens espaces partagés, en lecture seulement.',
      'Yassine découvre le numéro de l’espace de Salma et envoie directement une demande « renommer l’espace 42 ».',
      'Le serveur vérifie : « Yassine est-il le propriétaire de l’espace 42 ? ». Non : la demande est refusée, et l’espace n’est même pas montré.',
      'Les « deux rôles » de la présentation sont en fait deux usages (préparer les documents, poser des questions), pas deux permissions.',
    ],
  },
};
