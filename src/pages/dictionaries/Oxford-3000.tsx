function Oxford3000() {
  // const { oxfordDictionary } = useRegister();
  const getDict = localStorage.getItem("oxford-dictionary");
  const resDict = JSON.parse(getDict)

  return (
    <div className="flex flex-col">
      <h1>PUBLIC OXFORD 3000</h1>

      <div>
        {resDict.map((word, index) => {
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
