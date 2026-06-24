import { httpsCallable } from "firebase/functions";
import { auth, db } from "@/config/firebase";
import { functions } from "@/config/functions";
import { collection, getDocs } from "firebase/firestore";
import type { PersonalWordValues } from "@/features/home/types";

// gets a random word with "new" or "in progress" status to use in AI sentence generation
export async function getRandomLearningWord() {
  if (!auth.currentUser) return;

  const dictionaryRef = collection(
    db,
    "users",
    auth.currentUser.uid,
    "dictionary",
  );
  const querySnapshot = await getDocs(dictionaryRef);
  const learningWords = querySnapshot.docs
    .map((word) => word.data() as PersonalWordValues)
    .filter((word) => word.progress === "new" || word.progress === "in progress");
  const randomIndex = Math.floor(Math.random() * learningWords.length);

  return learningWords[randomIndex];
}

// generates an AI sentence for the homepage. if the request fails waits 1s and retries, up to 3 attempts total
export async function createHomepageAISentence(retryCount: number = 0) {
  const randomLearningWord = await getRandomLearningWord();

  try {
    const getHomepageSentence = httpsCallable(
      functions,
      "createHomepageAISentence",
    );
    const result = await getHomepageSentence(
      // if there is a word — pass it to the firebase function so the sentence is about it. if not, generate any sentence
      randomLearningWord
        ? {
            englishWord: randomLearningWord.englishWord,
            level: randomLearningWord.level,
          }
        : {},
    );

    return result.data as string;
  } catch (error) {
    console.warn(`[WARNING]: Спроба генерації фрази: ${retryCount + 1} / 3`);

    if (retryCount === 2) {
      console.error("[ERROR]: Всі 3 спроби генерації вичерпано.");
      throw error;
    }

    // wait 1 second before retrying to avoid spamming requests
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return createHomepageAISentence(retryCount + 1);
  }
}
