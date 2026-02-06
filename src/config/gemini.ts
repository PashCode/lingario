import { GoogleGenAI } from "@google/genai";

export const geminiAI = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const googleTTS = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
};
