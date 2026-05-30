import type { PronounceButtonProps } from "@/shared/types/types";
import { LuVolume2, LuAudioLines } from "react-icons/lu";

function PronounceIcon({
  size,
  currentPronounce,
  text,
  strokeWidth,
}: PronounceButtonProps) {
  return text === currentPronounce ? (
    <LuAudioLines size={size} strokeWidth={strokeWidth} />
  ) : (
    <LuVolume2 size={size} strokeWidth={strokeWidth} />
  );
}

export default PronounceIcon;
