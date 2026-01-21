import { useAppSelector } from "@/app/store";
import { selectOxfordDictionary } from "@/features/dictionary/slice";

function Oxford3000() {
  const oxfordDictionary = useAppSelector(selectOxfordDictionary);

  return (
    <div className="flex flex-col">
      <h1>PUBLIC OXFORD 3000</h1>

      <div>
        {oxfordDictionary.map((word, index) => {
          return (
            <div key={index}>
              <div className="flex">
                <h1>
                  <b>Слово:</b>&nbsp;
                </h1>
                <p>{word.e}</p>
                &nbsp;
                <h1>
                  <b>Переклад:</b>&nbsp;
                </h1>
                <p>{word.u}</p>
                &nbsp;
                <h1>
                  <b>Рівень:</b>&nbsp;
                </h1>
                <p>{word.l}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Oxford3000;
