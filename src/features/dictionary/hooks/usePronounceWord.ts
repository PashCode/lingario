import { useState } from "react";
import { fetchPronunciation } from "@/features/dictionary/services";
import { Howl } from "howler";

function usePronounceWord() {
  const [isPlaying, setIsPlaying] = useState(false);

  async function pronounceText( text: string | undefined) {
    const data = await fetchPronunciation(text);
    if (!data) return;

    const audio = new Howl({
      src: [`data:audio/mp3;base64,${data.audioContent}`],
      format: ["mp3"],
      html5: true,
      onplay: function () {
        setIsPlaying(true);
      },
      onend: function () {
        setIsPlaying(false);
      },
    });
    audio.play();
  }

  return { isPlaying, pronounceText };
}

export default usePronounceWord;
