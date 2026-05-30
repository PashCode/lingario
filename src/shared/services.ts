import type {
  FetchTTSProps,
  FetchTTSResponse,
} from "@/features/dictionaries/types";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/config/functions";

export async function fetchPronunciation(
  text: FetchTTSProps,
  voiceName: string,
  gender: string,
): Promise<FetchTTSResponse | undefined> {
  const pronounceText = httpsCallable(functions, "fetchPronunciation");

  try {
    const result = await pronounceText({
      text,
      voiceName,
      gender,
    });

    return result.data as FetchTTSResponse;
  } catch (error) {
    console.error("Error speaking word:", error);
  }
}

