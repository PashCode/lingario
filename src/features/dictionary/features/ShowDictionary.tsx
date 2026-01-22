import { useAppSelector } from "@/app/store";
import { selectOxfordDictionary } from "@/features/dictionary/slice";

function ShowDictionary() {
  const oxfordDictionary = useAppSelector(selectOxfordDictionary);
  console.log(oxfordDictionary);

  return (
    <div className="flex flex-col">
      <h1>
        {!oxfordDictionary.length
          ? "Завантаження словника..."
          : "PUBLIC OXFORD 3000"}
      </h1>
      {/*З приводу такого завантаження хз. на першому рендері воно відображає "Завантаження словника...", а потім при ререндерах глобальний лоадінг з компоненту GlobalLoading*/}
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

export default ShowDictionary;
