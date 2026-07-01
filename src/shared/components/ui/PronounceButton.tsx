import Button from "@/shared/components/ui/Button";
import usePronounceText from "@/shared/hooks/usePronounceText";
import PronounceIcon from "@/shared/components/ui/PronounceIcon";
import { useEffect } from "react";

interface PlayWordAudioButtonProps {
  text: string;
  voice?: string;
  gender?: string;
  size: string;
  autoplay?: boolean;
  strokeWith?: number;
}

function PronounceButton({
  text,
  voice,
  gender,
  size,
  autoplay,
  strokeWith = 1.5,
}: PlayWordAudioButtonProps) {
  const { isPlaying, currentPronounce, pronounceText } = usePronounceText();
  const currentText = text.replaceAll("*", "");

  useEffect(() => {
    if (autoplay) {
      void pronounceText(currentText, voice, gender);
    }
  }, [currentText]);

  return (
    <Button
      text={
        <PronounceIcon
          size={size}
          currentPronounce={currentPronounce}
          text={currentText}
          strokeWidth={strokeWith}
        />
      }
      className="cursor-pointer"
      disabled={isPlaying}
      onClick={(event) => {
        event.stopPropagation();
        void pronounceText(currentText, voice, gender);
      }}
    />
  );
}

export default PronounceButton;
