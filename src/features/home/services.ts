import { geminiAI } from "@/config/gemini";
import { auth, db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { PersonalWordValues } from "@/features/home/types";

export async function getRandomLearningWord() {
  if (!auth.currentUser) return;

  const dictionaryRef = collection(db, "users", auth.currentUser.uid, "dictionary",);
  const querySnapshot = await getDocs(dictionaryRef);
  const learningWords = querySnapshot.docs
    .map((word) => word.data() as PersonalWordValues)
    .filter((word) => word.progress === "new" || word.progress === "in progress");
  const randomIndex = Math.floor(Math.random() * learningWords.length);

  return learningWords[randomIndex];
}

export async function createHomepageAISentence(retryCount: number = 0) {
  const randomLearningWord = await getRandomLearningWord();

  try {
    const response = await geminiAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: { sentence: { type: "string" } },
          required: ["sentence"],
        },
        systemInstruction:
          "Use the exact dictionary word only. Do not change its form. Do not add endings like -ed, -ing, or -s.",
        temperature: 1,
        maxOutputTokens: 150,
      },
      contents: randomLearningWord
        ? `Task: Create one grammatically correct sentence ${randomLearningWord.level} level.\n` +
          "Length: No more than 10 words\n" +
          `Vocabulary: Use the word "${randomLearningWord.englishWord}" and wrap it in triple asterisks (like **${randomLearningWord.englishWord}**)\n` +
          "Topic: Random everyday theme\n"
        : "Task: Create one grammatically correct sentence\n" +
          "Length: Exactly 10 words\n" +
          "Vocabulary: Only Oxford 3000, A2 level\n" +
          "Topic: Random everyday theme\n",
    });

    if (!response.text) throw new Error("Помилка генерації фрази");
    const parsed = JSON.parse(response.text);
    return parsed.sentence;
  } catch {
    if (retryCount === 3) throw new Error("Спроби вичерпані, помилка Gemini")
    console.log(`Спроба згенерувати фразу ${retryCount + 1} / 3`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return createHomepageAISentence(retryCount + 1);
  }
}
