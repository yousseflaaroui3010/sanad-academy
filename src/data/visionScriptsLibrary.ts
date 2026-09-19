// Auto-generated Slide-by-Slide Gemini Vision Walkthrough Scripts
// Super dummy-friendly, lively, conversational English full of metaphors & emotion

export interface SlideVisionScript {
  slideId: string;
  spokenScript: string;
  visualHighlights: string[];
}

export const SLIDE_VISION_SCRIPTS: Record<string, Record<string, SlideVisionScript>> = {
  // Lesson 1.1: Two Architects & Two-Person Review Law
  '1-1': {
    metaphor: {
      slideId: 'metaphor',
      spokenScript: "Hey! Check out this awesome fighter jet cockpit on your screen! Imagine you and your best friend are flying a super-fast twin-seat jet. You're sitting in the front steering the wheel, and your friend is in the back checking the radar map. If you want to drop a parcel, you can't just press the button alone! Both of you have to turn your keys at the exact same second. That’s Rule 5! One person writes the code, and the other person tests it. No code goes live unless both say YES!",
      visualHighlights: ["Twin-Seat F-16 HUD", "Pilot 1 YL Reticle", "Pilot 2 MB Reticle", "Dual Keylock Matrix"]
    },
    situation: {
      slideId: 'situation',
      spokenScript: "Look at Slide 2! We call this the Situation Room. Picture this: graduation is right around the corner, and the clock is ticking fast! If someone sneaks in messy code without testing, the AI will make up fake laws in front of the professors and ruin everything. Stressful, right? That’s why we need rules!",
      visualHighlights: ["Left: Real Circumstances", "Right: High-Stakes Pressure", "Deadline Constraints"]
    },
    solution: {
      slideId: 'solution',
      spokenScript: "Slide 3 shows our secret formula! YL owns the engine and database, while MB checks the Moroccan law books and grades the answers. No cowboy moves allowed! If you change something big, both partners must sign the ticket. Simple, safe, and nobody steps on each other's toes!",
      visualHighlights: ["Rule 5 Sign-off Protocol", "Domain Ownership Division", "Zero Cowboy Commits"]
    },
    artifact: {
      slideId: 'artifact',
      spokenScript: "Look at Slide 4! This is what real software development looks like on GitHub! See those green checkmarks? That’s our robot checker proving that all 42 tests passed! And see that box with MB's name? Until MB clicks 'Approve', that big green button stays locked. Go ahead and click 'Merge pull request' yourself to see the magic happen!",
      visualHighlights: ["GitHub PR #42 Screen", "Passing CI Checks", "Rule 5 MB Approval Box", "Interactive Merge Button"]
    },
    alternative: {
      slideId: 'alternative',
      spokenScript: "Slide 5 has a fun slider! Drag it with your mouse. If you slide all the way to the left for pure speed, you move super fast, but you break things and crash! If you slide to the middle, you take just 15 minutes to double-check each other's work, saving you days of painful emergency fixing later!",
      visualHighlights: ["The Architect's Dilemma Slider", "Velocity vs Safety Trade-Off", "The Alternative Road"]
    },
    quiz: {
      slideId: 'quiz',
      spokenScript: "Time for a super quick 1-click quiz! Read the question on your screen: When can code merge into master under Rule 5? Tap the right answer and let's see some confetti!",
      visualHighlights: ["Interactive 1-Click Quiz", "Instant Visual Feedback", "XP Reward"]
    },
    mastery: {
      slideId: 'mastery',
      spokenScript: "Here's the one golden rule to remember forever: 'Always fly with a co-pilot! Two pairs of eyes keep the AI safe and stop silly mistakes before they happen.' Click 'Mark as Mastered', and let's jump to the next chapter!",
      visualHighlights: ["Golden Invariant Rule", "Mark as Mastered Button", "Next Chapter Jump"]
    }
  },

  // Lesson 1.2: 10,000-Foot System Blueprint
  '1-2': {
    metaphor: {
      slideId: 'metaphor',
      spokenScript: "Hey, look at Slide 1! Check out that futuristic factory conveyor belt! See how files slide right under that glowing cyan laser? The laser scans the digital fingerprint in one millisecond. If the file hasn't changed at all, it cruises right past without wasting any computer battery. Boom! Instant bypass!",
      visualHighlights: ["Factory Conveyor Belt", "SHA-256 Laser Scanner", "Fast 1ms Bypass", "Diverter Track"]
    },
    situation: {
      slideId: 'situation',
      spokenScript: "On Slide 2, here's the big problem we had to solve. Companies have super-secret papers they can't just upload to random internet websites. If you send confidential Moroccan legal papers to the public cloud, you leak company secrets. We had to build a brain that runs right on your own computer!",
      visualHighlights: ["Local-First Privacy Mandate", "Law 09-08 Compliance", "Cloud Leakage Risks"]
    },
    solution: {
      slideId: 'solution',
      spokenScript: "Slide 3 shows our four Lego blocks! A fast web waiter called FastAPI, an organized filing cabinet called SQLite, a super-smart search engine called Qdrant, and the AI brain called LangGraph. Because each block is separate, you can swap any piece out without breaking the rest of the tower!",
      visualHighlights: ["4 Decoupled Pillars", "FastAPI + SQLite WAL", "Qdrant Vector Database", "Hexagonal Isolation"]
    },
    artifact: {
      slideId: 'artifact',
      spokenScript: "Look at Slide 4! This is our live data cable in action! Watch the little glowing energy balls travel from left to right. Files drop in, get laser-scanned, get sliced into bite-sized puzzle pieces, and the AI inspects every receipt before showing you the answer!",
      visualHighlights: ["Animated SVG Data Cable", "Flowing Particle Pulses", "6 Production Stations", "Inspection Popovers"]
    },
    alternative: {
      slideId: 'alternative',
      spokenScript: "Slide 5 shows what happens if you take the lazy shortcut. Wrapping a cloud chatbot seems easy for five minutes, until you get huge monthly bills and realize your private company data got sent overseas. No thanks!",
      visualHighlights: ["Cloud Wrapper Comparison", "Token Cost Inflation", "Vendor Lock-in Downside"]
    },
    quiz: {
      slideId: 'quiz',
      spokenScript: "Pop quiz time! Why do we use both SQLite and Qdrant instead of just one single database? Tap your answer on screen!",
      visualHighlights: ["Dual-Store Knowledge Check", "Relational vs Vector Specialization"]
    },
    mastery: {
      slideId: 'mastery',
      spokenScript: "Remember this golden rule: 'Keep your storage, search, and AI brain in separate rooms! When everything is neat and decoupled, your app stays private, fast, and uncrashable.' Mark it mastered!",
      visualHighlights: ["Mastery Invariant", "Completion Checkpoint"]
    }
  },

  // Lesson 1.3: The RAG Golden Rule
  '1-3': {
    metaphor: {
      slideId: 'metaphor',
      spokenScript: "Check out Slide 1! Think of Sanad like a visit to an old-school library. See that wooden card drawer on the left? It has tiny 500-letter index cards that tell you where things are in two seconds. Once you find the card, you walk over to the shelf on the right and open the big leather book. Search the small index card, read the whole big chapter!",
      visualHighlights: ["Oak Card Drawer", "500-char Child Snippet", "Master Bookshelf", "4,000-char Full Context"]
    },
    situation: {
      slideId: 'situation',
      spokenScript: "Slide 2 explains why guessing is dangerous. Imagine an HR boss asking about firing rules or vacation days. If the AI guesses the wrong number, employees get underpaid and the company gets taken to court! In real life, guessing gets people sued!",
      visualHighlights: ["Corporate Legal Liability", "Zero Hallucination Tolerance"]
    },
    solution: {
      slideId: 'solution',
      spokenScript: "Slide 3 reveals our open-book exam rule! The AI is forbidden from making up citations. Python code actually reaches onto the computer disk, grabs the exact page and article number, and clips the receipt directly onto the answer. Every fact has a receipt!",
      visualHighlights: ["Code-Enforced Citation Receipts", "Python Disk Block Verification", "Clickable Source Cards"]
    },
    artifact: {
      slideId: 'artifact',
      spokenScript: "Slide 4 lets you look under the hood with our Code Inspector! Look at the red box on the left: the sloppy prompt asks the AI to guess an article number. Look at the green box on the right: Python attaches the real receipt directly from disk!",
      visualHighlights: ["Code Architecture Inspector", "Naive Hallucinated Prompt", "Sanad Verified Runtime Code"]
    },
    alternative: {
      slideId: 'alternative',
      spokenScript: "Slide 5 tackles the big temptation: being chatty versus being truthful. Normal chatbots want to be popular, so they make up stories when they don't know the answer. Sanad is an honest friend: if the proof isn't in your files, it says 'I don't know'!",
      visualHighlights: ["Helpfulness vs Truth Dilemma", "Chattiness vs Verification Rigor"]
    },
    quiz: {
      slideId: 'quiz',
      spokenScript: "Quick question: Who actually writes the source citation card in Sanad? Tap the right answer!",
      visualHighlights: ["Citation Provenance Quiz", "Instant Verification Feedback"]
    },
    mastery: {
      slideId: 'mastery',
      spokenScript: "Our golden rule of all time: 'Never Guess. Always Prove! An honest I don't know is worth a million confident lies.' Hit Mark as Mastered and let's celebrate!",
      visualHighlights: ["Golden Invariant Rule", "Chapter Mastered Check"]
    }
  }
};
