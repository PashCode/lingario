import { useState } from "react";
import { fetchPronunciation } from "@/features/dictionaries/services";
import { Howl } from "howler";

function usePronounceWord() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPronounce, setCurrentPronounce] = useState<undefined | string>(
    "",
  );

  async function pronounceText(text: string | undefined) {
    const data = await fetchPronunciation(text || "Audio error, please try again later");
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
    });
    audio.play();
  }

  return { isPlaying, currentPronounce, pronounceText };
}

export default usePronounceWord;
