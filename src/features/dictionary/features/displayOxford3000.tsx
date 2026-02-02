import { useAppSelector } from "@/app/store";
import { selectOxford3000 } from "@/features/dictionary/slice";
import { Virtuoso } from "react-virtuoso";

function DisplayOxford3000() {
  const oxfordD3000 = useAppSelector(selectOxford3000);

  if (!oxfordD3000.length) {
    return <h1>Завантаження словника...</h1>;
  }

  return (
    <div className="w-full pr-2 pl-2">
      <div className="sticky top-0 z-1 flex h-1/12 items-center bg-white">
        <h1 className="text-xl font-bold">PUBLIC OXFORD 3000</h1>
      </div>

      <Virtuoso
        data={oxfordD3000}
        totalCount={oxfordD3000.length}
        itemContent={(_, word) => {
          return (
            <div className="mb-4 rounded border-4 border-amber-600 p-2">
              <h1>
                <b>Слово:</b> {word.e} <br />
                <b>Переклад:</b> {word.u} <br />
                <b>Рівень:</b> {word.l}
              </h1>

              <div className="mt-2 flex gap-2">
                <button className="cursor-pointer rounded bg-green-500 px-2 py-1 text-white">
                  Знаю
                </button>
                <button className="cursor-pointer rounded bg-red-500 px-2 py-1 text-white">
                  Не знаю
                </button>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}

export default DisplayOxford3000;
