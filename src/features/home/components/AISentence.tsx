import {
  selectHomepageAISentence,
  selectHomepageAISentenceStatus,
  setHomepageAISentence,
  setHomepageAISentenceStatus,
} from "@/features/home/slice";
import PronounceButton from "@/shared/components/ui/PronounceButton";
import ReactMarkdown from "react-markdown";
import { useAppSelector, useAppDispatch } from "@/app/store";
import CircularLoader from "@/shared/components/ui/CircularLoader";
import getOrSetStorage from "@/shared/utils/storageAndSession/getOrSetStorage";
import { LSHomepageAISentenceConfig } from "@/features/home/utils/constants";
import { HOMEPAGE_AI_SENTENCE_KEY } from "@/shared/utils/storageAndSession/constants";
import Button from "@/shared/components/ui/Button";
import { LuRefreshCw } from "react-icons/lu";

function AISentence() {
  const homepageAISentence = useAppSelector(selectHomepageAISentence);
  const homepageAISentenceStatus = useAppSelector(
    selectHomepageAISentenceStatus,
  );
  const dispatch = useAppDispatch();

  function getAISentenceState() {
    if (homepageAISentenceStatus === "loading") {
      return (
        <div className="flex items-center gap-2">
          <p>Генерування фрази...</p>
          <CircularLoader color="#ffffff" size={20} />
        </div>
      );
    }

    if (homepageAISentenceStatus === "error") {
      return (
        <div className="flex items-center gap-2">
          <p>Помилка генерування фрази</p>
          <Button
            className="rounded-buttons cursor-pointer border px-2 py-1 text-[14px]"
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
            text={
              <span className="flex items-center gap-x-1">
                <LuRefreshCw strokeWidth={1.2} size={15} />
                <p >Повторити</p>
              </span>
            }
          ></Button>
        </div>
      );
    }

    if (!homepageAISentence) {
      return null;
    }

    // &nbsp; [non-breaking space] + whitespace-nowrap — keeps the pronounce button from wrapping to a new line
    return (
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p>
              {children}
              <span className="whitespace-nowrap">
                {"\u00A0"}
                <span className="inline-block translate-y-1.5 ml-0.5 text-2xl 2xl:text-3xl">
                  <PronounceButton
                    text={homepageAISentence}
                    size="1em"
                    strokeWith={1.2}
                  />
                </span>
              </span>
            </p>
          ),
        }}
      >
        {homepageAISentence}
      </ReactMarkdown>
    );
  }

  const content = getAISentenceState();

  return <>{content}</>;
}

export default AISentence;
