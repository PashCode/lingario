export const setProgressColor = (progress: string | undefined) => {
  switch (progress) {
    case "new":
      return "border-red-500 bg-red-100";
    case "in progress":
      return "border-orange-800 bg-orange-100";
    case "studied":
      return "border-green-800 bg-green-100";
  }
};

export const setLevelColor = (level: string) => {
  switch ( level ) {
    case "A1":
      return "bg-[#EDDBDB]"
    case "A2":
      return "bg-[#D3DBE4]"
    case "B1":
      return "bg-[#D5DDD0]"
    case "B2":
      return "bg-[#E8E1D8]"
  }
}

export function progressHandler(progress: string | undefined) {
  switch (progress) {
    case "new":
      return "Нове";
    case "in progress":
      return "Вчу";
    case "studied":
      return "Знаю";
  }
}
