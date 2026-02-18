import { HiSpeakerWave, HiOutlineSpeakerWave } from "react-icons/hi2";
import type { PronounceButtonProps } from "@/features/dictionary/types.ts";

function PronounceButton({
  size,
  currentPronounce,
  text,
}: PronounceButtonProps) {

  return text === currentPronounce ? (
    <HiOutlineSpeakerWave size={size} />
  ) : (
    <HiSpeakerWave size={size} />
  );
}

export default PronounceButton;
