// Model answers for the lesson exercises. Server-only: this file is never bundled
// into the page, so learners cannot read the answers in the browser.
// Keyed by slide number. `prompt` must match the exercise text shown on the page
// (FirstLesson.tsx for slide 1, `gate` in src/data/lessons.ts for the others).
// Facts come only from the lesson content, which was checked against the project code.

export const EXERCISES = {
  1: {
    prompt: 'Votre espace ne contient qu’un manuel du personnel. Vous demandez le prix du train demain. Que doit faire Sanad, et pourquoi ? Qu’est-ce qu’une carte source prouverait, et qu’est-ce qu’elle ne prouverait pas ?',
    modelAnswer: 'Sanad doit refuser : dire que les documents de l’espace ne couvrent pas la question. Il ne répond qu’à partir des passages retrouvés dans l’espace actif ; il ne cherche pas sur Internet et le modèle ne doit pas répondre avec ses souvenirs. Il peut d’abord reformuler et chercher autrement, puis refuser en montrant les recherches tentées. De plus, une réponse finale exige au moins une source : sans passage utile, pas de réponse. Une carte source prouverait où vérifier : quel fichier et quel passage ont servi. Elle ne prouverait pas que chaque phrase de la réponse est fidèle à ce passage : le modèle peut mal lire ou ajouter une affirmation.',
    keyPoints: [
      'Sanad refuse (les documents de l’espace ne couvrent pas la question), il n’invente pas de prix',
      'Raison : il répond seulement à partir des passages retrouvés dans l’espace actif, pas d’Internet ni des souvenirs du modèle',
      'Une carte source montre où vérifier (quel fichier, quel passage)',
      'Une carte source ne prouve pas que chaque phrase est fidèle au document',
    ],
    hints: [
      'Où Sanad a-t-il le droit de chercher une réponse ? Le prix du train y figure-t-il ?',
      'Règle : Sanad retrouve des passages dans l’espace actif avant de rédiger, et une réponse finale exige une source. Qu’arrive-t-il quand aucun passage ne répond ?',
      'Exemple d’une autre situation : un bibliothécaire n’a que des livres de cuisine et on lui demande la météo. Il dit « ce n’est pas dans mes livres ». Et s’il montre une page de recette, cela prouve-t-il que tout ce qu’il a dit est dans la recette ?',
    ],
    misconceptions: [
      'Croire que Sanad cherche sur Internet ou utilise les connaissances générales du modèle',
      'Croire qu’une source affichée prouve que la réponse est juste',
    ],
  },
  3: {
    prompt: 'Un assistant donne une règle de congé convaincante sans indiquer de fichier. Quelle vérification manque avant de s’en servir ?',
    modelAnswer: 'Il manque la source : savoir de quel document et de quel passage vient la règle, puis ouvrir ce passage pour vérifier que la règle y est vraiment écrite. Une phrase bien écrite n’est pas une preuve. Un modèle de langage prédit un texte plausible ; il ne consulte pas automatiquement votre dossier, et ses souvenirs statistiques ne sont ni un texte à jour ni une citation. Pour une décision RH, il faut pouvoir retrouver l’article, sinon on ne s’en sert pas.',
    keyPoints: [
      'Il manque la source : de quel document et de quel passage vient la règle',
      'Il faut ouvrir ce passage et vérifier que la règle y est bien écrite',
      'Raison : un texte plausible ou convaincant n’est pas une preuve ; le modèle peut se tromper avec assurance',
    ],
    hints: [
      'Qu’est-ce qui vous permettrait de retrouver le texte d’où vient cette règle ?',
      'Règle : une phrase bien écrite ne constitue pas une preuve. Que faut-il avoir sous les yeux pour contrôler une affirmation ?',
      'Exemple d’une autre situation : un collègue affirme « la réunion est lundi » avec beaucoup d’assurance. Que demandez-vous avant de bloquer votre agenda ?',
    ],
    misconceptions: [
      'Croire qu’un modèle entraîné sur des lois en connaît la version exacte',
      'Croire que le ton assuré d’une réponse est un signe de justesse',
    ],
  },
  4: {
    prompt: 'Une version obtient G1 = 35/40, G2 = 20/20 et G3 = 100 %. La publieriez-vous selon les règles du projet ? Pourquoi ?',
    modelAnswer: 'Non. G1 exige au moins 36 réponses entièrement appuyées sur 40 ; 35 est sous le seuil, donc G1 échoue. Les trois portes doivent passer ensemble : un bon G2 (refus corrects) et un bon G3 (présence de sources) ne compensent pas un G1 raté, car ils mesurent autre chose. G3 = 100 % dit que chaque réponse a une source, pas que chaque réponse est fidèle à sa source. Le script de porte (release_gate.py) bloque donc la version.',
    keyPoints: [
      'Non, on ne publie pas',
      'G1 = 35/40 est sous le seuil de 36/40, donc G1 échoue',
      'Les trois portes doivent passer ; G2 et G3 ne compensent pas G1',
      'G3 mesure la présence de sources, pas la fidélité des réponses',
    ],
    hints: [
      'Quel est le seuil exact de G1, et 35 l’atteint-il ?',
      'Règle : G1, G2 et G3 mesurent trois choses différentes et chacune doit passer. Une bonne note sur l’une peut-elle racheter l’autre ?',
      'Exemple d’une autre situation : pour obtenir le permis, il faut réussir le code ET la conduite. Un 40/40 au code sauve-t-il une conduite ratée ?',
    ],
    misconceptions: [
      'Faire une moyenne des trois portes',
      'Croire que 100 % de sources signifie 100 % de réponses justes',
    ],
  },
  5: {
    prompt: 'Une recherche trouve un passage parlant de congés, mais pas du congé demandé. Pourquoi RAG peut-il encore produire une mauvaise réponse ?',
    modelAnswer: 'Parce que RAG ne garantit pas que le bon extrait soit trouvé ni bien compris. Ici la recherche a remonté un passage proche par le sujet (les congés) mais qui ne répond pas à la question précise. Si ce passage est donné au rédacteur, le modèle peut s’en servir comme s’il répondait, ou ajouter une affirmation absente du texte. Deux erreurs restent donc possibles : la recherche choisit mal, ou le modèle lit mal. C’est pour cela que Sanad place une étape de vérification avant la rédaction : elle doit juger que ce passage ne répond pas, puis reformuler la recherche ou refuser.',
    keyPoints: [
      'RAG ne garantit pas que le bon passage soit trouvé : un passage proche par le sujet n’est pas forcément la réponse',
      'Le modèle peut rédiger à partir d’un mauvais passage ou ajouter une affirmation absente du texte',
      'Sanad ajoute une vérification avant la rédaction pour détecter ce cas (puis reformuler ou refuser)',
    ],
    hints: [
      'Le passage trouvé parle bien de congés. Répond-il pour autant à la question posée ?',
      'Règle : chercher avant de rédiger ne garantit ni que le bon extrait est trouvé, ni qu’il est bien compris. Lequel des deux échoue ici ?',
      'Exemple d’une autre situation : vous cherchez l’horaire du train de 8 h et on vous tend l’horaire du bus. Le document parle de transport ; que risquez-vous en le lisant comme si c’était le bon ?',
    ],
    misconceptions: [
      'Croire que RAG empêche le modèle de se tromper',
      'Confondre « même sujet » et « répond à la question »',
    ],
  },
  6: {
    prompt: 'Le plan nomme YL pour une tâche, mais le journal indique MB comme auteur. Que dire au jury pour rester exact ?',
    modelAnswer: 'Dire les deux faits en les distinguant : le plan (BUILD-PLAN.md) attribuait la tâche à YL comme propriétaire prévu, mais le journal (BUILD-STATE.md, CHANGELOG.md) montre que MB l’a réellement écrite. Le propriétaire prévu et l’auteur réel ne sont pas la même chose, et les journaux consignent ces changements de mains. On cite le journal comme preuve de qui a fait le travail, sans réciter une répartition simplifiée du type « YL a fait tout le code ».',
    keyPoints: [
      'Distinguer le propriétaire prévu dans le plan de l’auteur réel',
      'Dire que MB a réellement écrit la modification, selon le journal',
      'S’appuyer sur le journal (BUILD-STATE / CHANGELOG) comme preuve, sans simplifier',
    ],
    hints: [
      'Le plan et le journal décrivent-ils la même chose : ce qui était prévu, ou ce qui s’est passé ?',
      'Règle : le plan donne des propriétaires prévus ; le journal consigne les fusions et les exceptions. Lequel dit qui a écrit le code ?',
      'Exemple d’une autre situation : le planning dit que Karim devait faire l’exposé, mais c’est Lina qui l’a présenté. Que dites-vous si on vous demande qui l’a fait ?',
    ],
    misconceptions: [
      'Réciter la répartition du plan comme si elle était la réalité',
      'Croire que MB n’a fait que la présentation',
    ],
  },
  7: {
    prompt: 'Une nouvelle personne connectée veut renommer l’espace privé créé par une autre. Est-ce permis, même si elle sait son identifiant ?',
    modelAnswer: 'Non. Avec Keycloak, chaque personne connectée crée et gère ses propres espaces ; elle voit les siens et les anciens espaces partagés, mais ne modifie pas ceux d’autrui. Connaître l’identifiant ne donne aucun droit : le serveur vérifie le propriétaire (workspace.owner_user_id) à chaque route, pas seulement l’écran. Il n’existe plus de rôle « gestionnaire » qui donnerait ce pouvoir : ce sont deux usages, pas deux rôles. L’espace privé d’autrui n’est même pas montré : le serveur répond comme s’il n’existait pas (404).',
    keyPoints: [
      'Non, ce n’est pas permis',
      'Seul le propriétaire modifie son espace ; les autres ne modifient pas les espaces d’autrui',
      'Connaître l’identifiant ne suffit pas : le serveur vérifie le propriétaire à chaque route',
      'Il n’y a plus de rôle gestionnaire qui donnerait ce droit',
    ],
    hints: [
      'Qui est le propriétaire de cet espace, et qui vérifie ce propriétaire quand la demande arrive ?',
      'Règle : chaque personne gère ses propres espaces, et le serveur contrôle le propriétaire sur chaque route. L’identifiant change-t-il qui est propriétaire ?',
      'Exemple d’une autre situation : vous connaissez le numéro de la chambre 214 d’un hôtel. Cela vous permet-il d’y entrer sans la carte de cette chambre ?',
    ],
    misconceptions: [
      'Croire que connaître l’identifiant donne l’accès',
      'Croire qu’il existe deux rôles Keycloak (gestionnaire / utilisateur)',
    ],
  },
  8: {
    prompt: 'Pourquoi une table SQLite seule n’est-elle pas l’endroit choisi pour classer les passages par sens dans Sanad ?',
    modelAnswer: 'Parce que ce n’est pas le même travail. SQLite est une base relationnelle : elle relie des objets par des identifiants et des contraintes (qui possède quel espace, quels fichiers, conversations, rapports). Classer des passages par sens demande autre chose : transformer chaque passage en vecteur (E5, 768 nombres) et trouver les vecteurs les plus proches de la question, ce que fait un index vectoriel comme Qdrant, qui fusionne aussi cette recherche de sens avec la recherche de mots exacts (BM25). Sanad sépare donc les rôles : SQLite pour « à qui appartient quoi », Qdrant pour « quel passage ressemble à ma question », les sections complètes dans des JSON.',
    keyPoints: [
      'SQLite sert aux relations, identifiants, contraintes et propriété (catalogue)',
      'Classer par sens demande des vecteurs (E5) et une recherche de voisins proches',
      'Qdrant, index vectoriel, fait ce classement (et la fusion avec BM25)',
    ],
    hints: [
      'Que faut-il calculer pour savoir que « renvoi » ressemble à « licenciement » ? Est-ce une relation entre identifiants ?',
      'Règle : une base relationnelle relie des objets par identifiants et contraintes ; un index vectoriel classe des textes proches par sens. Quel travail demande « classer par sens » ?',
      'Exemple d’une autre situation : un registre d’état civil sait qui est parent de qui, mais pour trouver les photos qui se ressemblent, utiliseriez-vous le registre ?',
    ],
    misconceptions: [
      'Croire qu’une base de données peut tout faire aussi bien',
      'Croire que Qdrant remplace SQLite',
    ],
  },
  9: {
    prompt: 'Un fichier est modifié après le premier Sync. Pourquoi supprimer ses anciens passages avant d’en indexer de nouveaux ?',
    modelAnswer: 'Sinon les anciens passages resteraient dans l’index à côté des nouveaux. La recherche pourrait alors retrouver un texte qui n’existe plus dans le fichier et Sanad répondrait avec une version périmée, avec en plus des doublons. L’empreinte SHA-256 détecte que le fichier a changé ; sync.py::_ingest commence alors par supprimer les anciennes données de ce fichier (passages, sections, figures) avant de convertir, découper, calculer les vecteurs et réindexer. Ainsi l’index reflète toujours le contenu actuel du fichier.',
    keyPoints: [
      'Sans suppression, les anciens passages resteraient dans l’index',
      'Risque : retrouver et citer un texte périmé qui n’est plus dans le fichier (et des doublons)',
      'L’empreinte SHA-256 détecte le changement, puis la synchronisation supprime avant de réindexer',
    ],
    hints: [
      'Si on ajoute les nouveaux passages sans rien enlever, que contient l’index pour ce fichier ?',
      'Règle : l’index doit refléter le contenu actuel du fichier. Que se passe-t-il si la recherche tombe sur un passage de l’ancienne version ?',
      'Exemple d’une autre situation : vous mettez à jour un menu de restaurant en ajoutant les nouvelles pages sans retirer les anciennes. Quel prix le client risque-t-il de lire ?',
    ],
    misconceptions: [
      'Croire que réindexer écrase automatiquement l’ancien contenu',
    ],
  },
  10: {
    prompt: 'Les deux recherches autorisées après la première ne trouvent toujours rien d’utile. Quelle fin du graphe faut-il choisir, et que doit montrer le refus ?',
    modelAnswer: 'La fin « refus ». La limite de reprises (retry_ceiling, 2 par défaut) est atteinte : l’agent a reformulé deux fois après la première recherche et la vérification a toujours dit que les passages ne répondent pas. Il ne doit donc pas rédiger de réponse, car une réponse finale exige au moins une source. Le refus doit dire que les documents de l’espace ne couvrent pas la question et montrer la trace : les recherches tentées. Ce refus reste différent d’une erreur technique.',
    keyPoints: [
      'Choisir la fin refus (pas de réponse rédigée)',
      'Raison : la limite de reprises (2) est atteinte et la vérification n’a rien trouvé d’utile ; une réponse exige une source',
      'Le refus montre les recherches tentées (la trace) et dit que les documents ne couvrent pas la question',
    ],
    hints: [
      'Combien de reformulations l’agent a-t-il le droit de faire, et sont-elles épuisées ?',
      'Règle : si les passages ne répondent pas, l’agent reformule au plus 2 fois, puis refuse ; une réponse finale a au moins une source. Que reste-t-il comme fin possible, et qu’est-ce qui prouve qu’il a cherché ?',
      'Exemple d’une autre situation : un enquêteur a droit à trois perquisitions. Les trois sont vides. Que met-il dans son rapport pour montrer qu’il a vraiment cherché ?',
    ],
    misconceptions: [
      'Croire qu’un seuil de similarité à 0,70 déclenche le refus',
      'Croire que l’agent continue à chercher indéfiniment',
    ],
  },
  11: {
    prompt: 'Une description générée dit « pression 12 bars », mais la légende du document ne dit que « courbe de pompe ». Sanad peut-il affirmer 12 bars ? Quel texte atteint le rédacteur ?',
    modelAnswer: 'Non. La description générée par un modèle sert seulement à retrouver et afficher la figure (search_text) ; elle peut inventer et ne sert pas de preuve. Seul le texte venant du document (text : la légende « courbe de pompe » et les mots de la section rattachée) atteint le vérificateur et le rédacteur. Comme ce texte ne dit pas 12 bars, Sanad ne peut pas l’affirmer : il répond sans cette valeur si la section le permet, sinon il refuse.',
    keyPoints: [
      'Non, Sanad ne peut pas affirmer 12 bars',
      'La description générée sert seulement à retrouver/afficher la figure, pas de preuve',
      'Seul le texte du document (légende, section rattachée) atteint le vérificateur et le rédacteur',
    ],
    hints: [
      'D’où vient « 12 bars » : du document, ou d’un modèle qui a regardé l’image ?',
      'Règle : la description générée aide à trouver la figure, mais seul le texte venant du document est montré au vérificateur et au rédacteur. Lequel des deux textes contient 12 bars ?',
      'Exemple d’une autre situation : un stagiaire décrit une photo en disant « il y a 50 personnes », mais la légende officielle dit seulement « la foule ». Un journaliste peut-il écrire « 50 personnes » en citant la légende ?',
    ],
    misconceptions: [
      'Croire que le modèle peut répondre à partir de ce qu’il croit voir dans l’image',
    ],
  },
  12: {
    prompt: 'Une personne reçoit un refus alors que le modèle n’a pas répondu à cause du réseau. Quel état de l’écran serait honnête ?',
    modelAnswer: 'Un état d’erreur technique, pas un refus : par exemple « le modèle n’a pas pu être joint, réessayez ». Un refus affirme que les documents ne couvrent pas la question, ce qui n’a pas été vérifié ici : ce serait faux. Sanad distingue réponse, refus et clarification (Answer.kind) ; une panne réseau reste une erreur, jamais un faux refus.',
    keyPoints: [
      'Afficher une erreur technique (réseau / modèle injoignable, réessayer)',
      'Pas un refus : un refus dit que les documents ne couvrent pas la question, ce qui n’a pas été vérifié',
      'Réponse, refus et clarification sont des états distincts (Answer.kind) ; une panne n’en fait pas partie',
    ],
    hints: [
      'Que dit un refus sur les documents ? Est-ce qu’on a vérifié cela ici ?',
      'Règle : une réponse, un refus et une clarification ne sont pas la même chose, et une panne réseau reste une erreur. Quel message décrit ce qui s’est vraiment passé ?',
      'Exemple d’une autre situation : le téléphone du médecin ne sonne pas parce que la ligne est coupée. Peut-on noter « le patient n’a pas de problème » ?',
    ],
    misconceptions: [
      'Croire qu’un refus est un bon message par défaut quand quelque chose échoue',
    ],
  },
  13: {
    prompt: 'Le réseau tombe pendant la démo. Quelle partie pouvez-vous encore montrer sans prétendre avoir vérifié un nouvel appel au modèle ?',
    modelAnswer: 'Ce qui est déjà enregistré : les espaces et fichiers déjà synchronisés, les sources et documents déjà consultables, les conversations et rapports d’évaluation déjà produits (le jeu de 60 questions), et la vidéo de secours (rapport/demo_sanad.mp4). Il faut dire clairement qu’il s’agit de résultats enregistrés, pas d’un nouvel appel au modèle en direct : en mode cloud, la question-réponse dépend du réseau.',
    keyPoints: [
      'Montrer ce qui est déjà enregistré : espaces synchronisés, sources, conversations ou rapports existants',
      'Utiliser la vidéo de secours de la démo',
      'Dire explicitement que ce sont des résultats enregistrés, pas un nouvel appel au modèle',
    ],
    hints: [
      'Qu’est-ce qui, dans la démo, a besoin du réseau à ce moment précis, et qu’est-ce qui existe déjà ?',
      'Règle : on ne prétend pas avoir vérifié ce qu’on n’a pas exécuté. Quels éléments sont déjà produits et peuvent être montrés tels quels, avec leur date ?',
      'Exemple d’une autre situation : pendant un match, la retransmission coupe. Le commentateur peut montrer les buts déjà enregistrés, mais peut-il annoncer le score actuel ?',
    ],
    misconceptions: [
      'Croire qu’une démo réussie prouve la fiabilité générale',
      'Rejouer une réponse enregistrée comme si elle était en direct',
    ],
  },
  14: {
    prompt: 'On découvre qu’une question « sans réponse » a une réponse dans l’article 240. Faut-il forcer Sanad à refuser ou corriger le jeu ? Comment ?',
    modelAnswer: 'Corriger le jeu, pas forcer Sanad à refuser. La question est mal classée : elle est couverte par l’article 240. On crée une nouvelle version du jeu gelé où elle passe en catégorie « couverte », avec l’article 240 comme référence, et on consigne la raison de la correction. On ne modifie pas le jeu en silence pour améliorer le score, et on rejoue ensuite l’évaluation complète avec cette nouvelle version. Forcer un refus reviendrait à dégrader le produit pour coller à une erreur du jeu.',
    keyPoints: [
      'Corriger le jeu de questions, ne pas forcer le produit à refuser',
      'La question change de catégorie (couverte) avec l’article 240 comme référence',
      'Dans une nouvelle version du jeu, correction documentée, jamais silencieuse',
      'Rejouer l’évaluation après la correction',
    ],
    hints: [
      'Qui a tort ici : Sanad qui trouve l’article 240, ou l’étiquette « sans réponse » de la question ?',
      'Règle : le jeu gelé garde ses versions ; une correction justifiée n’est pas une modification silencieuse. Comment corriger l’étiquette tout en restant traçable ?',
      'Exemple d’une autre situation : un corrigé d’examen contient une erreur. Faut-il pénaliser les élèves qui ont bien répondu, ou publier un corrigé rectifié en l’annonçant ?',
    ],
    misconceptions: [
      'Croire que le jeu gelé ne peut jamais être corrigé',
      'Modifier le jeu sans trace pour améliorer le score',
    ],
  },
  15: {
    prompt: 'Expliquez au jury pourquoi passer de 38/40 à 39/40 est une bonne observation, mais une preuve limitée.',
    modelAnswer: 'C’est une bonne observation : la version fait mieux sur ce jeu et reste au-dessus du seuil G1 de 36/40. Mais la preuve est limitée : l’écart ne tient qu’à une seule question (2,5 points) ; les variations du modèle peuvent déplacer une question d’une version à l’autre ; c’est le même jeu de 40 questions rejoué, pas de nouvelles questions indépendantes ; et le juge est lui-même un modèle qui peut se tromper. Un seul écart ne prouve donc pas à lui seul une progression générale.',
    keyPoints: [
      'Bonne observation : meilleur résultat sur ce jeu, au-dessus du seuil de 36/40',
      'Une seule question d’écart (2,5 points) peut venir de la variation du modèle',
      'Même jeu de 40 questions rejoué, pas de nouvelles preuves indépendantes',
      'Le juge est un modèle qui peut se tromper',
    ],
    hints: [
      'Combien de questions séparent 38 et 39, et que peut-il arriver à une seule question d’une version à l’autre ?',
      'Règle : une seule question vaut 2,5 points, et un seul écart entre versions ne prouve pas une progression générale. Qu’est-ce qui manque pour conclure ?',
      'Exemple d’une autre situation : un tireur passe de 38 à 39 cibles touchées sur la même série de 40. Est-il devenu meilleur, ou a-t-il eu une cible de chance ?',
    ],
    misconceptions: [
      'Croire que cinq rapports sur le même jeu font 200 questions indépendantes',
    ],
  },
  16: {
    prompt: 'Un essai sur 200 pages prend 731,6 s sur une machine chargée. La cible est 600 s. Comment présentez-vous le résultat sans cacher l’échec ?',
    modelAnswer: 'En donnant les trois mesures avec leur contexte. Au repos, deux essais tiennent la cible : 449,4 s et 375,3 s, sous 600 s. Sous charge, l’essai prend 731,6 s et dépasse la cible : c’est un échec qu’on annonce. Chaque temps est lié à sa version, à sa machine, à la charge et à la taille du corpus (200 pages). Conclusion honnête : l’objectif est tenu sur machine au repos, pas sous charge. On ne fait pas de moyenne pour cacher l’essai raté.',
    keyPoints: [
      'Dire clairement que l’essai sous charge (731,6 s) dépasse la cible de 600 s',
      'Donner aussi les essais au repos (449,4 s et 375,3 s) qui tiennent la cible',
      'Préciser le contexte de chaque mesure (machine, charge, version, corpus)',
      'Conclure : objectif tenu au repos, pas sous charge',
    ],
    hints: [
      'Dans quelles conditions l’essai de 731,6 s a-t-il été fait, et est-ce la seule mesure disponible ?',
      'Règle : un temps a toujours son contexte (version, machine, charge, corpus). Comment formuler une conclusion qui dépend de ce contexte ?',
      'Exemple d’une autre situation : un coureur fait 10 km en 45 min sur piste et en 55 min en montée, avec un objectif de 50 min. Comment le dire honnêtement ?',
    ],
    misconceptions: [
      'Faire une moyenne pour masquer l’échec',
      'Présenter un temps sans ses conditions de mesure',
    ],
  },
  17: {
    prompt: 'Pourquoi ne pas remplacer immédiatement le passage court par la section entière dans le vérificateur, juste avant la soutenance ?',
    modelAnswer: 'Parce que ce changement non mesuré peut casser autre chose. Donner la section entière au vérificateur pourrait réparer g-in-033, mais aussi changer les refus corrects : le système pourrait se mettre à répondre à tort à des questions hors documents, et faire perdre le 20/20 de G2, ou déplacer d’autres lignes de G1. Il faudrait refaire l’évaluation complète des 60 questions, et cela coûte aussi plus de tokens. Juste avant la soutenance, mieux vaut présenter g-in-033 comme une limite connue, avec l’amélioration proposée et la façon de la tester.',
    keyPoints: [
      'Le changement peut réparer g-in-033 mais dégrader les refus corrects (G2) ou d’autres réponses',
      'Il faudrait refaire l’évaluation complète des 60 questions avant de conclure',
      'Coût en tokens plus élevé',
      'Avant la soutenance, présenter la limite et le test prévu plutôt qu’un changement non mesuré',
    ],
    hints: [
      'Si le vérificateur lit plus de texte, qu’est-ce qui pourrait changer pour les 20 questions hors documents ?',
      'Règle : améliorer un objectif peut en abîmer un autre, et tout changement doit être remesuré sur les 60 questions. Avez-vous le temps et la preuve avant la soutenance ?',
      'Exemple d’une autre situation : la veille d’un vol, un mécanicien veut changer une pièce pour régler un petit bruit. Pourquoi ne le fait-on pas sans refaire les essais ?',
    ],
    misconceptions: [
      'Croire qu’un correctif évident n’a pas d’effets de bord',
    ],
  },
  18: {
    prompt: 'Proposez une mesure qui permettrait de dire si la qualité des réponses en arabe s’améliore réellement.',
    modelAnswer: 'Préparer d’abord un jeu figé de questions de référence en arabe, sur des documents arabes, avec des questions couvertes (et leur passage de référence) et des questions hors documents. Mesurer la version actuelle sur ce jeu pour avoir un point de départ, faire le changement, puis rejouer exactement le même jeu. Comparer les réponses fondées (comme G1) ET les refus corrects (comme G2), ainsi que la présence de sources. Fixer le critère de réussite à l’avance et, comme le juge automatique peut être biaisé, faire vérifier un échantillon par un lecteur arabophone.',
    keyPoints: [
      'Un jeu figé de questions de référence en arabe, préparé avant le changement',
      'Des questions couvertes et hors documents',
      'Mesurer avant et après sur le même jeu',
      'Suivre à la fois les réponses fondées et les refus corrects, avec un critère fixé à l’avance',
    ],
    hints: [
      'Sans questions de référence en arabe, avec quoi compareriez-vous « avant » et « après » ?',
      'Règle : préparer des questions de référence avant de promettre une qualité, et mesurer G1 ET G2. Qu’est-ce qu’il faut construire, et quand ?',
      'Exemple d’une autre situation : pour savoir si un nouveau régime fait maigrir, on se pèse avant et après, sur la même balance. Quelle est la « balance » pour l’arabe ?',
    ],
    misconceptions: [
      'Juger l’amélioration sur quelques essais choisis',
      'Ne mesurer que les réponses, pas les refus',
    ],
  },
  19: {
    prompt: 'Sans notes, racontez Sanad en 60 secondes : besoin, chemin technique, chiffre vérifié et une limite honnête.',
    modelAnswer: 'Besoin : les documents comme le Code du travail sont longs, et une réponse plausible n’est pas une preuve ; il faut répondre avec le passage source, ou dire que les documents ne couvrent pas la question. Chemin : un PDF est synchronisé ; Sanad en extrait le texte, le découpe en sections (parents) et en courts passages (enfants), qu’il indexe par sens (E5) et par mots (BM25) dans Qdrant. Pour une question, un agent LangGraph cherche, vérifie les passages, reformule au plus deux fois, lit les sections complètes, puis répond avec des sources ou refuse. Chiffre vérifié : sur notre jeu français de la version 3.1.0, 39 réponses fondées sur 40, 20 refus corrects sur 20, et des sources sur les 39 réponses données. Limite : une question couverte (g-in-033) est encore refusée, car le passage court lu par le vérificateur s’arrête avant le délai d’un mois ; et le jeu est petit, surtout en français, noté par un juge automatique.',
    keyPoints: [
      'Besoin : réponse avec source ou refus, car une réponse plausible n’est pas une preuve',
      'Chemin : synchronisation, parents/enfants, recherche sens + mots (Qdrant), agent qui vérifie puis répond ou refuse',
      'Chiffre exact : 39/40 réponses fondées, 20/20 refus (version 3.1.0, jeu français)',
      'Une limite honnête (ex. g-in-033 refusée à tort, petit jeu en français, juge automatique)',
    ],
    hints: [
      'Votre récit a-t-il les quatre parties demandées : besoin, chemin, chiffre, limite ? Laquelle manque ou reste floue ?',
      'Règle : suivez le trajet complet PDF → Sync → enfants/parents → recherche → agent → réponse ou refus → évaluation, puis nommez une limite sans attendre qu’on vous la demande.',
      'Exemple d’une autre situation : présenter une application de navigation en 60 s : le besoin (se perdre), le chemin (GPS → carte → calcul d’itinéraire), un chiffre (précision mesurée), une limite (tunnels). Faites pareil pour Sanad.',
    ],
    misconceptions: [
      'Présenter 39/40 comme une garantie universelle',
      'Oublier de nommer une limite',
    ],
  },
  20: {
    prompt: 'Une personne connaît l’identifiant d’un espace privé d’autrui. Où doit se faire le contrôle d’accès : dans l’écran, dans le serveur, ou les deux ? Pourquoi ?',
    modelAnswer: 'Obligatoirement dans le serveur ; l’écran peut aussi cacher les boutons, mais seulement pour le confort. Une URL ou une requête peut contenir un identifiant choisi par un attaquant, et un appel direct à la route contourne l’interface. Le serveur doit donc vérifier l’identité et le propriétaire de l’espace à chaque route, même si l’écran n’affiche jamais cet identifiant. Pour un espace privé d’autrui, il répond 404, ce qui évite même de confirmer que l’espace existe.',
    keyPoints: [
      'Le contrôle obligatoire se fait dans le serveur (l’écran seul ne suffit pas)',
      'Un appel direct à la route avec l’identifiant contourne l’écran',
      'Le serveur vérifie identité et propriétaire à chaque route',
    ],
    hints: [
      'Si quelqu’un envoie la requête sans passer par l’écran, qui peut encore l’arrêter ?',
      'Règle : un identifiant dans une requête peut être choisi par un attaquant, donc le contrôle doit être refait pour chaque route. Où ce contrôle ne peut-il pas être contourné ?',
      'Exemple d’une autre situation : un magasin enlève la pancarte « réserve », mais laisse la porte ouverte. Qu’est-ce qui protège vraiment la réserve ?',
    ],
    misconceptions: [
      'Croire que cacher un bouton suffit à interdire l’action',
    ],
  },
  21: {
    prompt: 'Pourquoi le rédacteur ne peut-il pas simplement réparer cette question si le vérificateur a déjà choisi le chemin du refus ?',
    modelAnswer: 'Parce que dans le graphe, la vérification (grade) vient avant le chargement des sections (fetch_parents) et avant le rédacteur. Le vérificateur juge le court passage (l’enfant de 500 caractères) qui s’arrête avant le délai d’un mois. S’il le juge hors sujet et que les reprises sont épuisées, le graphe part vers le refus : la section complète n’est jamais chargée et le rédacteur n’est jamais appelé. L’information existe dans l’article 66, mais elle n’atteint jamais l’étape qui pourrait l’utiliser.',
    keyPoints: [
      'Le vérificateur agit avant le chargement des parents et avant le rédacteur',
      'Il ne voit que le passage court, coupé avant le délai',
      'Une fois le refus choisi, la section complète n’est pas chargée et le rédacteur n’est jamais appelé',
    ],
    hints: [
      'Dans quel ordre passent le vérificateur, le chargement des sections et le rédacteur ?',
      'Règle : grade est placé avant fetch_parents dans le graphe. Si grade choisit le refus, quelles étapes restent sur le chemin ?',
      'Exemple d’une autre situation : à l’entrée d’un concours, un vigile refuse un candidat à cause d’une photo floue. Le jury, dans la salle, peut-il juger ce candidat ?',
    ],
    misconceptions: [
      'Croire que le rédacteur voit tout ce que la recherche a trouvé',
      'Croire que l’article 66 ne contient pas la réponse',
    ],
  },
  22: {
    prompt: 'Quel fichier regarder d’abord pour connaître la forme d’une réponse HTTP, et lequel pour comprendre l’ordre réel des étapes de l’agent ?',
    modelAnswer: 'Pour la forme d’une réponse HTTP : le contrat OpenAPI, docs/phase2/openapi.yaml (puis api/routes.py, qui délègue au service). Pour l’ordre réel des étapes de l’agent : agent/graph.py, qui définit les étapes et leurs liens ; agent/nodes.py donne ensuite le contenu de chaque étape.',
    keyPoints: [
      'Forme de la réponse HTTP : docs/phase2/openapi.yaml (le contrat)',
      'Ordre réel des étapes : agent/graph.py',
    ],
    hints: [
      'Quel document décrit le contrat de l’API pour un programme, et lequel relie les étapes de l’agent entre elles ?',
      'Règle : le contrat décrit la forme ; le graphe décrit l’ordre. Où est écrit le contrat, et où sont définis les liens entre étapes ?',
      'Exemple d’une autre situation : pour savoir ce que contient une commande livrée, vous regardez le bon de commande ; pour savoir dans quel ordre l’usine l’a fabriquée, vous regardez le plan de production. Quels sont ces deux documents dans Sanad ?',
    ],
    misconceptions: [
      'Croire que FastAPI contient toute la logique de recherche',
    ],
  },
  23: {
    prompt: 'Si l’on supprime un espace, que doit-il arriver à ses passages indexés, à ses conversations et à ses PDF d’origine ?',
    modelAnswer: 'Les données dérivées de l’espace partent avec lui : ses passages indexés (sa collection dans Qdrant et les sections), ses fiches de fichiers et bilans de synchronisation, et ses conversations, par les clés étrangères avec cascade sur workspace_id. En revanche, les PDF d’origine ne doivent pas être supprimés : ce sont les fichiers sources de l’utilisateur, pas des données dérivées, et une cascade ne doit jamais les toucher.',
    keyPoints: [
      'Les passages indexés de l’espace sont supprimés',
      'Les conversations et données liées à l’espace partent aussi (cascade)',
      'Les PDF d’origine sont conservés : la cascade ne touche pas les fichiers sources',
    ],
    hints: [
      'Parmi ces trois choses, lesquelles Sanad a-t-il fabriquées, et laquelle appartient à l’utilisateur au départ ?',
      'Règle : une cascade fait partir les données dérivées quand un espace est supprimé, mais les fichiers sources ne doivent pas être supprimés par cette cascade.',
      'Exemple d’une autre situation : vous jetez les fiches de révision d’un cours. Faut-il aussi jeter le manuel à partir duquel vous les avez faites ?',
    ],
    misconceptions: [
      'Croire que tout est supprimé, y compris les fichiers d’origine',
      'Croire que les passages restent dans Qdrant après suppression',
    ],
  },
  24: {
    prompt: 'Suivez un parent_id depuis le petit passage trouvé jusqu’à l’objet Answer. À quel moment la section complète est-elle lue ?',
    modelAnswer: 'La recherche trouve un Child (petit passage de 500 caractères au plus) qui porte un parent_id, et le renvoie sous forme de SearchHit. Le vérificateur juge ce passage court. S’il est jugé utile, l’étape de chargement des parents (fetch_parents) utilise le parent_id pour lire la section complète depuis parent_store. Le rédacteur écrit alors à partir de ces sections, et l’on construit Answer(kind="answer", sources=...), qui exige au moins une source. La section complète est donc lue après la vérification et avant la rédaction.',
    keyPoints: [
      'Child (avec parent_id) → SearchHit renvoyé par la recherche',
      'Le vérificateur juge d’abord le passage court',
      'La section complète est lue après la vérification, au chargement des parents (via parent_id), avant la rédaction',
      'Answer est construit avec ses sources à la fin',
    ],
    hints: [
      'Le vérificateur lit-il le passage court ou la section entière ?',
      'Règle : on cherche petit, on lit grand ; le parent_id relie le passage à sa section, chargée par fetch_parents. Où se place fetch_parents par rapport à la vérification et à la rédaction ?',
      'Exemple d’une autre situation : dans une bibliothèque, vous trouvez une fiche du catalogue, vous vérifiez qu’elle parle du bon sujet, puis vous allez chercher le livre en rayon avec sa cote. À quel moment lisez-vous le livre ?',
    ],
    misconceptions: [
      'Croire que la section complète est lue dès la recherche',
      'Croire qu’une source dans Answer garantit la vérité de chaque phrase',
    ],
  },
};
