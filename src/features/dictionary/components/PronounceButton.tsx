import { HiSpeakerWave, HiOutlineSpeakerWave } from "react-icons/hi2";
import type { PronounceButtonProps } from "@/features/dictionary/types.ts";

function PronounceButton({
  size,
  currentPronounce,
  text,
}: PronounceButtonProps) {
  console.log(text);
  console.log(currentPronounce);
  return text === currentPronounce ? (
    <HiOutlineSpeakerWave size={size} />
  ) : (
    <HiSpeakerWave size={size} />
  );
}

export default PronounceButton;
