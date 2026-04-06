import { useAppSelector } from "@/app/store";
import { selectHomepageAISentence } from "@/features/home/slice";
import PronounceButton from "@/shared/components/ui/PronounceButton";
import ReactMarkdown from "react-markdown";

function AISentence() {
  const homepageAISentence = useAppSelector(selectHomepageAISentence);
  return (
    <div className="flex gap-2">
      <h1>
        {homepageAISentence ? (
          <ReactMarkdown>{homepageAISentence}</ReactMarkdown>
        ) : (
          "Завантаження..."
        )}
      </h1>
      <PronounceButton text={homepageAISentence} size="20" />
    </div>
  );
}

export default AISentence;
