// Gemini Vision & Chatbot Service for Sanad Academy
import html2canvas from 'html2canvas';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citedArticle?: string;
}

const LOCAL_STORAGE_KEY = 'sanad_gemini_api_key';

export const getGeminiApiKey = (): string => {
  if (typeof window === 'undefined') return '';
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) return stored.trim();
  return (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
};

export const setGeminiApiKey = (key: string): void => {
  if (typeof window === 'undefined') return;
  if (key) {
    localStorage.setItem(LOCAL_STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
};

/**
 * Capture screenshot of a DOM element as base64 JPEG
 */
export const captureElementScreenshot = async (element: HTMLElement): Promise<string> => {
  const canvas = await html2canvas(element, {
    backgroundColor: '#f5f5f7',
    scale: 1.5,
    logging: false,
    useCORS: true,
  });
  // Return base64 string without data URL prefix
  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
  return dataUrl.split(',')[1];
};

/**
 * Call Gemini Multimodal Vision API to analyze and explain the captured slide
 */
export const analyzeSlideWithVision = async (
  base64Image: string,
  slideTitle: string,
  lessonContext: string
): Promise<string> => {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    // If no key is set, provide an energetic, dummy-friendly simulated vision walkthrough
    return `Hey there! Check out this slide: "${slideTitle}"! 

Look right at the middle of your screen! Imagine you and your best buddy are flying a super-fast twin-seat jet. One person is steering the plane, and the other person is checking the map.

See how everything connects? Before any decision goes live, both of you have to turn your keys at the exact same second! That's Rule 5! 

We never ever make up facts or guess. If it's not in the book, we honestly say "I don't know" instead of lying. Super simple, safe, and rock-solid!`;
  }

  const prompt = `You are an energetic, warm, super-friendly engineering mentor talking directly to YL and MB (the project creators).
You are looking at a screenshot of the slide they are currently viewing: "${slideTitle}".
Lesson Context: ${lessonContext}

YOUR MISSION:
Explain this slide in SUPER EASY, DUMMY-FRIENDLY English that even a 10-year-old would love and immediately understand!
Write a spoken voiceover script that is full of LIFE, EMOTION, and EXCITEMENT.

STRICT STYLE RULES:
1. TALK LIKE A REAL FRIEND: Start warmly with energy (e.g., "Hey! Look right here at your screen...", "Check this out...", "Imagine this for a second...").
2. USE A REAL-LIFE EVERYDAY METAPHOR: Connect whatever is on this slide to something ordinary (pizza delivery, fighter jet co-pilots, library index cards, nightclub bouncers, bank vaults, Lego blocks).
3. ZERO JARGON WITHOUT AN IMMEDIATE SILLY TRANSLATION: If you mention something technical like "SQLite WAL mode" or "BOLA", explain it immediately like "Basically, it means...".
4. POINT TO WHAT THEY ARE LOOKING AT: Guide their eyes! ("See that blue box in the middle?", "Look at those green checkmarks on the right...", "Notice that big red button?").
5. INJECT FEELINGS & MOTION: Add lively spoken phrases, natural pauses, excitement ("Boom!", "Here's the cool trick...", "And that's why we never guess!").
6. KEEP IT PUNCHY: 4 to 6 short, punchy, conversational sentences. Avoid robotic bullet points; write it as natural, lively spoken dialogue!`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 800
    }
  };

  // Try gemini-2.5-flash first, fallback to gemini-1.5-flash
  const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
  let lastError = null;

  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } else {
        const errJson = await res.json().catch(() => ({}));
        lastError = errJson?.error?.message || `HTTP ${res.status}`;
      }
    } catch (e: any) {
      lastError = e?.message || 'Network request failed';
    }
  }

  throw new Error(`Gemini Vision API error: ${lastError}`);
};

/**
 * Ask the Slide Companion Chatbot grounded in slide image + markdown specs
 */
export const askSlideChatbot = async (
  userQuestion: string,
  base64Image: string | null,
  slideContext: { title: string; specNumber: number; markdownNotes: string },
  history: ChatMessage[]
): Promise<string> => {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    return `To ask live questions to the Sanad AI Tutor using Gemini Vision, please enter your Gemini API key in the top settings modal.

Quick Answer: Regarding "${slideContext.title}" (Spec ${slideContext.specNumber}):
Sanad strictly enforces local-first document retrieval, code-enforced citations (Rule F-03), and deterministic honest refusal (Rule F-05). All external dependencies are decoupled behind 8 explicit hexagonal ports.`;
  }

  const systemInstruction = `You are the friendly, energetic Sanad AI Mentor talking directly to YL and MB.
Your goal is to make these architecture specs 100% understandable using super easy, dummy-friendly English that even a 10-year-old can follow!

Rules:
- Speak warmly and conversationally, like a smart and encouraging friend sitting next to them.
- Always use funny, vivid real-world analogies (pizza deliveries, bank safe deposit boxes, grocery receipts, Lego blocks, fighter jet co-pilots).
- Never use dry textbook jargon without immediately explaining it in plain, simple English.
- If you see an attached screenshot, point directly to what is on the slide ("See that blue box in the middle? That's...").
- Keep answers brief, punchy, inspiring, and full of positive energy!`;

  const parts: any[] = [{ text: systemInstruction + `\n\nUser Question: ${userQuestion}` }];

  if (base64Image) {
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image
      }
    });
  }

  const contents = [
    ...history.slice(-4).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    })),
    {
      role: 'user',
      parts
    }
  ];

  const requestBody = {
    contents,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 1000
    }
  };

  const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
  let lastError = null;

  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } else {
        const errJson = await res.json().catch(() => ({}));
        lastError = errJson?.error?.message || `HTTP ${res.status}`;
      }
    } catch (e: any) {
      lastError = e?.message || 'Network request failed';
    }
  }

  throw new Error(`Gemini Chatbot API error: ${lastError}`);
};
