import { useState } from "react";

function useProcessingWord() {
  const [processingWord, setProcessingWord] = useState<string | null>(null);
  return { processingWord, setProcessingWord };
}

export default useProcessingWord;
