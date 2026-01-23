import type { GenerateContentResponse } from "@google/genai";
import { geminiAI } from "@/config/gemini";

export async function getGeminiPhrase() {
  const response: GenerateContentResponse =
    await geminiAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents:
        "Task: Create one grammatically correct sentence\n" +
        "Length: Exactly 10 words\n" +
        "Vocabulary: Only Oxford 3000, A2 level\n" +
        "Topic: Random everyday theme\n" +
        "Output: Sentence only, no additional text\n" +
        "\n",
    });

  return response.text;
}
