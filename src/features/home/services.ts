import { geminiAI } from "@/config/gemini";

export async function createHomepagePhrase() {
  const response = await geminiAI.models.generateContent({
    model: "gemini-2.5-flash-lite",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          sentence: { type: "string" },
        },
        required: ["sentence"],
      },
      temperature: 1,
      maxOutputTokens: 50,
    },
    contents:
      "Task: Create one grammatically correct sentence\n" +
      "Length: Exactly 10 words\n" +
      "Vocabulary: Only Oxford 3000, A2 level\n" +
      "Topic: Random everyday theme\n" +
      "Output: Sentence only, no additional text\n"
  });

  if (!response.text) return;
  const parsed = JSON.parse(response.text);
  return parsed.sentence;
}
