// Pont vérifié le 24 septembre 2026 : Soutenance_Sanad.pptx, rapport/*.md,
// puis codebase-memory-mcp sur le projet et sur origin/main (index C-sanad-figures).
// Les lignes sont des repères de lecture, pas des liens vers la machine locale.
export interface Evidence {
  slide: string;
  report: string;
  diagram?: string;
  code: { where: string; meaning: string }[];
  nuance?: string;
}

export const evidence: Record<number, Evidence> = {
  1: { slide: 'Diapos 1–2 · Sanad et plan', report: 'Introduction générale ; chapitre 1, §1.3', code: [
    { where: 'agent/state.py · Answer.__post_init__', meaning: 'Une réponse finale ne peut pas être construite sans source.' },
    { where: 'agent/graph.py · build_graph', meaning: 'Les branches réponse, refus et clarification sont explicites.' },
  ] },
  3: { slide: 'Diapo 3 · Le problème', report: 'Introduction ; chapitre 2, §2.1–2.2', code: [
    { where: 'agent/answering.py · build_write_answer', meaning: 'Le rédacteur reçoit des sections, pas une vérité sortie de sa mémoire.' },
  ] },
  4: { slide: 'Diapo 4 · Nos objectifs', report: 'Chapitre 1, §1.3 ; chapitre 6, §6.2–6.3', code: [
    { where: 'evaluation/gate.py · evaluate_report', meaning: 'Calcule les trois seuils séparément.' },
    { where: 'scripts/release_gate.py · main', meaning: 'Renvoie un échec si un seuil manque.' },
  ] },
  5: { slide: 'Diapo 5 · État de l’art', report: 'Chapitre 2, §2.2–2.3', diagram: 'Figure 2.1 · deux temps du RAG', code: [
    { where: 'vector_store.py · search, L400–509', meaning: 'Deux recherches puis fusion des rangs dans un seul espace.' },
    { where: 'agent/answering.py · build_write_answer', meaning: 'Les sections retrouvées sont transmises au modèle.' },
  ], nuance: 'Le tableau comparatif des concurrents n’est pas une mesure commune.' },
  6: { slide: 'Diapo 6 · Conduite du projet', report: 'Chapitre 1, §1.5 ; BUILD-PLAN et BUILD-STATE', diagram: 'Figure 1.1 · sprints', code: [
    { where: 'docs/journal/BUILD-PLAN.md · ST-19, ST-32, ST-35, ST-38', meaning: 'Propriétaires prévus : MB corpus et jeu de questions ; YL moteur et scripts.' },
    { where: 'docs/journal/BUILD-STATE.md · L1810–13, L1866–73', meaning: 'ST-28, ST-32 et ST-33 : plan YL, réalisation enregistrée sur la copie de MB.' },
  ], nuance: 'La revue « de chaque modification » a connu des exceptions consignées. Le rapport §4.6 crédite MB du remplacement de Gradio par les pages serveur.' },
  7: { slide: 'Diapo 7 · Les besoins', report: 'Chapitre 3, §3.1–3.2', diagram: 'Figure 3.1 · cas d’utilisation', code: [
    { where: 'db/schema.sql · workspace.owner_user_id, L20–37', meaning: 'La personne qui crée l’espace en est propriétaire ; NULL signifie ancien espace partagé.' },
    { where: 'workspaces.py ; app.py', meaning: 'Les opérations contrôlent cet espace, pas un rôle fixe Keycloak.' },
  ], nuance: 'Le rapport emploie « deux rôles » pour deux usages ; la version actuelle n’a plus ces rôles applicatifs.' },
  8: { slide: 'Diapo 8 · Architecture', report: 'Chapitre 4, §4.1 et §4.8', diagram: 'Figure 4.1 · application, stockages, modèles', code: [
    { where: 'app.py · create_app', meaning: 'FastAPI sert pages et API dans le même processus.' },
    { where: 'db/schema.sql ; vector_store.py ; parent_store.py ; figures.py', meaning: 'SQLite, index Qdrant, sections JSON et figures PNG ont des rôles distincts.' },
    { where: 'agent/vision.py · _vision_model, L82–106', meaning: 'En mode cloud, la description de figure transmet aussi son image au modèle.' },
  ], nuance: '« Les documents ne sortent pas » vaut pour les originaux. En mode cloud, question, extraits et éventuellement images traversent le réseau.' },
  9: { slide: 'Diapo 9 · Documents vers index', report: 'Chapitre 4, §4.2', diagram: 'Figure 4.2 · ingestion et embranchement figures', code: [
    { where: 'sync.py · _ingest, L775–902', meaning: 'Efface l’ancienne indexation, convertit, découpe, traite les figures puis enregistre.' },
    { where: 'sync.py · _figure_cards, L943–981', meaning: 'Rattache une fiche de figure à la section qui porte sa légende.' },
    { where: 'vector_store.py · upsert_children, L333–397', meaning: 'Range vecteurs denses, mots BM25, texte du document et parent_id.' },
  ] },
  10: { slide: 'Diapo 10 · Répondre ou refuser', report: 'Chapitre 4, §4.3–4.4', diagram: 'Figure 4.4 · graphe avec boucle et trois sorties', code: [
    { where: 'agent/graph.py · build_graph, L77–122', meaning: 'Neuf nœuds et les bifurcations du vrai graphe.' },
    { where: 'agent/nodes.py · route_after_grade, L523–537', meaning: 'Pertinent → parent ; sinon reprise bornée → refus.' },
    { where: 'agent/nodes.py · make_answer, L431–476', meaning: 'N’attache que les sources des sections réellement chargées.' },
  ] },
  11: { slide: 'Diapo 11 · Les figures', report: 'Chapitre 4, §4.2.5 et §4.4 ; chapitre 5, §5.2.3', diagram: 'Figure 4.3 · filtre, dessin, photo, contexte', code: [
    { where: 'figures.py · extract_figures, L138–174', meaning: 'Dessins : Docling puis découpe ; photos : cadre PDF direct ; bruit écarté.' },
    { where: 'agent/vision.py · describe_figure, L37–56', meaning: 'Description de recherche et d’affichage, jamais une preuve pour rédiger.' },
    { where: 'sync.py · _figure_cards, L943–981', meaning: 'Texte du document dans text, description générée dans search_text.' },
  ], nuance: 'Fonction présente dans origin/main depuis #157. La branche locale fix/S6-reports-empty-message, plus ancienne, ne l’inclut pas. Le score v3.1.0 précède l’ajout des figures.' },
  12: { slide: 'Diapo 12 · Le produit', report: 'Chapitre 5, §5.4', code: [
    { where: 'ui/templates/ ; app.py', meaning: 'Écrans Espaces, Assistant et Rapports.' },
    { where: 'ui/conversation.py · _figure_refs, L448–465', meaning: 'La carte source peut porter une figure réellement enregistrée.' },
  ] },
  13: { slide: 'Diapo 13 · Démonstration', report: 'Chapitre 5, §5.4 ; docs/defense/demo-script.md', code: [
    { where: 'app.py ; ui/templates/ ; agent/graph.py', meaning: 'Sync, question, source et refus suivent les routes de l’application.' },
    { where: 'app.py · GET /chat/figure/{conversation_id}/{figure_id}, L2195–2226', meaning: 'La figure s’ouvre depuis une source montrée dans cette conversation.' },
  ], nuance: 'La démo réelle dépend de la version déployée et de son corpus, pas du seul code fusionné.' },
  14: { slide: 'Diapo 14 · Protocole', report: 'Chapitre 6, §6.1–6.3', code: [
    { where: 'evaluation/golden/ ; evaluation/runner.py', meaning: '40 questions couvertes, 20 non couvertes, rapport par ligne.' },
    { where: 'evaluation/scoring.py · LLMJudgeScorer', meaning: 'Juge propre au projet ; la bibliothèque RAGAS prévue n’est pas utilisée.' },
  ] },
  15: { slide: 'Diapo 15 · Résultats', report: 'Chapitre 6, §6.4', code: [
    { where: 'docs/evals/release-v3.1.0-2026-09-19.json', meaning: '39/40 fondées, 20/20 refus, 39/39 sources sur le jeu français.' },
    { where: 'scripts/release_gate.py · main', meaning: 'Recalcule le verdict depuis le rapport.' },
  ], nuance: 'Cette mesure v3.1 précède la fusion #157 des figures ; elle ne les évalue pas.' },
  16: { slide: 'Diapo 16 · Performances', report: 'Chapitre 6, §6.5', code: [
    { where: 'scripts/spike_st18.py ; docs/journal/BUILD-STATE.md', meaning: 'Temps mesurés sur la machine de référence, pas garantie de production.' },
    { where: 'change_detection.py ; sync.py', meaning: 'Un dossier inchangé évite la réindexation.' },
  ] },
  17: { slide: 'Diapo 17 · Limites', report: 'Chapitre 6, §6.7–6.8', code: [
    { where: 'agent/nodes.py · make_grade, L329–353', meaning: 'Le vérificateur lit les SearchHit courts avant le chargement des sections.' },
    { where: 'agent/graph.py · build_graph, L102–116', meaning: 'La décision de refuser peut arriver avant le parent contenant la réponse.' },
  ] },
  18: { slide: 'Diapo 18 · Perspectives', report: 'Conclusion, tableau C.1', code: [
    { where: 'agent/nodes.py · make_grade', meaning: 'Modifier le contexte du vérificateur demande une nouvelle évaluation G1 et G2.' },
  ] },
  19: { slide: 'Diapo 19 · Conclusion', report: 'Conclusion générale', code: [
    { where: 'sync.py → vector_store.py → agent/graph.py → evaluation/gate.py', meaning: 'Un trajet technique complet et contrôlé, du fichier au verdict de version.' },
  ] },
  20: { slide: 'Annexe A · Sécurité', report: 'Chapitre 4, §4.7', code: [
    { where: 'ui/oidc.py ; app.py', meaning: 'Connexion et contrôle d’espace à chaque accès.' },
    { where: 'app.py · figure_image, L2195–2226', meaning: 'Deux contrôles : propriétaire de la conversation et figure réellement citée par une de ses cartes.' },
  ] },
  21: { slide: 'Annexe B · Question 33', report: 'Chapitre 6, §6.7', code: [
    { where: 'agent/graph.py · grade → fetch_parents', meaning: 'Le vérificateur juge le petit passage avant que le parent soit chargé.' },
    { where: 'config.py · chunk_child_size_chars', meaning: '500 caractères par défaut ; l’article 66 est coupé trop tôt dans ce cas.' },
  ] },
  22: { slide: 'Annexe C · Séquence', report: 'Chapitre 4, §4.3', diagram: 'Figure 3.2 · utilisateur → agent → recherche → modèle', code: [
    { where: 'app.py ; agent/graph.py ; agent/nodes.py', meaning: 'Question, vérification, sections et trois issues dans cet ordre.' },
  ] },
  23: { slide: 'Annexe D · Modèle de données', report: 'Chapitre 4, §4.5', diagram: 'Figure 4.5 · relations entre tables', code: [
    { where: 'db/schema.sql · workspace, document, sync_run, conversation', meaning: 'Clés étrangères et propriété des espaces.' },
    { where: 'vector_store.py ; parent_store.py ; figures.py', meaning: 'Passages, sections et figures vivent hors de SQLite.' },
  ] },
  24: { slide: 'Annexe E · Classes', report: 'Chapitre 4, §4.5', diagram: 'Figure 4.7 · Answer, Source, Trace, SyncReport', code: [
    { where: 'chunking.py · Child ; vector_store.py · SearchHit', meaning: 'Le parent_id relie le passage retrouvé à sa section.' },
    { where: 'agent/state.py · Answer ; agent/trace.py · Trace', meaning: 'Type, sources et recherches effectives dans un résultat.' },
  ] },
};
