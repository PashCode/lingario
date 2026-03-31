import { useState } from "react";
import { fetchPronunciation } from "@/shared/services";
import { Howl } from "howler";

function usePronounceText() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPronounce, setCurrentPronounce] = useState<undefined | string>("");

  async function pronounceText(
    text: string | undefined,
    voice?: string | undefined,
    gender?: string | undefined,
  ) {

    const data = await fetchPronunciation(
      text || "Audio error, please try again later",
      voice || "en-US-Neural2-D",
      gender || "MALE",
    );

    if (!data) return;

    const audio = new Howl({
      src: [`data:audio/mp3;base64,${data.audioContent}`],
      format: ["mp3"],
      html5: true,
      onplay: function () {
        setIsPlaying(true);
        setCurrentPronounce(text);
      },
      onend: function () {
        setIsPlaying(false);
        setCurrentPronounce("");
      },
      onstop: function () {
        setIsPlaying(false);
        setCurrentPronounce("");
      },
    });
    Howler.stop()
    audio.play();
  }

  return { isPlaying, currentPronounce, pronounceText };
}

export default usePronounceText;
