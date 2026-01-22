import type { GenerateContentResponse } from "@google/genai";
import { geminiAI } from "@/config/gemini";

export async function getAIEverydayPhrase() {
  const response: GenerateContentResponse =
    await geminiAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents:
        "Generate ABSOLUTE random phrase on different theme in 10 words. Write only answer, without any descriptions.",
    });

  return response.text;
}
