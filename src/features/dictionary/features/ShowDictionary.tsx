import { useAppSelector } from "@/app/store";
import { selectOxford3000 } from "@/features/dictionary/slice";

function ShowDictionary() {
  const oxfordD3000 = useAppSelector(selectOxford3000);

  return (
    <div className="flex flex-col">
      <h1>
        {!oxfordD3000.length
          ? "Завантаження словника..."
          : "PUBLIC OXFORD 3000"}
      </h1>
      {/*З приводу такого завантаження хз. на першому рендері воно відображає "Завантаження словника...", а потім при ререндерах глобальний лоадінг з компоненту GlobalLoading*/}
      <div>
        {oxfordD3000.map((word, index) => {
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
