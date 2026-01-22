import { useAppSelector } from "@/app/store";
import { selectAIEverydayPhrase } from "@/features/home/slice";

function AIEverydayPhrase() {
  const AIEverydayPhaseFromStorage = useAppSelector(selectAIEverydayPhrase);
  return <h1>{AIEverydayPhaseFromStorage || "Завантаження..."}</h1>;
}

export default AIEverydayPhrase;
