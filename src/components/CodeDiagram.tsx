type StepProps = {
  title: string;
  brief: string;
  detail: string;
  code: string;
  tone?: 'blue' | 'green' | 'amber' | 'slate';
  shape?: 'decision' | 'normal';
};

const colors = {
  blue: 'border-blue-400 bg-blue-50',
  green: 'border-emerald-400 bg-emerald-50',
  amber: 'border-amber-400 bg-amber-50',
  slate: 'border-slate-400 bg-slate-50',
};

function Step({ title, brief, detail, code, tone = 'blue', shape = 'normal' }: StepProps) {
  return <details className={`min-w-0 rounded-xl border-2 p-3 text-sm ${colors[tone]}`}>
    <summary className="cursor-pointer font-bold leading-snug focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
      {shape === 'decision' && <span aria-hidden="true" className="me-2 text-blue-900">◇</span>}{title}
      <span className="mt-1 block font-normal">{brief}</span>
    </summary>
    <p className="mt-3 border-t border-current/20 pt-2 leading-relaxed">{detail}</p>
    <p className="mt-2 break-words font-mono text-xs font-semibold">Code : {code}</p>
  </details>;
}

function Diagram({ title, source, children }: { title: string; source: string; children: ReactNode }) {
  return <figure className="rounded-2xl border border-slate-300 bg-white p-5 sm:p-6">
    <figcaption className="text-lg font-bold">{title}</figcaption>
    <p className="mt-1 text-xs text-slate-700">Reprend {source}. Ouvrez une boîte pour voir ce que le code fait, et pourquoi.</p>
    <div className="mt-5 space-y-3">{children}</div>
  </figure>;
}

function Down({ label }: { label?: string }) {
  return <div className="text-center text-sm font-semibold text-blue-900"><span aria-hidden="true">↓</span>{label && <span className="ms-2">{label}</span>}</div>;
}

function Architecture() {
  return <Diagram title="Figure 4.1 · Les frontières de Sanad" source="la diapositive 8 et le rapport §4.1">
    <Step title="Navigateur" brief="Les personnes choisissent un espace, synchronisent ou posent une question." detail="Le navigateur affiche des pages construites par le serveur ; il n’ouvre pas Qdrant ou SQLite directement." code="app.py ; ui/templates/" tone="slate" />
    <Down label="page / demande" />
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Connexion Keycloak" brief="Vérifier qui demande et qui possède l’espace." detail="Cette porte s’applique en mode comptes. Les anciens espaces sans propriétaire restent partagés en lecture." code="ui/oidc.py ; db/schema.sql:workspace.owner_user_id" tone="amber" />
      <Step title="FastAPI · un processus Python" brief="Les écrans et /api/v1 arrivent au même moteur." detail="La route valide et délègue aux services ; elle ne redéfinit pas l’algorithme de recherche." code="app.py:create_app ; api/routes.py" />
    </div>
    <Down label="trois activités dans l’application" />
    <div className="grid gap-3 sm:grid-cols-3">
      <Step title="Synchroniser" brief="Fichiers → index + sections + figures." detail="La conversion et le découpage ne s’exécutent que pour les fichiers à traiter." code="sync.py:sync_workspace/_ingest" />
      <Step title="Répondre" brief="Chercher, vérifier, charger, rédiger ou refuser." detail="LangGraph porte les embranchements et la trace des recherches." code="agent/graph.py:build_graph" tone="green" />
      <Step title="Évaluer" brief="Rejouer le jeu gelé et décider si une version passe." detail="Le rapport contient les résultats par question ; la porte compare G1, G2 et G3." code="evaluation/runner.py ; evaluation/gate.py" tone="slate" />
    </div>
    <Down label="quatre stockages, chacun pour une raison" />
    <div className="grid gap-2 sm:grid-cols-2">
      <Step title="SQLite · le registre" brief="Espaces, fichiers, rapports, conversations." detail="Clés étrangères et propriété ; pas le moteur de recherche par sens." code="db/schema.sql ; db/repo.py" tone="slate" />
      <Step title="Qdrant · l’index" brief="Enfants et fiches de figures, par espace." detail="Une collection par espace évite qu’une recherche RH ne ramène les manuels d’un autre." code="vector_store.py:collection_name/search" />
      <Step title="JSON · les sections" brief="Texte complet derrière chaque parent_id." detail="Un petit passage localise une grande section ; seul le texte chargé peut appuyer la réponse." code="parent_store.py:get_parent" tone="green" />
      <Step title="PNG · les figures" brief="Images et légendes conservées à part." detail="Une fiche trouvée par la recherche pointe vers l’image et sa section textuelle." code="figures.py:save_figures" tone="green" />
    </div>
    <div className="rounded-xl border-2 border-dashed border-amber-500 p-3 text-sm"><strong>Frontière réseau :</strong> Gemini reçoit question et passages ; pour décrire une figure, son image part aussi. Ollama peut tout garder local si un modèle qui lit les images est configuré. <code className="block pt-1">agent/chat.py ; agent/vision.py:_vision_model</code></div>
  </Diagram>;
}

function Ingestion() {
  return <Diagram title="Figure 4.2 · Un document prend deux chemins" source="la diapositive 9 et le rapport §4.2">
    <Step title="Fichier du dossier" brief="Point de départ : PDF, Word, PowerPoint, texte ou Markdown." detail="Le nom du fichier et le workspace_id déterminent à quel espace il appartient." code="sync.py:sync_workspace" tone="slate" />
    <Down />
    <Step title="Empreinte inchangée ?" brief="SHA-256 compare les octets au dernier Sync." detail="Oui : une ligne « inchangé », sans reconversion. Non : les anciens passages sont supprimés avant de traiter les nouveaux octets ; ils ne doivent plus être cités." code="change_detection.py:detect_changes ; sync.py:_ingest L789–821" shape="decision" />
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Oui → rien à réindexer" brief="Le rapport garde la trace du fichier inchangé." detail="Une nouvelle recherche utilise l’index déjà construit ; ce n’est pas une nouvelle mesure de vitesse d’ingestion." code="sync.py:_run" tone="green" />
      <Step title="Non → effacer l’ancien index" brief="Même si le fichier est redevenu « nouveau » après une panne." detail="Si la conversion échoue, l’ancien texte ne reste pas faussement citable." code="sync.py:_ingest L789–846 ; vector_store.delete_document" tone="amber" />
    </div>
    <Down label="le fichier à traiter se sépare" />
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-3 rounded-xl border border-blue-300 p-3">
        <h3 className="font-bold text-blue-950">Branche texte</h3>
        <Step title="Convertir" brief="Retrouver le texte et les titres." detail="PDF avec ses titres, DOCX/PPTX, texte et Markdown ont des chemins de conversion distincts." code="conversion.py:convert_file" />
        <Step title="Découper" brief="Sections parents puis enfants de 500 caractères, 100 communs par défaut." detail="Les petits extraits permettent la recherche ; parent_id permet de relire la section entière ensuite." code="chunking.py:chunk_document ; config.py" />
        <Step title="Deux représentations" brief="E5 (sens, 768 nombres) + BM25 (mots exacts)." detail="Le passage prend « passage: » ; la question prendra « query: ». Les scores sont fusionnés par rang RRF." code="embeddings.py ; vector_store.py:upsert_children" />
      </div>
      <div className="space-y-3 rounded-xl border border-emerald-300 p-3">
        <h3 className="font-bold text-emerald-950">Branche figures · code fusionné #157</h3>
        <Step title="Filtrer la page" brief="Ne pas appeler le modèle de mise en page pour un logo ou un scan entier." detail="PyMuPDF distingue dessins, images répétées et photos ; une page de texte sans visuel ne coûte rien à Docling." code="figures.py:_pdf_page_plan L184–227" tone="green" />
        <Step title="Schéma ou photo ?" brief="Dessin → boîte Docling ; photo → cadre PDF direct." detail="Docling localise les formes et légendes ; PyMuPDF découpe à partir du PDF original. Les neuf photos d’une grille restent neuf photos." code="figures.py:extract_figures L138–174" tone="green" />
        <Step title="Fiche rattachée au texte" brief="Légende, titre et mots voisins déterminent le parent." detail="Sans place retrouvée dans une section, pas de fiche cherchable : citer un texte étranger à l’image serait trompeur." code="sync.py:_figure_cards L943–981" tone="green" />
      </div>
    </div>
    <Down label="écrire avant de rendre cherchable" />
    <div className="grid gap-3 sm:grid-cols-3">
      <Step title="Sections JSON" brief="Les parents complets." detail="Écrits avant les vecteurs, pour ne pas trouver un enfant sans section." code="parent_store.save_parents" tone="slate" />
      <Step title="Figures PNG" brief="Images et fiche descriptive." detail="Une figure cherchable pointe vers un PNG déjà enregistré." code="figures.save_figures" tone="slate" />
      <Step title="Qdrant" brief="Enfants texte et fiches de figures." detail="Le texte du document va dans chunk_text ; la description générée ne sert qu’à la recherche (search_text)." code="vector_store.upsert_children L366–396" tone="blue" />
    </div>
  </Diagram>;
}

function Agent() {
  return <Diagram title="Figure 4.4 · Pourquoi une question peut finir de trois façons" source="la diapositive 10 et agent/graph.py">
    <Step title="Question → résumer l’historique" brief="Comprendre « Et pour les cadres ? » après la question précédente." detail="Le résumé devient un champ de l’état transmis au planificateur." code="agent/graph.py:build_graph ; agent/nodes.py:make_summarize" />
    <Down />
    <Step title="Planifier : claire ou ambiguë ?" brief="Une question claire peut devenir plusieurs recherches ; une ambiguë demande une précision." detail="La clarification est une vraie troisième sortie, avant tout appel à Qdrant." code="agent/nodes.py:route_after_rewrite" shape="decision" />
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Ambiguë → clarification" brief="Une question de retour, puis arrêt du graphe pour cette demande." detail="La conversation peut reprendre quand l’utilisateur précise ce qu’il veut." code="agent/graph.py L97–100, L118" tone="amber" />
      <Step title="Claire → rechercher" brief="E5 + BM25 dans l’espace actif ; une trace par recherche." detail="Si plusieurs sous-questions existent, leurs résultats sont fusionnés avant le jugement." code="agent/nodes.py:make_retrieve L306–326" tone="blue" />
    </div>
    <Down />
    <Step title="Vérifier les petits passages" brief="Le modèle répond pertinent ou hors sujet ; zéro passage ne réveille même pas le modèle." detail="Un verdict illisible est une erreur technique, pas un « hors sujet » qui ferait croire que le corpus est vide." code="agent/nodes.py:make_grade L329–353 ; agent/grading.py:_verdict" shape="decision" />
    <div className="grid gap-3 sm:grid-cols-3">
      <Step title="Non, essais restants ↩" brief="Reformuler → revenir à rechercher." detail="route_after_grade lit retry_ceiling depuis config ; le nombre de reprises vient de la trace." code="agent/nodes.py:route_after_grade L523–537" tone="blue" />
      <Step title="Non, essais épuisés" brief="Refuser et nommer les recherches faites." detail="Le refus ne demande pas à un modèle de se justifier ; c’est une sortie déterminée du graphe." code="agent/nodes.py:make_refuse L479–495" tone="amber" />
      <Step title="Oui → charger les parents" brief="Un parent par id, même si plusieurs enfants sont trouvés." detail="Zéro section lisible signifie refus ; quatre sur cinq permet une réponse, mais la cinquième n’est pas citée." code="agent/nodes.py:make_fetch_parents L356–412" tone="green" />
    </div>
    <Down label="si des sections sont lisibles" />
    <Step title="Rédiger → réponse sourcée ou refus" brief="Le modèle lit seulement les sections chargées ; les sources viennent des hits, pas de sa prose." detail="S’il décline avec NOT_COVERED, le résultat devient un refus. Sinon Answer.__post_init__ interdit une réponse finale sans source." code="agent/nodes.py:make_answer L431–476 ; agent/state.py:Answer" tone="green" />
  </Diagram>;
}

function Figures() {
  return <Diagram title="Figure 4.3 · Une figure a une image, un contexte et une frontière de preuve" source="la diapositive 11 et le code fusionné #157">
    <Step title="Page avec visuel ?" brief="PyMuPDF évite Docling sur le texte seul, les logos répétés et les scans pleine page." detail="Un échec d’extraction des figures ne fait pas échouer le texte du fichier ; figures.extract_figures retourne une liste vide." code="figures.py:_pdf_page_plan L184–227 ; extract_figures L138–174" shape="decision" />
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Dessin en traits" brief="Docling dessine la boîte complète ; PyMuPDF découpe l’original." detail="Un schéma sans image intégrée a besoin du modèle de mise en page pour trouver ses bords et labels." code="figures.py:_docling_candidates/_render_pdf_regions" tone="blue" />
      <Step title="Photo intégrée" brief="PyMuPDF connaît déjà son cadre exact dans le PDF." detail="Le chemin direct évite de traiter une grille de neuf photos comme une seule grande figure." code="figures.py:_photo_raws" tone="green" />
    </div>
    <Down label="légende, section, paragraphes voisins" />
    <Step title="Décrire si un modèle d’image est disponible" brief="Cloud : Gemini voit l’image. Local : Ollama visuel, seulement si configuré." detail="Une description réutilisée par empreinte de l’image évite de payer deux fois. Un échec de description conserve la figure." code="agent/vision.py:describe_figure L37–56 ; sync.py:_figures_for" tone="slate" />
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Fiche de recherche · search_text" brief="Légende + contexte + description générée." detail="Cette colonne aide E5 et BM25 à retrouver l’image à partir de mots absents de la légende." code="figures.py:Figure.card_text ; sync.py:_figure_cards" tone="blue" />
      <Step title="Preuve pour rédiger · text" brief="Légende + contexte venant du document seulement." detail="La description inventée par un modèle ne devient ni passage du vérificateur ni section de la réponse." code="figures.py:Figure.document_text ; vector_store.py:payload.chunk_text" tone="green" />
    </div>
    <div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-3 text-sm"><strong>Limite réelle :</strong> une photo sans section textuelle où la rattacher est écartée de l’index. Même retrouvée, une image seule ne permet pas d’affirmer un détail que les mots du document ne portent pas. Le score 39/40 de v3.1 ne mesure pas les figures.</div>
  </Diagram>;
}

function Rag() {
  return <Diagram title="Figure 2.1 · Préparer une fois, interroger souvent" source="la diapositive 5 et le rapport §2.2–2.3">
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-3 rounded-xl border border-blue-300 p-3">
        <h3 className="font-bold">Avant la question · Sync</h3>
        <Step title="Document → texte" brief="PDF, Word, PowerPoint ou texte." detail="Les titres doivent survivre : ils aident à couper la loi et à nommer les sources." code="conversion.py:convert_file" />
        <Step title="Texte → parents et enfants" brief="Chercher court, donner plus de contexte ensuite." detail="Un enfant garde parent_id et le nom de son fichier." code="chunking.py:chunk_document" />
        <Step title="Enfants → index" brief="E5 calcule le sens, BM25 garde les mots exacts." detail="Qdrant garde deux représentations de chaque passage, dans la collection de cet espace." code="embeddings.py ; vector_store.py:upsert_children" />
      </div>
      <div className="space-y-3 rounded-xl border border-emerald-300 p-3">
        <h3 className="font-bold">À chaque question · agent</h3>
        <Step title="Question → recherches" brief="La conversation aide à préciser ou découper la demande." detail="La question est encodée avec le préfixe query: et recherchée dans l’index de l’espace actif." code="agent/nodes.py:make_rewrite ; vector_store.py:search" tone="green" />
        <Step title="Résultats → vérification" brief="Le petit passage apporte-t-il une partie de la réponse ?" detail="Une proximité de mots ne suffit pas. Si non, le graphe reformule, puis peut refuser." code="agent/nodes.py:make_grade/route_after_grade" tone="green" />
        <Step title="Section → réponse" brief="Le modèle reçoit la section complète et sa source." detail="La liste de sources est construite depuis les passages lus, non depuis les noms inventés par le modèle." code="agent/nodes.py:make_fetch_parents/make_answer" tone="green" />
      </div>
    </div>
    <div className="rounded-xl border border-dashed border-blue-400 p-3 text-center text-sm font-semibold">L’index préparé à gauche alimente la recherche à droite. Sans Sync, ce n’est pas « pas de réponse » : c’est « pas encore d’index ».</div>
  </Diagram>;
}

function Sequence() {
  return <Diagram title="Figure 3.2 · Suivre les messages d’une vraie question" source="l’annexe C et agent/graph.py">
    <ol className="space-y-3 border-s-2 border-blue-400 ps-4">
      <li><Step title="1. Utilisateur → interface" brief="Question + espace + conversation." detail="La page garde l’espace choisi visible et n’ouvre pas un index arbitraire." code="app.py ; ui/runs.py" /></li>
      <li><Step title="2. Interface → agent" brief="Vérifier l’accès, transmettre question et historique." detail="La même fonction du produit sert les pages et l’API fine ; les routes ne réécrivent pas RAG." code="app.py ; api/service.py:ask ; agent/graph.py:ask" /></li>
      <li><Step title="3. Agent ⇄ modèle" brief="Résumer, planifier ; question ambiguë → clarification." detail="Une clarification s’arrête avant la recherche. Une question claire produit une à cinq recherches au maximum." code="agent/nodes.py:make_summarize/make_rewrite" tone="amber" /></li>
      <li><Step title="4. Agent ⇄ Qdrant ⇄ modèle" brief="Recherche E5+BM25, puis verdict pertinent/hors sujet." detail="La trace conserve chaque chaîne recherchée et les fichiers touchés ; deux reformulations maximum par défaut." code="vector_store.py:search ; agent/nodes.py:make_retrieve/make_grade" /></li>
      <li><Step title="5. Agent ⇄ sections JSON" brief="Si pertinent, charger le parent derrière chaque enfant." detail="Une section introuvable n’est pas citée ; zéro section lisible produit un refus distinct." code="agent/nodes.py:make_fetch_parents" tone="green" /></li>
      <li><Step title="6. Agent → interface → utilisateur" brief="Réponse sourcée, refus avec recherches, ou clarification." detail="Answer.kind nomme la variante ; la carte de figure est affichée seulement si ce résultat y renvoie." code="agent/state.py:Answer ; ui/conversation.py:message_for" tone="green" /></li>
    </ol>
  </Diagram>;
}

function Schema() {
  return <Diagram title="Figure 4.5 · Les clés de SQLite, puis les deux magasins extérieurs" source="l’annexe D et db/schema.sql">
    <Step title="workspace · id, owner_user_id" brief="Un espace appartient à son créateur ; NULL signifie un ancien espace partagé." detail="Le dossier d’origine est un chemin ; les données de recherche produites sont séparées. Une suppression en cascade concerne les données dérivées." code="db/schema.sql:workspace L20–37" />
    <Down label="workspace_id est la clé qui rattache les tables suivantes" />
    <div className="grid gap-3 sm:grid-cols-3">
      <Step title="document" brief="Nom unique dans l’espace, empreinte, état, type." detail="content_hash détecte le changement ; le statut distingue actif, en échec, ignoré et retiré." code="db/schema.sql:document L39–49" tone="slate" />
      <Step title="sync_run → sync_item" brief="Un passage de Sync ; une ligne et sa raison par fichier." detail="Un fichier cassé ne doit pas faire disparaître le bilan des autres." code="db/schema.sql:sync_run/sync_item L51–73" tone="slate" />
      <Step title="eval_run → eval_result" brief="Un examen ; une ligne par question notée." detail="Le rapport JSON est conservé hors table ; la table garde état, nombres et chemin du rapport." code="db/schema.sql:eval_run/eval_result L75–106" tone="slate" />
      <Step title="app_user → user_session" brief="Identité Keycloak et session du navigateur." detail="La session garde l’empreinte du jeton, pas la valeur en clair." code="db/schema.sql:app_user/user_session L143–162" tone="slate" />
      <Step title="conversation" brief="id propre, user_id, workspace_id, titre et contenu." detail="Plusieurs conversations par personne et espace ; une suppression d’espace efface ses conversations dérivées." code="db/schema.sql:conversation L187–197" tone="slate" />
    </div>
    <Down label="hors SQLite : parent_id relie ces deux magasins" />
    <div className="grid gap-3 sm:grid-cols-3">
      <Step title="Qdrant" brief="Enfants et fiches de figures, une collection par espace." detail="Le payload porte parent_id, source_file, section_label, chunk_text et éventuellement figure_id." code="vector_store.py:upsert_children L333–397" tone="blue" />
      <Step title="Parents JSON" brief="La section entière derrière parent_id." detail="La recherche localise l’enfant ; le rédacteur lit le parent chargé ensuite." code="parent_store.py:get_parent" tone="green" />
      <Step title="Figures PNG + fiche" brief="Image et contexte, jamais une table d’images SQLite." detail="La fiche Qdrant relie figure_id à une section ; la route d’image contrôle la conversation." code="figures.py:save_figures ; ui/conversation.py:_figure_refs" tone="green" />
    </div>
  </Diagram>;
}

function Contracts() {
  return <Diagram title="Figure 4.7 · Les objets qui traversent les modules" source="l’annexe E et les classes Python">
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Child → SearchHit" brief="Petit texte, source_file et parent_id deviennent un résultat de recherche." detail="Un SearchHit peut aussi porter figure_id. Le texte du hit qui atteint le vérificateur vient du document, pas de la description générée." code="chunking.py:Child ; vector_store.py:SearchHit" />
      <Step title="Parent" brief="Section entière retrouvée grâce au parent_id." detail="Quatre enfants du même parent ne demandent qu’une lecture du parent." code="agent/nodes.py:make_fetch_parents" tone="green" />
      <Step title="Answer → Source + Trace" brief="Type, texte, sources, session et étapes effectivement parcourues." detail="Answer.__post_init__ refuse un texte vide et une réponse finale sans source. Les sources viennent des passages lus." code="agent/state.py:Answer L85–123 ; agent/trace.py" tone="green" />
      <Step title="SyncReport → SyncItemReport" brief="Bilan de toute la synchronisation + une ligne par fichier." detail="Chaque ligne garde le résultat et sa raison. Un échec de fichier n’efface pas les lignes déjà enregistrées." code="sync.py:SyncReport/SyncItemReport" tone="slate" />
    </div>
  </Diagram>;
}

function UseCases() {
  return <Diagram title="Figure 3.1 · Deux usages, une seule personne peut faire les deux" source="la diapositive 7 et le rapport §3.1">
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Préparer un espace" brief="Créer → déposer des fichiers → Sync → lire le bilan." detail="Dans la version avec comptes, la personne qui crée un espace en est propriétaire ; elle peut le modifier. Ce n’est pas un rôle « gestionnaire » attribué dans Keycloak." code="workspaces.py:create_workspace ; db/schema.sql:workspace.owner_user_id" />
      <Step title="Interroger cet espace" brief="Choisir → question → réponse/refus → ouvrir la source." detail="Une personne peut interroger ses espaces ; elle peut aussi lire les anciens espaces partagés sans propriétaire." code="app.py ; agent/graph.py:ask ; ui/conversation.py:message_for" tone="green" />
    </div>
    <Down label="la frontière entre les deux personnes" />
    <Step title="Même URL, autre identifiant d’espace ?" brief="Le serveur revérifie le propriétaire ; un espace privé étranger n’apparaît pas." detail="Cacher un bouton dans la page ne suffit pas. L’index Qdrant est aussi séparé par espace, pour ne pas mélanger les passages." code="app.py ; workspaces.py ; vector_store.py:collection_name" tone="amber" shape="decision" />
    <p className="text-sm text-slate-700">Salma (RH) et Yassine (manuels) sont deux exemples de besoins, pas deux comptes dotés de droits Keycloak différents.</p>
  </Diagram>;
}

function Evaluation() {
  return <Diagram title="60 questions gelées → deux types de jugement → trois seuils" source="la diapositive 14, le rapport §6.1–6.3 et le code d’évaluation">
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="40 couvertes · G1" brief="Le texte de référence contient la réponse attendue." detail="Le juge reçoit la question, la réponse et les sections réellement lues par le rédacteur ; une réponse entièrement appuyée vaut une ligne réussie." code="evaluation/golden/ ; evaluation/capture.py ; evaluation/scoring.py:LLMJudgeScorer" />
      <Step title="20 non couvertes · G2" brief="Le bon résultat est un refus, pas un texte plausible." detail="Le contrôle du type refus est déterministe. Ces questions sont proches du thème pour éviter un examen trop facile." code="evaluation/runner.py ; evaluation/gate.py" tone="amber" />
    </div>
    <Down label="G3 examine chaque réponse donnée" />
    <Step title="Sources obligatoires" brief="Une réponse finale porte au moins une Source." detail="Answer.__post_init__ empêche déjà une réponse sans source ; G3 mesure la propriété sur le rapport réel." code="agent/state.py:Answer ; evaluation/gate.py" tone="green" />
    <Down label="la porte relit le rapport conservé" />
    <Step title="G1 ≥ 36/40 ET G2 = 20/20 ET G3 = 100 %" brief="Un seul seuil raté → version bloquée." detail="scripts/release_gate.py ne lance pas le modèle et ne dépense rien : il recalcule le verdict du rapport JSON. L’évaluation avec appels payants se lance à part." code="scripts/release_gate.py:main L47–94" tone="slate" />
    <p className="border-s-4 border-amber-500 ps-3 text-sm">Ce juge n’est pas RAGAS : la bibliothèque prévue ne s’installait pas avec le LangChain utilisé. Un juge de la même famille que le modèle peut manquer une erreur commune.</p>
  </Diagram>;
}

function Security() {
  return <Diagram title="Annexe A · Quatre verrous, pas seulement un écran de connexion" source="la diapositive 20 et le rapport §4.7">
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="1 · Qui parle ?" brief="Keycloak donne une identité ; Sanad garde une session." detail="Sanad ne reçoit pas le mot de passe. En mode local sans comptes, cette porte ne fonctionne pas de la même manière : ne confondez pas les modes." code="ui/oidc.py ; db/schema.sql:user_session" />
      <Step title="2 · Quel espace ?" brief="owner_user_id, ou ancien espace partagé." detail="À chaque route, un identifiant tapé par un client est revérifié ; 404 ne révèle pas un espace privé à autrui." code="workspaces.py ; app.py ; db/schema.sql:workspace" tone="green" />
      <Step title="3 · Quelle source ou figure ?" brief="Le lien est lié à une réponse d’une conversation autorisée." detail="Connaître un figure_id ne suffit pas pour ouvrir son PNG : la route vérifie la conversation et la source citée." code="app.py:GET /chat/figure/{...} ; ui/conversation.py:_figure_refs" tone="green" />
      <Step title="4 · Quel texte afficher ?" brief="La réponse du modèle ne peut injecter HTML, liens ou images." detail="Les cartes source et figures sont construites par l’application depuis ses données ; elles ne sont pas des balises inventées par le modèle." code="ui/answer_format.py ; ui/templates/_sources.html" tone="amber" />
    </div>
  </Diagram>;
}

export function CodeDiagram({ slide }: { slide: number }) {
  if (slide === 5) return <Rag />;
  if (slide === 7) return <UseCases />;
  if (slide === 8) return <Architecture />;
  if (slide === 9) return <Ingestion />;
  if (slide === 10) return <Agent />;
  if (slide === 11) return <Figures />;
  if (slide === 14) return <Evaluation />;
  if (slide === 20) return <Security />;
  if (slide === 22) return <Sequence />;
  if (slide === 23) return <Schema />;
  if (slide === 24) return <Contracts />;
  return null;
}
import type { ReactNode } from 'react';
