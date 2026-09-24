// Pont entre la présentation, le rapport et le code, vérifié le 24 septembre 2026 sur la
// branche principale du projet. Pour le code : le nom de la fonction, puis comment elle
// marche en mots simples, plutôt qu'un chemin de fichier.
export interface Evidence {
  slide: string;
  report: string;
  diagram?: string;
  code: { fn: string; how: string }[];
  nuance?: string;
}

export const evidence: Record<number, Evidence> = {
  1: { slide: 'Diapos 1–2 · Sanad et plan', report: 'Introduction générale ; chapitre 1, §1.3', code: [
    { fn: 'Answer.__post_init__()', how: 'Vérifie chaque réponse au moment où elle est créée : si c’est une réponse et qu’elle n’a aucune source, le programme refuse de la fabriquer.' },
    { fn: 'build_graph()', how: 'Relie les étapes de l’agent comme un organigramme, avec trois fins possibles : répondre, refuser ou demander une précision.' },
  ] },
  3: { slide: 'Diapo 3 · Le problème', report: 'Introduction ; chapitre 2, §2.1–2.2', code: [
    { fn: 'build_write_answer()', how: 'Donne au modèle la question et les sections trouvées, chacune précédée de son fichier et de son titre. S’il répond NOT_COVERED, Sanad refuse au lieu d’inventer.' },
  ] },
  4: { slide: 'Diapo 4 · Nos objectifs', report: 'Chapitre 1, §1.3 ; chapitre 6, §6.2–6.3', code: [
    { fn: 'evaluate_report()', how: 'Relit le rapport des 60 questions et calcule les trois seuils séparément : G1 au moins 90 %, G2 tous les refus, G3 toutes les sources.' },
    { fn: 'main() du script de porte', how: 'Lance evaluate_report() sur le dernier rapport et renvoie « échec » si un seul seuil manque : la version ne sort pas.' },
  ] },
  5: { slide: 'Diapo 5 · État de l’art', report: 'Chapitre 2, §2.2–2.3', diagram: 'Figure 2.1 · deux temps du RAG', code: [
    { fn: 'search()', how: 'Cherche la question de deux façons, par le sens et par les mots exacts, puis fusionne les deux classements (RRF) et garde les 5 meilleurs passages.' },
    { fn: 'build_write_answer()', how: 'Transmet au modèle les sections retrouvées, avec leur nom, pour qu’il réponde à partir d’elles seulement.' },
  ], nuance: 'Le tableau comparatif des concurrents décrit des produits ; ce n’est pas une mesure sur les mêmes questions.' },
  6: { slide: 'Diapo 6 · Conduite du projet', report: 'Chapitre 1, §1.5', diagram: 'Figure 1.1 · sprints', code: [
    { fn: 'Le plan et le journal du projet', how: 'Le plan dit qui devait faire chaque tâche ; le journal note qui l’a vraiment faite. Au jury, on cite le journal.' },
  ], nuance: 'La relecture « de chaque modification » a connu quelques exceptions notées dans le journal. Le rapport crédite Meriem du remplacement de Gradio par les pages serveur.' },
  7: { slide: 'Diapo 7 · Les besoins', report: 'Chapitre 3, §3.1–3.2', diagram: 'Figure 3.1 · cas d’utilisation', code: [
    { fn: 'create_workspace()', how: 'Enregistre le nouvel espace avec le numéro de son créateur (owner_user_id). Sans numéro, c’est un ancien espace partagé.' },
    { fn: 'may_see() et may_manage()', how: 'Voir un espace : il faut qu’il soit à moi ou partagé. Le modifier : il faut qu’il soit à moi. Il n’y a pas de rôle d’administrateur.' },
  ], nuance: 'Le rapport parlait de « deux rôles » : ce sont deux usages. La version actuelle n’a pas de rôles.' },
  8: { slide: 'Diapo 8 · Architecture', report: 'Chapitre 4, §4.1 et §4.8', diagram: 'Figure 4.1 · application, rangements, modèles', code: [
    { fn: 'create_app()', how: 'Démarre un seul programme qui sert à la fois les pages et l’API : il prépare la base, charge les modèles de recherche et installe les protections.' },
    { fn: 'collection_name(), get_parent(), save_figures()', how: 'Chacune gère un rangement différent : l’index de recherche de l’espace, le fichier de chaque section, les images des figures.' },
    { fn: '_vision_model()', how: 'Choisit le modèle qui décrit les images. En mode cloud, l’image part chez Gemini ; en local, seulement si un modèle d’images est configuré.' },
  ], nuance: '« Les documents ne sortent pas » vaut pour les fichiers d’origine. En mode cloud, la question, des passages et parfois une image traversent le réseau.' },
  9: { slide: 'Diapo 9 · Documents vers index', report: 'Chapitre 4, §4.2', diagram: 'Figure 4.2 · les deux chemins d’un document', code: [
    { fn: '_ingest()', how: 'Traite un fichier dans cet ordre : effacer l’ancien, convertir, découper, extraire les figures, calculer les vecteurs, ranger sections et figures, puis remplir l’index.' },
    { fn: '_figure_cards()', how: 'Rattache chaque figure à la section qui contient sa légende ou le texte juste avant ou après elle. Sans section trouvée, pas de fiche.' },
    { fn: 'upsert_children()', how: 'Range chaque passage dans l’index avec son vecteur de sens, ses mots BM25 et une étiquette : parent_id, fichier, section et texte.' },
  ] },
  10: { slide: 'Diapo 10 · Répondre ou refuser', report: 'Chapitre 4, §4.3–4.4', diagram: 'Figure 4.4 · le graphe, sa boucle et ses trois fins', code: [
    { fn: 'build_graph()', how: 'Relie neuf étapes et trois carrefours : clarifier ou chercher, puis charger / reformuler / refuser, puis répondre ou refuser.' },
    { fn: 'route_after_grade()', how: 'Si les passages répondent → charger les sections. Sinon, compte les reformulations dans la trace : moins de 2 → reformuler ; sinon → refuser.' },
    { fn: 'make_answer()', how: 'Ne garde que les passages dont la section a vraiment été lue, et construit les sources à partir d’eux, jamais à partir du texte du modèle.' },
  ] },
  11: { slide: 'Diapo 11 · Les figures', report: 'Chapitre 4, §4.2.5 et §4.4 ; chapitre 5, §5.2.3', diagram: 'Figure 4.3 · tri, schéma, photo, contexte', code: [
    { fn: 'extract_figures()', how: 'Trie les pages, envoie les schémas à Docling qui trouve leurs bords, découpe directement les photos, et écarte logos et pages scannées.' },
    { fn: 'describe_figure()', how: 'Envoie l’image et son contexte au modèle pour obtenir 2 à 4 phrases. Cette description aide à chercher et s’affiche, mais ne sert jamais de preuve.' },
    { fn: 'Figure.document_text() et Figure.card_text()', how: 'Le premier ne garde que les mots du document (preuve) ; le second y ajoute la description générée (recherche seulement).' },
  ], nuance: 'Les figures ont été ajoutées après la mesure 39/40 de la version 3.1 : ce score ne les évalue pas.' },
  12: { slide: 'Diapo 12 · Le produit', report: 'Chapitre 5, §5.4', code: [
    { fn: 'message_for()', how: 'Transforme la réponse de l’agent en message d’écran : le texte, une carte par source avec le passage surligné, les figures citées et les recherches faites.' },
    { fn: '_figure_refs()', how: 'Pour chaque figure citée, charge sa fiche (légende, page, description). Une figure disparue est simplement ignorée.' },
  ] },
  13: { slide: 'Diapo 13 · Démonstration', report: 'Chapitre 5, §5.4', code: [
    { fn: 'sync_workspace() puis ask()', how: 'La démo suit le vrai trajet : synchroniser l’espace, puis poser une question qui finit en réponse, en refus ou en demande de précision.' },
    { fn: 'figure_image()', how: 'N’ouvre l’image d’une figure que si la conversation est à vous et que cette figure a été citée dans une de ses sources.' },
  ], nuance: 'Ce qu’on peut montrer en direct dépend de la version déployée et des documents déjà synchronisés.' },
  14: { slide: 'Diapo 14 · Protocole', report: 'Chapitre 6, §6.1–6.3', code: [
    { fn: 'run_evaluation()', how: 'Pose les 60 questions gelées. Question hors documents : réussie si Sanad refuse. Question couverte : réussie si le juge donne un appui de 1.' },
    { fn: 'LLMJudgeScorer', how: 'Le juge maison : un modèle lit la question, la réponse et les sections, et donne deux notes entre 0 et 1. La bibliothèque RAGAS n’est pas utilisée.' },
  ] },
  15: { slide: 'Diapo 15 · Résultats', report: 'Chapitre 6, §6.4', code: [
    { fn: 'Le rapport de la version 3.1.0', how: 'Fichier conservé : 39/40 réponses appuyées, 20/20 refus, 39/39 sources, sur le jeu de questions en français.' },
    { fn: 'evaluate_report()', how: 'Recalcule le verdict à partir de ce rapport, sans rappeler le modèle.' },
  ], nuance: 'Cette mesure a été faite avant l’ajout des figures ; elle ne les évalue pas.' },
  16: { slide: 'Diapo 16 · Performances', report: 'Chapitre 6, §6.5', code: [
    { fn: 'Les relevés de mesure', how: 'Temps pris sur une machine précise, au repos et chargée : ce ne sont pas des garanties pour toutes les machines.' },
    { fn: 'detect_changes()', how: 'Compare l’empreinte de chaque fichier à la précédente : un dossier inchangé n’est pas relu, d’où 0,09 s.' },
  ] },
  17: { slide: 'Diapo 17 · Limites', report: 'Chapitre 6, §6.7–6.8', code: [
    { fn: 'make_grade()', how: 'Le vérificateur ne lit que les petits passages de 500 caractères, avant que les sections complètes soient chargées.' },
    { fn: 'build_graph()', how: 'L’ordre est « vérifier, puis charger les sections » : le refus peut donc arriver avant la section qui contient la réponse.' },
  ] },
  18: { slide: 'Diapo 18 · Perspectives', report: 'Conclusion, tableau C.1', code: [
    { fn: 'make_grade()', how: 'C’est ici qu’on ferait lire plus de texte au vérificateur ; il faudrait ensuite refaire G1 et G2 sur les 60 questions.' },
  ] },
  19: { slide: 'Diapo 19 · Conclusion', report: 'Conclusion générale', code: [
    { fn: 'sync_workspace() → search() → build_graph() → evaluate_report()', how: 'Le trajet complet : ranger les documents, chercher, répondre ou refuser, puis vérifier la version avant de la publier.' },
  ] },
  20: { slide: 'Annexe A · Sécurité', report: 'Chapitre 4, §4.7', code: [
    { fn: 'auth_callback()', how: 'Au retour de Keycloak : vérifie le code secret et le jeton, enregistre la personne, ouvre sa session.' },
    { fn: 'figure_image()', how: 'Deux contrôles avant d’afficher une image : la conversation est à vous, et la figure a été citée dans une de ses sources.' },
  ] },
  21: { slide: 'Annexe B · Question 33', report: 'Chapitre 6, §6.7', code: [
    { fn: 'build_graph()', how: 'Place la vérification (grade) avant le chargement des sections (fetch_parents) : si la vérification dit non, la section complète n’est jamais lue.' },
    { fn: 'chunk_document()', how: 'Découpe les passages à 500 caractères ; pour l’article 66, la coupure tombe juste avant le délai d’un mois.' },
  ] },
  22: { slide: 'Annexe C · Séquence', report: 'Chapitre 4, §4.3', diagram: 'Figure 3.2 · personne → agent → recherche → modèle', code: [
    { fn: 'ask()', how: 'Nettoie la question, lance le graphe, puis emballe le résultat dans un objet Answer avec la trace des étapes.' },
  ] },
  23: { slide: 'Annexe D · Modèle de données', report: 'Chapitre 4, §4.5', diagram: 'Figure 4.5 · les tables et leurs liens', code: [
    { fn: 'Tables workspace, document, conversation', how: 'Chaque ligne porte le numéro de son espace ; supprimer l’espace supprime automatiquement ses documents, bilans et conversations.' },
    { fn: 'upsert_children() et get_parent()', how: 'Les passages vont dans l’index Qdrant, les sections dans des fichiers JSON : le parent_id relie les deux.' },
  ] },
  24: { slide: 'Annexe E · Classes', report: 'Chapitre 4, §4.5', diagram: 'Figure 4.7 · Answer, SearchHit, SyncReport', code: [
    { fn: 'Child et SearchHit', how: 'Le passage rangé et le résultat de recherche qui le représente ; tous deux portent le parent_id qui mène à la section.' },
    { fn: 'Answer et Trace', how: 'Le résultat final (type, texte, sources) et la liste des étapes réellement faites, d’où l’on recompte recherches et reformulations.' },
  ] },
};
