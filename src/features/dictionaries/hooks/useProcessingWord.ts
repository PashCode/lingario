import { useState } from "react";

// keeps track of the one word we are saving or deleting right now
// so only that word's buttons turn off, not all of them
function useProcessingWord() {
  const [processingWord, setProcessingWord] = useState<string | null>(null);
  return { processingWord, setProcessingWord };
}

export default useProcessingWord;
