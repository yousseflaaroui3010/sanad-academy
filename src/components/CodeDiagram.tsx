type StepProps = {
  title: string;
  brief: string;
  detail: string;
  // The function (or table) that does this step, and how it works in plain words.
  fn: string;
  how: string;
  tone?: 'blue' | 'green' | 'amber' | 'slate';
  shape?: 'decision' | 'normal';
};

const colors = {
  blue: 'border-blue-400 bg-blue-50',
  green: 'border-emerald-400 bg-emerald-50',
  amber: 'border-amber-400 bg-amber-50',
  slate: 'border-slate-400 bg-slate-50',
};

function Step({ title, brief, detail, fn, how, tone = 'blue', shape = 'normal' }: StepProps) {
  return <details className={`min-w-0 rounded-xl border-2 p-3 text-sm ${colors[tone]}`}>
    <summary className="cursor-pointer font-bold leading-snug focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
      {shape === 'decision' && <span aria-hidden="true" className="me-2 text-blue-900">◇</span>}{title}
      <span className="mt-1 block font-normal">{brief}</span>
    </summary>
    <p className="mt-3 border-t border-current/20 pt-2 leading-relaxed">{detail}</p>
    <div className="mt-2 rounded-lg bg-white/70 p-2 leading-relaxed">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Dans le code</p>
      <p><code className="break-words font-mono text-xs font-bold">{fn}</code></p>
      <p className="mt-1">{how}</p>
    </div>
  </details>;
}

function Diagram({ title, source, children }: { title: string; source: string; children: ReactNode }) {
  return <figure className="rounded-2xl border border-slate-300 bg-white p-5 sm:p-6">
    <figcaption className="text-lg font-bold">{title}</figcaption>
    <p className="mt-1 text-xs text-slate-700">Reprend {source}. Ouvrez une boîte : vous verrez pourquoi l’étape existe, puis la fonction qui la fait et comment elle marche.</p>
    <div className="mt-5 space-y-3">{children}</div>
  </figure>;
}

function Down({ label }: { label?: string }) {
  return <div className="text-center text-sm font-semibold text-blue-900"><span aria-hidden="true">↓</span>{label && <span className="ms-2">{label}</span>}</div>;
}

function Architecture() {
  return <Diagram title="Figure 4.1 · Les frontières de Sanad" source="la diapositive 8 et le rapport §4.1">
    <Step title="Navigateur" brief="On choisit un espace, on synchronise ou on pose une question." detail="Le navigateur ne voit que des pages. Il ne touche jamais directement aux bases de données." fn="create_app()" how="Démarre le serveur : prépare la base, recharge les modèles de recherche en mémoire, installe les protections (connexion, limites de débit), puis déclare toutes les pages." tone="slate" />
    <Down label="page / demande" />
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Connexion Keycloak" brief="Savoir qui demande, et si l’espace lui appartient." detail="Keycloak vérifie l’identité. Sanad vérifie ensuite, à chaque page, le propriétaire de l’espace." fn="auth_login() puis auth_callback()" how="La première envoie la personne vers Keycloak avec un code secret. La seconde vérifie ce code au retour, valide le jeton, puis crée la session de la personne." tone="amber" />
      <Step title="Un seul programme Python" brief="Les écrans et l’API passent par le même moteur." detail="Une page ne refait pas la recherche elle-même : elle appelle le même service que l’API." fn="may_see() et may_manage()" how="Avant chaque action : voir un espace est permis s’il est à moi ou partagé ; le modifier n’est permis que s’il est à moi." />
    </div>
    <Down label="trois activités dans l’application" />
    <div className="grid gap-3 sm:grid-cols-3">
      <Step title="Synchroniser" brief="Fichiers → index + sections + figures." detail="Seuls les fichiers nouveaux ou modifiés sont retraités." fn="sync_workspace()" how="Vérifie que l’espace existe, refuse si une autre synchronisation tourne déjà, traite les fichiers un par un, puis enregistre le bilan." />
      <Step title="Répondre" brief="Chercher, vérifier, charger, rédiger ou refuser." detail="Les étapes et leurs embranchements sont écrits une fois, comme un organigramme." fn="build_graph()" how="Relie neuf étapes : résumer, reformuler, clarifier, chercher, vérifier, charger les sections, reformuler encore, répondre, refuser. Trois carrefours choisissent la suite." tone="green" />
      <Step title="Évaluer" brief="Rejouer les 60 questions et dire si la version passe." detail="Le rapport garde le résultat de chaque question ; la porte compare G1, G2 et G3." fn="run_evaluation() puis evaluate_report()" how="La première pose les 60 questions et fait noter chaque réponse. La seconde relit le rapport et vérifie les trois seuils." tone="slate" />
    </div>
    <Down label="quatre rangements, chacun pour une raison" />
    <div className="grid gap-2 sm:grid-cols-2">
      <Step title="SQLite · le registre" brief="Espaces, fichiers, rapports, conversations." detail="Il sait à qui appartient quoi. Il ne cherche pas par le sens." fn="table workspace" how="Chaque espace a une colonne owner_user_id : le numéro de son créateur. Vide, elle signifie un ancien espace partagé, lisible par tous, modifiable par personne." tone="slate" />
      <Step title="Qdrant · l’index" brief="Les petits passages, un index par espace." detail="Une question dans l’espace RH ne peut pas ramener un passage d’un autre espace." fn="collection_name()" how="Fabrique le nom de l’index d’un espace : « ws_ » + numéro de l’espace + « _children ». Chaque espace a donc son propre index." />
      <Step title="JSON · les sections" brief="Le texte complet derrière chaque parent_id." detail="Le petit passage sert à trouver ; la section complète sert à répondre." fn="get_parent()" how="Ouvre le fichier de la section demandée. S’il est absent, abîmé ou d’un autre numéro, il le signale au lieu de renvoyer un texte faux." tone="green" />
      <Step title="PNG · les figures" brief="Les images et leur légende, rangées à part." detail="Une figure trouvée par la recherche renvoie vers son image et sa section." fn="save_figures()" how="Pour chaque figure, écrit deux fichiers dans le dossier de l’espace : l’image (.png) et sa fiche (.json) avec légende, page et contexte." tone="green" />
    </div>
    <div className="rounded-xl border-2 border-dashed border-amber-500 p-3 text-sm"><strong>Ce qui sort sur le réseau :</strong> en mode cloud, Gemini reçoit la question et les passages, et l’image d’une figure à décrire. En mode local (Ollama), rien ne sort. <span className="mt-1 block"><code className="font-mono text-xs font-bold">_vision_model()</code> : choisit le modèle qui décrit les images. Pas de description demandée, ou pas de clé, ou pas de modèle local configuré : il ne renvoie rien, et aucune image ne part.</span></div>
  </Diagram>;
}

function Ingestion() {
  return <Diagram title="Figure 4.2 · Un document prend deux chemins" source="la diapositive 9 et le rapport §4.2">
    <Step title="Fichier du dossier" brief="PDF, Word, PowerPoint, texte ou Markdown." detail="Chaque fichier appartient à un espace ; tout ce qu’on en tire est rangé sous le numéro de cet espace." fn="_run()" how="Liste les changements, puis traite chaque fichier dans son propre bloc : un fichier qui plante est noté « en échec », les autres continuent." tone="slate" />
    <Down />
    <Step title="Le fichier a-t-il changé ?" brief="On compare son empreinte à celle du dernier Sync." detail="L’empreinte est un code calculé sur le contenu : une lettre changée, et le code change." fn="detect_changes()" how="Calcule l’empreinte SHA-256 et la taille de chaque fichier. Pas vu avant → nouveau ; même empreinte → inchangé ; sinon → modifié. Disparu du dossier → retiré." shape="decision" />
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Inchangé → rien à refaire" brief="Une simple ligne dans le bilan." detail="C’est pour ça qu’un second Sync sans changement prend 0,09 s." fn="_run()" how="Pour un fichier inchangé, écrit seulement la ligne « inchangé » dans le rapport, sans le relire." tone="green" />
      <Step title="Modifié → effacer l’ancien" brief="D’abord supprimer ses anciens passages." detail="Sinon Sanad pourrait citer un texte qui n’est plus dans le fichier." fn="delete_document()" how="Retrouve les sections de ce fichier, supprime ses passages de l’index, puis ses sections, puis ses figures." tone="amber" />
    </div>
    <Down label="le fichier à traiter se sépare" />
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-3 rounded-xl border border-blue-300 p-3">
        <h3 className="font-bold text-blue-950">Branche texte</h3>
        <Step title="Convertir" brief="Retrouver le texte et les titres." detail="Les titres comptent : c’est eux qui donneront « Article 14 » comme source." fn="convert_file()" how="Choisit l’outil selon l’extension : PDF (avec lecture des pages scannées si activée), Word et PowerPoint, texte. Fichier vide → ignoré ; erreur → échec avec la raison." />
        <Step title="Découper" brief="Des sections (parents), puis des petits passages (enfants)." detail="Petit pour trouver précisément, grand pour répondre avec le contexte." fn="chunk_document()" how="Coupe aux titres, regroupe les sections de moins de 2 000 caractères, recoupe celles de plus de 4 000. Puis chaque section en passages de 500 caractères qui se chevauchent de 100." />
        <Step title="Deux façons de ranger" brief="Par le sens (E5) et par les mots exacts (BM25)." detail="Le sens trouve « licenciement » pour « renvoi » ; les mots exacts trouvent « Article 14 »." fn="embed_children()" how="Ajoute « passage: » devant chaque passage, puis le transforme en 768 nombres qui résument son sens. La question recevra « query: »." />
      </div>
      <div className="space-y-3 rounded-xl border border-emerald-300 p-3">
        <h3 className="font-bold text-emerald-950">Branche figures</h3>
        <Step title="Trier les pages" brief="Ne pas analyser un logo ou une page scannée." detail="Une page de texte seul ne coûte rien de plus." fn="_pdf_page_plan()" how="Une image présente sur 3 pages ou plus est une décoration. Une page avec des traits ou des courbes est un schéma. Une image qui couvre 2 à 70 % de la page est une photo." tone="green" />
        <Step title="Schéma ou photo ?" brief="Schéma → un modèle trouve ses bords ; photo → on connaît déjà son cadre." detail="Une grille de neuf photos reste neuf photos." fn="extract_figures()" how="Envoie les pages de schémas à Docling, qui trace une boîte autour de chaque figure, et découpe directement les photos. Si ça échoue, le texte du fichier est quand même gardé." tone="green" />
        <Step title="Rattacher la figure au texte" brief="La légende et les mots voisins trouvent sa section." detail="Sans section retrouvée, pas de fiche : on ne citerait pas un texte sans rapport." fn="_figure_cards()" how="Cherche la section qui contient la légende, ou les 60 caractères juste avant ou après la figure. Trouvée → une fiche de recherche ; sinon → rien." tone="green" />
      </div>
    </div>
    <Down label="ranger dans cet ordre, avant de rendre cherchable" />
    <div className="grid gap-3 sm:grid-cols-3">
      <Step title="Sections" brief="Les textes complets." detail="Écrites avant l’index, pour ne jamais trouver un passage sans sa section." fn="save_parents()" how="Écrit un fichier par section, d’abord sous un nom provisoire, puis le renomme : un fichier n’est jamais à moitié écrit." tone="slate" />
      <Step title="Figures" brief="Images et fiches." detail="Une figure cherchable pointe toujours vers une image déjà enregistrée." fn="save_figures()" how="Écrit l’image et sa fiche dans le dossier de l’espace." tone="slate" />
      <Step title="Index Qdrant" brief="Les passages et les fiches de figures." detail="Le texte du document sert de preuve ; la description générée sert seulement à chercher." fn="upsert_children()" how="Range chaque passage avec ses deux « empreintes de sens » et une étiquette : son parent_id, son fichier, sa section et son texte." tone="blue" />
    </div>
  </Diagram>;
}

function Agent() {
  return <Diagram title="Figure 4.4 · Pourquoi une question peut finir de trois façons" source="la diapositive 10 et le graphe de l’agent">
    <Step title="Question → résumer la conversation" brief="Comprendre « Et pour les cadres ? » grâce aux questions d’avant." detail="Le résumé est transmis à l’étape suivante." fn="make_summarize()" how="Donne au modèle l’ancien résumé et les derniers échanges, et garde le nouveau résumé." />
    <Down />
    <Step title="Claire ou ambiguë ?" brief="Claire → une ou plusieurs recherches ; ambiguë → une question de précision." detail="La clarification est une vraie troisième issue, avant toute recherche." fn="make_rewrite() puis route_after_rewrite()" how="La première demande au modèle s’il faut une précision ; sinon, elle écrit de 1 à 5 recherches. La seconde choisit : clarifier ou chercher." shape="decision" />
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Ambiguë → clarification" brief="On pose une question et on s’arrête là." detail="La conversation reprend quand la personne précise." fn="make_clarify()" how="Renvoie la question de précision comme réponse, puis le graphe s’arrête." tone="amber" />
      <Step title="Claire → chercher" brief="Sens + mots exacts, dans l’espace choisi seulement." detail="Chaque recherche est notée dans la trace, avec les fichiers trouvés." fn="make_retrieve()" how="Lance chaque recherche, puis mélange les résultats en les prenant à tour de rôle, sans doublon, 5 au plus." tone="blue" />
    </div>
    <Down />
    <Step title="Vérifier les petits passages" brief="Répondent-ils vraiment à la question ?" detail="Aucun passage : inutile de demander au modèle, c’est non." fn="make_grade()" how="Si la recherche n’a rien trouvé → « non » directement. Sinon, le modèle lit les passages et répond pertinent ou hors sujet. Une réponse illisible est une erreur, pas un « non »." shape="decision" />
    <div className="grid gap-3 sm:grid-cols-3">
      <Step title="Non, essais restants ↩" brief="Reformuler, puis chercher encore." detail="Le nombre d’essais est lu dans la configuration (2 par défaut)." fn="route_after_grade()" how="Pertinent → charger les sections. Sinon, compte les reformulations déjà faites dans la trace : moins que la limite → reformuler ; sinon → refuser." tone="blue" />
      <Step title="Non, essais épuisés" brief="Refuser et montrer les recherches faites." detail="Aucun modèle ne décide du refus : c’est une sortie prévue du graphe." fn="make_refuse()" how="Écrit le refus, sans aucune source, et note dans la trace combien de recherches ont été faites." tone="amber" />
      <Step title="Oui → charger les sections" brief="Une seule lecture par section, même si 4 passages en viennent." detail="Aucune section lisible → refus ; 4 sur 5 → on répond avec les 4." fn="make_fetch_parents()" how="Demande chaque parent_id une seule fois et note « chargé 4 sur 5 ». Si une section non demandée arrive, il s’arrête : elle pourrait venir d’un autre espace." tone="green" />
    </div>
    <Down label="si des sections sont lisibles" />
    <Step title="Rédiger → réponse avec sources, ou refus" brief="Le modèle ne lit que les sections chargées." detail="Les sources viennent des passages trouvés, jamais du texte écrit par le modèle." fn="make_answer()" how="Garde les passages dont la section a été lue, fait rédiger le modèle, puis construit les sources à partir de ces passages. Si le modèle répond NOT_COVERED → refus." tone="green" />
  </Diagram>;
}

function Figures() {
  return <Diagram title="Figure 4.3 · Une figure : une image, un contexte, et une limite de preuve" source="la diapositive 11 et le rapport §4.2.5">
    <Step title="La page a-t-elle un visuel ?" brief="On évite d’analyser le texte seul, les logos répétés et les pages scannées." detail="Si l’extraction des figures échoue, le texte du fichier est quand même indexé." fn="_pdf_page_plan()" how="Classe chaque page : décoration (image sur 3 pages ou plus), schéma (traits, courbes), photo (image couvrant 2 à 70 % de la page) ou rien." shape="decision" />
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Un schéma en traits" brief="Docling trouve ses bords ; on découpe l’original." detail="Un schéma n’a pas de cadre dans le PDF : il faut un modèle de mise en page pour savoir où il finit." fn="_docling_candidates() puis _render_pdf_regions()" how="Docling propose des boîtes et écarte logos, signatures et QR codes. Puis on rejette les boîtes vides ou dans les marges, et on découpe l’image à 150 dpi." tone="blue" />
      <Step title="Une photo" brief="Le PDF connaît déjà son cadre exact." detail="Ce chemin direct garde neuf photos séparées au lieu d’une grande image." fn="_photo_raws()" how="Sur chaque page, découpe chaque photo non répétée, puis récupère sa légende ou l’étiquette au-dessus, et le texte autour." tone="green" />
    </div>
    <Down label="légende, section, texte autour" />
    <Step title="Décrire l’image, si un modèle est disponible" brief="Cloud : Gemini regarde l’image. Local : seulement si un modèle d’images est configuré." detail="Une image déjà décrite n’est pas payée deux fois. Si la description échoue, la figure est gardée." fn="describe_figure()" how="Envoie l’image et son contexte (page, titre, légende) au modèle et reçoit 2 à 4 phrases. En cas d’erreur, renvoie un texte vide : la synchronisation continue." tone="slate" />
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Texte pour chercher" brief="Légende + contexte + description générée." detail="Aide à retrouver l’image avec des mots absents de la légende." fn="Figure.card_text()" how="Prend le texte du document, et ajoute « Description générée : … » à la fin." tone="blue" />
      <Step title="Texte pour prouver" brief="Légende + contexte, seulement ce qui vient du document." detail="La description inventée par un modèle n’atteint jamais le vérificateur ni le rédacteur." fn="Figure.document_text()" how="Assemble « Figure : légende », « Section : titre », le texte avant et le texte après. Rien de généré." tone="green" />
    </div>
    <div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-3 text-sm"><strong>Limite réelle :</strong> une photo qu’aucune section ne permet de situer n’est pas indexée. Et une image seule ne suffit pas à affirmer un détail que le texte ne dit pas. Le score 39/40 ne mesure pas les figures.</div>
  </Diagram>;
}

function Rag() {
  return <Diagram title="Figure 2.1 · Préparer une fois, interroger souvent" source="la diapositive 5 et le rapport §2.2–2.3">
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-3 rounded-xl border border-blue-300 p-3">
        <h3 className="font-bold">Avant la question · Synchroniser</h3>
        <Step title="Document → texte" brief="PDF, Word, PowerPoint ou texte." detail="Les titres doivent survivre : ils nomment les sources." fn="convert_file()" how="Choisit l’outil de lecture selon le type de fichier et renvoie le texte avec ses titres, ou la raison de l’échec." />
        <Step title="Texte → sections et passages" brief="Chercher court, répondre avec plus de contexte." detail="Chaque passage garde le numéro de sa section (parent_id)." fn="chunk_document()" how="Coupe le texte aux titres en sections, puis chaque section en passages de 500 caractères qui se chevauchent de 100." />
        <Step title="Passages → index" brief="Rangés par le sens et par les mots." detail="Deux rangements par passage, dans l’index de cet espace." fn="upsert_children()" how="Enregistre chaque passage avec son vecteur de sens, sa liste de mots BM25, son fichier, sa section et son parent_id." />
      </div>
      <div className="space-y-3 rounded-xl border border-emerald-300 p-3">
        <h3 className="font-bold">À chaque question · l’agent</h3>
        <Step title="Question → recherches" brief="La conversation aide à préciser ou découper la question." detail="La recherche se fait dans l’index de l’espace choisi, et nulle part ailleurs." fn="search()" how="Transforme la question en vecteur de sens (préfixe « query: ») et en mots BM25, cherche des deux façons, puis fusionne les deux classements (RRF)." tone="green" />
        <Step title="Résultats → vérification" brief="Le passage aide-t-il vraiment à répondre ?" detail="Parler du même sujet ne suffit pas. Sinon : reformuler, puis refuser." fn="make_grade()" how="Aucun passage → non. Sinon le modèle lit les passages et répond pertinent ou hors sujet." tone="green" />
        <Step title="Section → réponse" brief="Le modèle reçoit la section complète et son nom." detail="Les sources viennent des passages lus, jamais de noms inventés par le modèle." fn="make_answer()" how="Fait rédiger à partir des sections lues, puis attache une source par fichier et section, sans doublon." tone="green" />
      </div>
    </div>
    <div className="rounded-xl border border-dashed border-blue-400 p-3 text-center text-sm font-semibold">L’index préparé à gauche nourrit la recherche à droite. Sans synchronisation, ce n’est pas « pas de réponse » : c’est « pas encore d’index ».</div>
  </Diagram>;
}

function Sequence() {
  return <Diagram title="Figure 3.2 · Le trajet d’une vraie question" source="l’annexe C">
    <ol className="space-y-3 border-s-2 border-blue-400 ps-4">
      <li><Step title="1. Personne → écran" brief="Question + espace + conversation." detail="L’écran montre toujours l’espace choisi." fn="may_see()" how="Avant tout, vérifie que la personne a le droit de voir cet espace : le sien, ou un ancien espace partagé." /></li>
      <li><Step title="2. Écran → agent" brief="Transmettre la question et l’historique." detail="Les pages et l’API appellent le même service." fn="ask()" how="Nettoie la question (1 à 2 000 caractères), lance le graphe, puis emballe le résultat dans un objet Answer avec sa trace." /></li>
      <li><Step title="3. Agent ⇄ modèle" brief="Résumer, puis décider : clarifier ou chercher." detail="Une clarification s’arrête avant la recherche. Sinon, 1 à 5 recherches." fn="make_summarize() et make_rewrite()" how="L’une résume la conversation ; l’autre demande une précision ou écrit les recherches." tone="amber" /></li>
      <li><Step title="4. Agent ⇄ index ⇄ modèle" brief="Chercher, puis juger pertinent ou hors sujet." detail="La trace garde chaque recherche et les fichiers touchés. 2 reformulations au plus par défaut." fn="make_retrieve() et make_grade()" how="L’une lance les recherches et mélange les résultats ; l’autre fait juger les passages." /></li>
      <li><Step title="5. Agent ⇄ sections" brief="Si c’est pertinent, lire la section derrière chaque passage." detail="Une section introuvable n’est pas citée ; aucune section lisible → refus." fn="make_fetch_parents()" how="Charge chaque section une seule fois et note combien ont pu être lues." tone="green" /></li>
      <li><Step title="6. Agent → écran → personne" brief="Réponse avec sources, refus avec recherches, ou clarification." detail="Le type de réponse décide de l’affichage." fn="message_for()" how="Transforme la réponse en message d’écran : texte, cartes sources avec passage surligné, figures citées, recherches faites." tone="green" /></li>
    </ol>
  </Diagram>;
}

function Schema() {
  return <Diagram title="Figure 4.5 · Les tables de SQLite, puis les deux rangements à côté" source="l’annexe D">
    <Step title="workspace (espace)" brief="Un espace appartient à son créateur ; vide = ancien espace partagé." detail="Supprimer un espace supprime ce que Sanad en a tiré, jamais les fichiers d’origine." fn="table workspace · owner_user_id" how="Contient le numéro du créateur. Seul lui peut modifier l’espace. Vide : tout le monde peut le lire, personne ne peut le modifier." />
    <Down label="workspace_id rattache toutes les tables suivantes à leur espace" />
    <div className="grid gap-3 sm:grid-cols-3">
      <Step title="document" brief="Un fichier : nom, empreinte, état." detail="L’empreinte détecte les changements." fn="table document" how="content_hash = empreinte SHA-256 + taille. status vaut actif, en échec, ignoré ou retiré. Un même nom ne peut exister qu’une fois par espace." tone="slate" />
      <Step title="sync_run → sync_item" brief="Une synchronisation, et une ligne par fichier." detail="Un fichier cassé n’efface pas le bilan des autres." fn="SyncReport" how="Garde l’heure de début et de fin, et une ligne par fichier : ajouté, modifié, inchangé, en échec, retiré ou ignoré, avec la raison." tone="slate" />
      <Step title="eval_run → eval_result" brief="Un examen, et une ligne par question notée." detail="Le rapport complet est gardé à part, en fichier." fn="run_evaluation()" how="Enregistre chaque résultat dès qu’il est noté : une panne au milieu laisse un rapport partiel, pas un rapport vide." tone="slate" />
      <Step title="app_user → user_session" brief="La personne connectée et sa session." detail="Sanad ne garde jamais le mot de passe." fn="auth_callback()" how="Après la connexion Keycloak, enregistre la personne et ouvre sa session, puis pose un cookie dans le navigateur." tone="slate" />
      <Step title="conversation" brief="Plusieurs conversations par personne et par espace." detail="Supprimer un espace supprime aussi ses conversations." fn="table conversation" how="Une ligne par conversation : son auteur, son espace, son titre, et tout l’échange enregistré en un bloc." tone="slate" />
    </div>
    <Down label="hors de SQLite : parent_id relie ces deux rangements" />
    <div className="grid gap-3 sm:grid-cols-3">
      <Step title="Qdrant" brief="Les petits passages et les fiches de figures." detail="Chaque passage porte une étiquette : parent_id, fichier, section, texte." fn="upsert_children()" how="Range chaque passage avec son vecteur de sens, ses mots BM25 et son étiquette." tone="blue" />
      <Step title="Sections JSON" brief="La section entière derrière un parent_id." detail="On trouve le petit passage, on lit la grande section." fn="get_parent()" how="Ouvre le fichier de la section ; s’il est occupé, réessaie trois fois ; s’il est abîmé, le signale." tone="green" />
      <Step title="Figures PNG + fiche" brief="L’image et son contexte, hors de la base." detail="L’image ne s’ouvre que depuis une conversation qui l’a citée." fn="save_figures()" how="Écrit l’image et sa fiche dans le dossier de l’espace." tone="green" />
    </div>
  </Diagram>;
}

function Contracts() {
  return <Diagram title="Figure 4.7 · Les objets qui passent d’une étape à l’autre" source="l’annexe E">
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Child → SearchHit" brief="Un petit passage, puis le résultat de recherche qui le représente." detail="Le texte qui arrive au vérificateur vient du document, pas d’une description générée." fn="Child / SearchHit" how="Child = le passage rangé (texte, parent_id, fichier, section). SearchHit = ce que la recherche renvoie : les mêmes informations plus un score, et un figure_id si c’est une figure." />
      <Step title="Parent" brief="La section entière, retrouvée par son parent_id." detail="Quatre passages de la même section ne demandent qu’une lecture." fn="Parent" how="Une section : son numéro, son texte complet, son fichier et son étiquette. Le numéro est calculé à partir du fichier et de la position, donc il reste le même à chaque Sync." tone="green" />
      <Step title="Answer" brief="Le résultat final : type, texte, sources, trace." detail="Une réponse sans source ne peut pas être fabriquée." fn="Answer.__post_init__()" how="Vérifie l’objet dès sa création : texte vide → erreur ; type « réponse » sans aucune source → erreur. Il faut alors passer par le refus." tone="green" />
      <Step title="SyncReport → SyncItemReport" brief="Le bilan d’une synchronisation, une ligne par fichier." detail="Un fichier en échec n’efface pas les lignes déjà écrites." fn="SyncReport" how="Donne toujours les six compteurs (ajouté, modifié, inchangé, en échec, retiré, ignoré), même à zéro, et la raison de chaque ligne." tone="slate" />
    </div>
  </Diagram>;
}

function UseCases() {
  return <Diagram title="Figure 3.1 · Deux usages, et une seule personne peut faire les deux" source="la diapositive 7 et le rapport §3.1">
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="Préparer un espace" brief="Créer → déposer des fichiers → synchroniser → lire le bilan." detail="Celui qui crée un espace en est propriétaire. Il n’y a pas de rôle d’administrateur." fn="create_workspace()" how="Nettoie le nom, vérifie le dossier, puis enregistre l’espace avec le numéro de son créateur. Un nom déjà pris est refusé." />
      <Step title="Interroger cet espace" brief="Choisir → poser la question → réponse ou refus → ouvrir la source." detail="On peut interroger ses espaces et les anciens espaces partagés." fn="ask()" how="Lance l’agent sur la question, dans l’espace choisi, et renvoie une réponse, un refus ou une question de précision." tone="green" />
    </div>
    <Down label="la frontière entre deux personnes" />
    <Step title="Même adresse, autre numéro d’espace ?" brief="Le serveur revérifie le propriétaire ; l’espace privé d’un autre n’apparaît pas." detail="Cacher un bouton ne suffit pas. Et l’index est séparé par espace." fn="may_manage()" how="Autorise une modification seulement si le propriétaire de l’espace est la personne connectée. Sinon, la page répond comme si l’espace n’existait pas." tone="amber" shape="decision" />
    <p className="text-sm text-slate-700">Salma (RH) et Yassine (manuels) sont deux exemples de besoins, pas deux comptes avec des droits différents.</p>
  </Diagram>;
}

function Evaluation() {
  return <Diagram title="60 questions gelées → deux façons de juger → trois seuils" source="la diapositive 14 et le rapport §6.1–6.3">
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="40 questions couvertes · G1" brief="La réponse est dans les textes de référence." detail="Le juge reçoit la question, la réponse et les sections lues par le rédacteur." fn="LLMJudgeScorer" how="Demande au modèle deux notes entre 0 et 1 : appui sur les sections, et réponse à la question. La ligne réussit seulement si l’appui vaut 1." />
      <Step title="20 questions hors documents · G2" brief="Le bon résultat est un refus." detail="Ces questions ressemblent aux autres, pour que l’examen ne soit pas trop facile." fn="run_evaluation()" how="Pour une question hors documents, pas de juge : la ligne réussit si et seulement si Sanad a refusé." tone="amber" />
    </div>
    <Down label="G3 regarde chaque réponse donnée" />
    <Step title="Sources obligatoires" brief="Chaque réponse porte au moins une source." detail="Le code empêche déjà une réponse sans source ; G3 le vérifie sur le vrai rapport." fn="Answer.__post_init__()" how="Refuse de créer une réponse de type « réponse » qui n’a aucune source." tone="green" />
    <Down label="la porte relit le rapport enregistré" />
    <Step title="G1 ≥ 36/40 ET G2 = 20/20 ET G3 = 100 %" brief="Un seul seuil raté → version bloquée." detail="La porte ne rappelle pas le modèle et ne coûte rien : elle relit le rapport." fn="evaluate_report()" how="Vérifie que le rapport est complet et suit les 60 questions dans l’ordre, puis calcule G1 (au moins 90 %), G2 (tous les refus) et G3 (toutes les sources)." tone="slate" />
    <p className="border-s-4 border-amber-500 ps-3 text-sm">Ce juge n’est pas RAGAS : la bibliothèque prévue ne s’installait pas avec nos versions. Un juge de la même famille que le modèle noté peut rater une erreur qu’ils ont en commun.</p>
  </Diagram>;
}

function Security() {
  return <Diagram title="Annexe A · Quatre verrous, pas seulement un écran de connexion" source="la diapositive 20 et le rapport §4.7">
    <div className="grid gap-3 sm:grid-cols-2">
      <Step title="1 · Qui parle ?" brief="Keycloak donne l’identité ; Sanad garde une session." detail="Sanad ne reçoit jamais le mot de passe." fn="auth_callback()" how="Au retour de Keycloak : compare le code secret, échange le code contre un jeton, vérifie que le jeton est actif, puis ouvre la session." />
      <Step title="2 · Quel espace ?" brief="Le sien, ou un ancien espace partagé." detail="Un numéro tapé dans l’adresse est revérifié à chaque page." fn="may_see() et may_manage()" how="Voir : espace à moi ou partagé. Modifier : espace à moi seulement. Sinon, réponse « introuvable »." tone="green" />
      <Step title="3 · Quelle source ou figure ?" brief="Un lien ne s’ouvre que depuis la conversation qui l’a reçu." detail="Connaître le numéro d’une figure ne suffit pas." fn="figure_image()" how="Deux contrôles, sinon « introuvable » : la conversation est à moi, et cette figure a bien été citée dans une de ses sources." tone="green" />
      <Step title="4 · Quel texte afficher ?" brief="Le texte du modèle ne peut pas ajouter de HTML, de liens ou d’images." detail="Les cartes sources et les figures sont construites par l’application, pas par le modèle." fn="render_answer()" how="Met en forme la réponse (gras, listes, tableaux) mais désactive les images, les liens et le HTML." tone="amber" />
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
