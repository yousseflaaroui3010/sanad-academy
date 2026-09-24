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
  8: {
    plain: 'Sanad est une application web écrite en Python. Elle range différentes choses à différents endroits, parce que chaque « armoire » est bonne pour un travail précis : une pour savoir à qui appartient quoi, une pour chercher par le sens, une pour garder les textes complets, une pour les images.',
    words: [
      { term: 'Python', meaning: 'Le langage de programmation dans lequel Sanad est écrit.', example: 'Comme le français est la langue d’un livre, Python est la langue du code de Sanad.' },
      { term: 'FastAPI', meaning: 'La boîte à outils Python qui reçoit les demandes du navigateur et renvoie les pages et les réponses.', example: 'Vous cliquez sur « Envoyer » : FastAPI reçoit la question et appelle le bon morceau de code.' },
      { term: 'Serveur / navigateur', meaning: 'Le navigateur (Chrome, Firefox) affiche les pages. Le serveur est l’ordinateur qui fait le travail et garde les données.', example: 'Le navigateur parle au serveur de Sanad ; il ne parle jamais directement au modèle de langage.' },
      { term: 'SQLite', meaning: 'Une base de données classique, faite de tableaux reliés entre eux. Elle garde les espaces, les fichiers, les conversations et les rapports.', example: 'Un tableau « espaces » avec une colonne « propriétaire ».' },
      { term: 'Qdrant', meaning: 'Une base spéciale pour chercher par le sens. Elle garde les petits passages sous forme de listes de nombres (vecteurs).', example: 'Elle trouve que « renvoi » ressemble à « licenciement ».' },
      { term: 'Section parente (JSON)', meaning: 'Le texte complet d’une section de document, gardé dans un fichier. JSON est simplement un format de fichier texte bien rangé.', example: 'L’article 14 en entier, chargé quand un petit passage de cet article est trouvé.' },
      { term: 'Mode cloud / mode local', meaning: 'Cloud : le modèle de langage tourne chez Google (Gemini), sur Internet. Local : il tourne sur votre machine (Ollama).', example: 'En mode cloud, la question et des extraits partent chez Google.' },
    ],
    story: [
      'Vous posez une question dans le navigateur. Elle arrive au serveur de Sanad (FastAPI).',
      'SQLite vérifie à qui appartient l’espace et quels fichiers il contient.',
      'Qdrant cherche les petits passages les plus proches de la question, par le sens et par les mots.',
      'Chaque petit passage garde le numéro de sa section complète (parent_id). Sanad charge cette section depuis ses fichiers JSON.',
      'Le modèle de langage rédige à partir de ces sections. En mode cloud, cet appel part chez Google avec la question et les extraits. En mode local (Ollama), rien ne sort.',
    ],
  },
  9: {
    plain: 'Quand vous synchronisez, Sanad transforme chaque fichier en deux choses : de grandes sections pour la lecture, et de petits passages pour la recherche. On cherche petit (c’est précis), puis on lit grand (on a tout le contexte).',
    words: [
      { term: 'Empreinte (SHA-256)', meaning: 'Un code calculé à partir du contenu d’un fichier. Si le fichier change d’une seule lettre, le code change.', example: 'Comme une empreinte digitale : Sanad la compare pour savoir si le fichier a été modifié.' },
      { term: 'Enfant (child)', meaning: 'Un petit passage d’au plus 500 caractères, utilisé pour la recherche.', example: 'Deux ou trois phrases de l’article 14.' },
      { term: 'Chevauchement', meaning: 'Les petits passages se recouvrent un peu (100 caractères par défaut), pour ne pas couper une idée pile au milieu.', example: 'La fin d’un passage est répétée au début du suivant.' },
      { term: 'Parent', meaning: 'La section plus complète d’où vient un petit passage. C’est elle que le modèle lit.', example: 'L’article 14 en entier.' },
      { term: 'E5 (vecteur, 768 nombres)', meaning: 'Le modèle qui transforme un passage en une liste de 768 nombres représentant son sens. Deux textes au sens proche ont des listes proches.', example: '« renvoi » et « licenciement » donnent des listes proches.' },
      { term: 'BM25', meaning: 'Une recherche par mots exacts, qui donne plus de poids aux mots rares.', example: '« Article 14 » est mieux trouvé par BM25 que par le sens.' },
      { term: 'OCR', meaning: 'La reconnaissance de texte dans une image. Nécessaire pour un PDF scanné (une photo de page).', example: 'Un contrat scanné : sans OCR, Sanad n’y voit aucun texte.' },
    ],
    story: [
      'Vous ajoutez « code_travail.pdf » et cliquez sur Synchroniser. Sanad calcule son empreinte : c’est un fichier nouveau.',
      'Il extrait le texte et le découpe en sections (parents), puis chaque section en petits passages de 500 caractères au plus (enfants).',
      'Chaque enfant est transformé en 768 nombres par E5 et rangé dans Qdrant, avec le numéro de son parent.',
      'Plus tard, vous modifiez le fichier. L’empreinte change : Sanad supprime les anciens passages de ce fichier, puis refait tout le travail.',
      'À la question « renvoi d’un salarié », la recherche trouve un enfant qui parle de licenciement, et Sanad donne au modèle la section complète derrière lui.',
    ],
  },
  10: {
    plain: 'Quand vous posez une question, Sanad suit un petit parcours d’étapes, comme un organigramme. Il cherche, vérifie ce qu’il a trouvé, et s’il n’a rien d’utile, il reformule la recherche au plus deux fois. Ensuite, soit il répond avec des sources, soit il refuse.',
    words: [
      { term: 'Agent', meaning: 'Le morceau de Sanad qui enchaîne les étapes pour répondre : résumer, chercher, vérifier, rédiger ou refuser.', example: 'Comme un documentaliste qui suit une procédure.' },
      { term: 'Graphe (LangGraph)', meaning: 'Le plan des étapes et des flèches entre elles. LangGraph est la bibliothèque qui fait tourner ce plan.', example: 'Un organigramme : « si le passage répond, va à Rédiger ; sinon, va à Reformuler ».' },
      { term: 'Nœud', meaning: 'Une étape du graphe.', example: 'Chercher, Vérifier, Charger les sections, Rédiger.' },
      { term: 'État', meaning: 'Le carnet de notes de l’agent pendant la question : la question, les recherches faites, les passages trouvés, la trace.', example: 'Il sait qu’il a déjà essayé deux formulations.' },
      { term: 'Reformuler (retry_ceiling = 2)', meaning: 'Chercher avec d’autres mots. La limite par défaut est de 2 reformulations après la première recherche.', example: '« congé maternité » devient « congé de naissance ».' },
      { term: 'Trace', meaning: 'La liste de ce que l’agent a fait, en particulier les recherches tentées. Elle est montrée avec un refus.', example: '« J’ai cherché : congé maternité ; congé de naissance ; durée du congé… »' },
    ],
    story: [
      'Vous demandez : « Et pour les cadres ? ». Seule, la question ne veut rien dire ; l’agent résume la conversation pour comprendre le sujet.',
      'Il cherche des passages et les donne au nœud de vérification : « ces passages répondent-ils vraiment ? ».',
      'Le passage parle des cadres mais pas de la durée demandée : la vérification dit non. L’agent reformule et cherche à nouveau.',
      'Si une recherche trouve le bon passage, il charge la section complète et rédige une réponse avec sa source.',
      'Si après 2 reformulations rien ne répond, il refuse et montre les recherches tentées. Pas de seuil de « 0,70 » : c’est la vérification qui décide.',
    ],
  },
  11: {
    plain: 'Sanad sait aussi extraire les figures (schémas, photos) des PDF. Un modèle peut décrire une image pour aider à la retrouver, mais cette description n’est jamais utilisée comme preuve : seul le texte écrit dans le document compte pour la réponse.',
    words: [
      { term: 'Figure', meaning: 'Une image dans un document : schéma, graphique, photo.', example: 'Le schéma d’une pompe dans un manuel technique.' },
      { term: 'Légende', meaning: 'Le petit texte sous une figure qui dit ce qu’elle montre. Il vient du document.', example: '« Figure 3 : courbe de pompe ».' },
      { term: 'Description générée', meaning: 'Un texte écrit par un modèle qui regarde l’image. Il aide à la retrouver, mais il peut inventer.', example: 'Le modèle écrit « pression 12 bars » alors que le document ne le dit pas.' },
      { term: 'text / search_text', meaning: 'Deux textes rangés pour chaque figure. text : seulement les mots du document. search_text : les mots du document plus la description générée, pour la recherche.', example: 'La recherche peut utiliser la description ; la réponse, jamais.' },
      { term: 'Docling / PyMuPDF', meaning: 'Deux outils qui lisent les PDF. Docling analyse la mise en page ; PyMuPDF découpe les zones et récupère les images.', example: 'Sur une page de neuf photos, PyMuPDF prend directement leurs cadres.' },
      { term: 'origin/main (#157)', meaning: 'origin/main est la version principale du code sur GitHub. #157 est le numéro de la modification qui a ajouté les figures.', example: 'La fonction figures existe dans la version principale depuis #157.' },
    ],
    story: [
      'Un manuel contient le schéma d’une pompe avec la légende « courbe de pompe ».',
      'À la synchronisation, Sanad extrait l’image et la rattache à la section de texte voisine, grâce à la légende et aux mots autour.',
      'Un modèle décrit l’image : « courbe de pompe, pression 12 bars ». Cette description sert seulement à retrouver la figure.',
      'Vous demandez la pression. Le vérificateur et le rédacteur ne reçoivent que le texte du document, qui ne dit pas « 12 bars ». Sanad ne peut donc pas l’affirmer.',
      'La figure s’affiche sous la source, pour que vous puissiez la regarder vous-même.',
    ],
  },
  12: {
    plain: 'Sanad a trois écrans : les espaces (préparer les fichiers), le chat (poser des questions) et les rapports (voir les résultats des tests). Le chat distingue toujours trois cas : une réponse, un refus ou une question de clarification. Et une panne n’est jamais présentée comme un refus.',
    words: [
      { term: 'Answer.kind', meaning: 'Le « type » de ce que Sanad renvoie : réponse, refus ou clarification. Le code l’impose.', example: 'kind = "answer" → texte + sources ; kind = "refusal" → recherches tentées.' },
      { term: 'Clarification', meaning: 'Quand la question est trop floue, Sanad demande une précision au lieu de deviner.', example: '« Vous parlez des congés payés ou des congés maladie ? »' },
      { term: 'Jinja2 (pages)', meaning: 'L’outil qui fabrique les pages HTML envoyées au navigateur.', example: 'La page du chat, avec les cartes sources.' },
      { term: 'API /api/v1', meaning: 'Une porte d’entrée pour d’autres programmes (pas pour les humains). Elle renvoie des données, pas des pages.', example: 'Un autre logiciel pourrait poser une question à Sanad sans passer par l’écran.' },
      { term: 'Contrat OpenAPI', meaning: 'Le document qui décrit exactement ce que l’API reçoit et renvoie. Des tests vérifient qu’il correspond au code.', example: 'docs/phase2/openapi.yaml.' },
      { term: 'Erreur technique', meaning: 'Quelque chose a planté (réseau, modèle injoignable). Ça n’a rien à voir avec le contenu des documents.', example: '« Le modèle n’a pas pu être joint, réessayez. »' },
    ],
    story: [
      'Dans l’écran Espaces, vous déposez vos fichiers et synchronisez.',
      'Dans le Chat, une question couverte affiche la réponse, ses cartes sources et éventuellement une figure sous la source.',
      'Une question hors documents affiche un refus avec les recherches tentées.',
      'Si le réseau tombe pendant l’appel au modèle, l’écran affiche une erreur, jamais un faux refus : on n’a rien vérifié dans les documents.',
      'L’écran Rapports montre les résultats de l’évaluation (les tests G1, G2, G3).',
    ],
  },
  13: {
    plain: 'Une démo montre quelques gestes précis devant le jury ; elle ne prouve pas que tout marche toujours. Il faut préparer chaque geste, savoir ce qu’il prouve, et avoir un plan de secours si le réseau tombe.',
    words: [
      { term: 'Démonstration', meaning: 'Des cas choisis à l’avance, montrés en direct.', example: 'Une question couverte, puis une question hors documents.' },
      { term: 'Évaluation', meaning: 'Un test large et fixé à l’avance (60 questions), qui mesure la qualité en général.', example: 'Le rapport 39/40 et 20/20.' },
      { term: 'Question couverte / hors documents', meaning: 'Couverte : la réponse est dans l’espace. Hors documents : elle n’y est pas, Sanad doit refuser.', example: 'Durée du travail (couverte) ; prix d’un billet de train (hors documents).' },
      { term: 'Appel cloud', meaning: 'Un appel au modèle de langage sur Internet (Gemini). Sans réseau, il échoue.', example: 'Si le Wi-Fi tombe, aucune nouvelle réponse ne peut être générée en mode cloud.' },
      { term: 'Vidéo de secours', meaning: 'Un enregistrement de la démo, prêt à être montré si le direct échoue.', example: 'rapport/demo_sanad.mp4.' },
    ],
    story: [
      'Avant la soutenance : un espace déjà synchronisé, une question couverte, une question hors documents, et les liens vers les sources, tous testés.',
      'Geste 1 : vous demandez une durée de travail présente dans le Code. Sanad répond. Vous ouvrez la source pour montrer l’article.',
      'Geste 2 : vous demandez le prix d’un billet de train. Sanad refuse au lieu de chercher sur Internet.',
      'Si le réseau tombe : vous montrez ce qui est déjà enregistré (espaces, rapports, vidéo de secours) en disant clairement que ce n’est pas un nouvel appel en direct.',
      'Ne promettez les figures en direct que si la version déployée et le corpus synchronisé les gèrent vraiment.',
    ],
  },
};
