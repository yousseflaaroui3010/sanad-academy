# Handoff: report and presentation changes (24 Sept 2026, defense 26 Sept)

Work paused because of low battery. This file holds the request, the plan, what is done,
and every fact already checked, so another session can continue without the old chat.

## Where the files are

- **Documents (NOT in this public repo, on purpose):** `OneDrive/Documents/SANAD/handoff-drafts/`
  - `presentation_v2_DRAFT.pptx`: the edited deck, 31 slides, **not final** (see "Left").
  - `presentation_ORIGINAL.pptx`, `rapport_ORIGINAL.docx`: untouched copies of
    `Downloads/presentationkharia.pptx` and `Downloads/Page1_PFA.docx` (the report,
    pasted into the cover-page file with the ENSA Fès jury).
  - `report.txt`, `slides.txt`: plain-text dumps with paragraph indexes (from `scripts/dump.py`).
- **This folder:** `scripts/` (build and render tools), `drafts/usecase.png` (new diagram).
  `drafts/timeline.png` is **rejected** by the user; do not use it.

## The request (user's words, summarised)

1. Remove the admin role from workspaces: it no longer exists.
2. Fix the dates: research/study started in **March 2026**, coding in **April 2026**. The
   project was official from the start. From **20 July** they worked professionally as a
   team: GitHub, plan, sprints, a task list for each of them, delivery by **versions**.
   Do NOT present April–July as "first trials" and July as an "official start" (user
   rejected that framing and the Gantt chart).
3. Remove internal jargon the jury does not know (ST-xx, ADR, PRD, BUILD-STATE,
   branch names). Explain the teamwork only very briefly, in a section that is
   **easy to remove** (report and slides). Do not explain code syntax.
4. Show **the features in each version** (release format).
5. **Problems met and their technical fixes**, several of them, **slides only**
   (removable). Include "what if we had not…" cases (no `parent_id`, workspace not
   tied to its owner) and problems that could still happen.
6. Add a business view (report and slides): functional and non-functional requirements,
   costs (real Railway usage), storage, deployment, a recommended hosting setup for
   private data, roles and permissions, ROI, time to market, and the jury's likely
   business questions. Pitch Sanad as a real product.
7. Research with care: every number traced to an official source, say what is estimated.

## Done (in `presentation_v2_DRAFT.pptx`)

Slide order: 1 Titre · 2 Plan · 3 Problème · 4 Objectifs · 5 État de l'art ·
6 Conduite du projet (OPTIONAL) · 7 Besoins · 8 Architecture · 9 Index · 10 Répondre ·
11 Figures · 12 Produit · **13 Les versions (NEW)** · 14 Démonstration ·
**15 Problèmes rencontrés (NEW, OPTIONAL)** · **16 Et si… (NEW, OPTIONAL)** ·
**17 Exigences retenues (NEW)** · **18 Ce que Sanad coûte (NEW)** ·
**19 Données privées : où faire tourner le modèle ? (NEW)** · **20 Sanad comme produit (NEW)** ·
21 Protocole · 22 Résultats · 23 Performances · 24 Limites · 25 Perspectives ·
26 Conclusion · 27–31 Annexes A–E.

- Plan (2): item 3 = Besoins et conception, 4 = Réalisation et démonstration,
  5 = Coûts et mise sur le marché. The optional slide 6 is not named in the plan.
- Objectifs (4): "fixées au lancement des sprints, avant de construire le produit".
- Conduite (6): Gantt image replaced by 4 native rows (Mars / Avril / 20 juillet / 12–19 sept).
  **User rejected the "premiers essais / lancement officiel" framing: reword rows 2 and 3**
  (e.g. "Avril 2026: début du code" and "Depuis le 20 juillet: travail d'équipe sur GitHub,
  plan, sprints, tâches, versions"). Stats kept (8 sprints, 146, 1 409, 5).
- Besoins (7): new use-case image (one "Utilisateur connecté" actor, owned-space actions
  grouped, no admin), texts rewritten, notes explain v3.0 roles removed in v3.1.
- Perspectives (25): "Un gestionnaire…" → "Des rôles par espace : propriétaire, éditeur, lecteur".
- Page numbers renumbered 2–31. Speaker notes written for every new slide (with likely jury Q&A).
- Rendered and checked visually: slides 6, 7, 13, 18. **Not yet checked: 2, 4, 15, 16, 17, 19, 20, 25.**

## Left

1. Visually check the remaining slides (render with `scripts/render.ps1` then `scripts/topng.py`).
   Fix any text overflow, especially 15, 16 and 19 (long card text).
2. Reword slide 6 rows 2–3 (see above), then re-run.
3. **The report** (`rapport_ORIGINAL.docx`) is not edited yet. Plan:
   - §1.1 (para "Le développement s'est déroulé du 20 juillet…"): new dates wording (March
     study, April code, from 20 July GitHub + plan + sprints + tasks + versions).
   - Intro "Organisation du rapport" and chapter 1 intro/conclusion: drop "notre façon de
     travailler" / "organisation en sprints" so the optional section can be deleted cleanly.
   - Delete §1.5 Méthodologie (ST-01…ST-55, "définition de terminé", branch name
     feat/S1-ST-17…, "registres de décisions"), §1.6.1 with the sprint table and the Gantt
     figure (Figure 1.1), and §1.7 Assurance qualité (covered in 5.7 and 6.3).
   - Move 1.8 Analyse des risques to 1.5 (table becomes 1.5; reword the row
     "Conflits entre branches… Un récit par branche…").
   - Add **1.6, OPTIONAL "Notre organisation à deux"** as the last section of chapter 1:
     short rhythm paragraph + "Qui a construit quoi" table (becomes 1.6). Put a Word comment
     on its heading saying how to delete it. Nothing else in the report should refer to it.
   - §1.4.4 table "Les versions publiées": list the features of each version; mention that
     3.0.0 had 3 roles (administrateur, curateur, lecteur) + admin page, removed in 3.1.0.
     Replace "demandes de changement écrites" with plain wording.
   - §3.1.1: no admin role. Two uses (préparer ses espaces / interroger), every signed-in
     person is equal and owns the spaces they create; old spaces are shared read-only.
     §3.5.1 "Le gestionnaire appuie…" → "La personne propriétaire de l'espace…".
     Replace Figure 3.1 image (`word/media/image7.png`) with `drafts/usecase.png`.
   - Tables "Limites" and "La suite du projet": "gestionnaire" → roles per space.
   - New **§5.8 Exploitation**: requirements summary, storage, real costs, model costs,
     deployment options, recommended hosting for private data, roles, ROI, time to market
     (same numbers as slides 17–20). Update chapter 5 conclusion.
   - Add bibliography entries [36]+ (sources below). Existing bug to mention to the user:
     text cites Promptfoo as [26] but [26] is the Code du travail.
   - Open in Word at the end: update the table of contents, list of tables and list of
     figures (all are automatic fields; caption numbers are typed text).
   - Save as a NEW file; never overwrite the original.
4. Tell the user: check the real Gemini spend in Google AI Studio (the project never logged
   tokens), and decide whether to keep optional slides 6, 15, 16 and report §1.6.
5. Slide 8 still says "Les documents ne sortent pas": false in cloud mode. Suggest a fix.

## Facts already checked (use these, do not re-invent)

**Project history**: repo `RAG_project_ENSA` first commit 20 July 2026 (public repo).
Tags: v1.0.0 12/09, v1.0.1 12/09, v2.0.0 13/09, v3.0.0 14/09, v3.1.0 19/09; figures merged 19/09 (#157).
Release features (from tag messages and `docs/release-notes-*.md`):
- 1.0.0: spaces, sync, sourced answers, refusal, clarification, memory, eval reports. G1 36/40.
- 1.0.1: 60 s timeout + 2 retries, warm-up at start, golden set v2. G1 37/40.
- 2.0.0: F-10 answer trace, F-11 PowerPoint, F-12 workspace routing, F-13 folder watching,
  F-14 Arabic RTL, F-15 feedback, F-16 OCR. G1 38/40.
- 3.0.0: Keycloak accounts with 3 roles (administrateur, curateur, lecteur) + admin page +
  grants, browser upload, streamed answers, quality dashboard, FR default + AR + EN. G1 38/40.
- 3.1.0: own workspaces (creator = owner, only they change it; old spaces shared read-only),
  space from a local folder, every chat kept, rate limits. **Removed: roles, admin page,
  /api/v1 when accounts are on.** G1 39/40. G2 20/20 and G3 100 % in every version.

**Railway (API, 24 Sept 2026)**, prices $20/vCPU-month, $10/GB RAM-month,
$0.15/GB storage-month, $0.05/GB egress (docs.railway.com/reference/pricing/plans).
- Meriem's first deployment `sanad` (since 6 Sept): ≈ $0.91 so far.
- Final deployment `sanad` on Youssef's account (since 15 Sept; sanad-web, keycloak, Postgres): ≈ $6.69.
  Total ≈ **$7.60**. Account plan: Pro ($20/month, includes $20 of usage).
- At rest: sanad-web ≈ 0.87 GB RAM, Keycloak ≈ 0.85 GB, Postgres ≈ 0.06 GB → ≈ 1.8 GB
  → **≈ $18/month** in memory. Peaks up to ~10 GB during figure syncs (16, 18–20 Sept).
  Volumes: app 1.1 GB, Keycloak Postgres 0.9 GB (≈ $0.30/month). Local dev `data/` = 36 MB.
- The Railway "estimated usage" figure (~$7/month) is a partial-period number; do not use it.

**Model prices (official pages, 24 Sept 2026)**
- Gemini 3.6 Flash: $0.75 in / $3.75 out per M tokens until 31 Dec 2026, then $1.50 / $7.50.
  Free tier exists (ai.google.dev/gemini-api/docs/pricing).
- Claude Haiku 4.5 $1 / $5; Sonnet 5 $2 / $10; Opus 5.5 $4 / $20
  (platform.claude.com/docs/en/about-claude/pricing). Claude 4.7+ tokenizer ≈ 30 % more tokens.
- Estimate per question (not measured): ~8 000 input + 500 output tokens →
  Gemini 3.6 Flash ≈ $0.008, Haiku 4.5 ≈ $0.011, Sonnet 5 ≈ $0.021 (≈ $0.027 with the new tokenizer).

**Data use**
- Gemini API terms (last modified 28 Apr 2026): free tier content is used to improve Google
  products, human reviewers may read it, and "Do not submit sensitive, confidential, or personal
  information to the Unpaid Services". Paid tier: prompts are not used to improve products.
- Anthropic (privacy.claude.com, updated 18 Aug 2026): "By default, we will not use your inputs
  or outputs from our commercial products to train our models" (exception: feedback the user sends).
- So the honest line is **free versus paid**, not Google versus Anthropic.
- Morocco, law 09-08 (cndp.ma/transfert-de-donnees-a-letranger): personal data may go abroad
  only in the listed cases (CNDP list of countries, consent, contract…) or with CNDP
  authorization (form F118), itself only granted after the processing is declared/authorized.

**Hosting**
- Ollama (ollama.com/library/stable-beluga): "7b models generally require at least 8GB of RAM".
  Local mode was never measured on the 60 questions; say so.
- Scaleway L4-1-24G GPU: €0.79/hour ≈ €575/month, before tax (scaleway.com/en/pricing/gpu).
- GitHub Actions is free for public repos on standard runners (docs.github.com billing page).
- Recommended plan (slide 19): search stays local always; public documents → paid cloud API;
  personal data → one shared GPU server (not a model on every PC); never the free tier;
  bring back roles per space (owner, editor, reader + org admin).

**ROI**: do not quote "2.5 hours a day searching" (IDC 2001) or McKinsey 2012 "19 %":
Martin White (26 May 2020) shows they are weak. Use break-even instead: ≈ $30/month
(hosting + 1 000 questions) → pays off after ~3 hours saved per month at $10/hour (labelled
hypothesis). Time to market (our estimate): pilot in 1 month, enterprise version in 3 months.

## How to rebuild the deck

Tools on the old laptop: Python `py` with python-docx, python-pptx, fitz; Word and PowerPoint for rendering.
`build_slides.py` expects `work.pptx` (original with 7 duplicated slides: slide17 ×5,
slide16 ×1, slide18 ×1, reordered as above; made with the pptx skill's `add_slide.py`).
Easier on a new machine: open `presentation_v2_DRAFT.pptx` and edit it directly.
