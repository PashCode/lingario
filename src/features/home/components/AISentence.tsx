import {
  selectHomepageAISentence,
  selectHomepageAISentenceStatus,
  setHomepageAISentence,
  setHomepageAISentenceStatus,
} from "@/features/home/slice";
import PronounceButton from "@/shared/components/ui/PronounceButton";
import ReactMarkdown from "react-markdown";
import { useAppSelector, useAppDispatch } from "@/app/store";
import TestLoader from "@/shared/components/ui/TestLoader";
import getOrSetStorage from "@/shared/utils/storageAndSession/getOrSetStorage";
import { LSHomepageAISentenceConfig } from "@/features/home/utils/constants";
import { HOMEPAGE_AI_SENTENCE_KEY } from "@/shared/utils/storageAndSession/constants";

function AISentence() {
  const homepageAISentence = useAppSelector(selectHomepageAISentence);
  const homepageAISentenceStatus = useAppSelector(selectHomepageAISentenceStatus);
  const dispatch = useAppDispatch();

  function getAISentenceState() {
    if (homepageAISentenceStatus === "loading") {
      return <TestLoader text="Генерування фрази..." />;
    }

    if (homepageAISentenceStatus === "error") {
      return (
        <div className="flex gap-2">
          <h1>Помилка генерування фрази...</h1>
          <button
            className="cursor-pointer border"
            onClick={async () => {
              dispatch(setHomepageAISentenceStatus("loading"));
              try {
                localStorage.removeItem(HOMEPAGE_AI_SENTENCE_KEY);
                const sentence = await getOrSetStorage(LSHomepageAISentenceConfig);
                dispatch(setHomepageAISentence(sentence));
                dispatch(setHomepageAISentenceStatus("success"));
              } catch (error) {
                if (error instanceof Error) {
                  console.error(error);
                }
                dispatch(setHomepageAISentenceStatus("error"));
              }
            }}
          >
            Ще раз
          </button>
        </div>
      );
    }

    if (!homepageAISentence) {
      return null;
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
