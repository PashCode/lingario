import {
  selectHomepageAISentence,
  setHomepageAISentence,
} from "@/features/home/slice";
import PronounceButton from "@/shared/components/ui/PronounceButton";
import ReactMarkdown from "react-markdown";
import { useAppSelector, useAppDispatch } from "@/app/store";
import {
  selectIsAISentenceLoading,
  setIsAISentenceLoading,
} from "@/features/dictionaries/slice";
import TestLoader from "@/shared/components/ui/TestLoader";
import { createHomepageAISentence } from "@/features/home/services";

function AISentence() {
  const homepageAISentence = useAppSelector(selectHomepageAISentence);
  const homepageAISentenceLoading = useAppSelector(selectIsAISentenceLoading);
  const dispatch = useAppDispatch();

  function getAISentenceState() {
    if (homepageAISentenceLoading === "loading") {
      return <TestLoader text="Генерування фрази..." />;
    }

    if (!homepageAISentence) {
      return (
        <div className="flex gap-2">
          <h1>Помилка генерування фрази...</h1>
          <button
            className="cursor-pointer border"
            onClick={async () => {
              dispatch(setIsAISentenceLoading("loading"));
              try {
                const sentence = await createHomepageAISentence();
                dispatch(setIsAISentenceLoading("success"));
                dispatch(setHomepageAISentence(sentence));
              } catch (error) {
                if (error instanceof Error) {
                  console.error(error.message);
                }
                dispatch(setIsAISentenceLoading("error"));
              }
            }}
          >
            Ще раз
          </button>
        </div>
      );
    }

    return (
      <div className="flex gap-2">
        <ReactMarkdown>{homepageAISentence}</ReactMarkdown>
        <PronounceButton text={homepageAISentence} size="20" />
      </div>
    );
  }

  const content = getAISentenceState();

  return (
    <div className="flex gap-2">
      <div>{content}</div>
    </div>
  );
}

export default AISentence;
