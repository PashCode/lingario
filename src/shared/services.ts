import type {
  FetchTTSProps,
  FetchTTSResponse,
} from "@/features/dictionaries/types";
import { googleTTS } from "@/config/gemini";

export async function fetchPronunciation(
  text: FetchTTSProps,
  voiceName: string,
  gender: string,
): Promise<FetchTTSResponse | undefined> {
  const API_KEY = googleTTS.apiKey;
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

  // const voiceConfig = {
  //   male: { voice: "en-US-Neural2-D", gender: "MALE" },
  //   female: { voice: "en-US-Neural2-H", gender: "FEMALE" },
  // };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: "en-US",
          name: voiceName,
          ssmlGender: gender,
        },
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: 0.9,
        },
      }),
    });
    const data = await response.json();

    if (!response.ok || !data.audioContent) {
      throw new Error(data.error?.message || "No audio content");
    }
    return data;
  } catch (error) {
    console.error("Error speaking word:", error);
  }
}
