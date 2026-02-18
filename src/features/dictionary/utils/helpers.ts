export const setBorderColor = (progress: string | undefined) => {
  switch (progress) {
    case "new":
      return "border-blue-500";
    case "in progress":
      return "border-amber-500";
    case "studied":
      return "border-green-500";
    default:
      return "border-b-gray-500";
  }
};

export function progressHandler(progress: string | undefined) {
  switch (progress) {
    case "new":
      return "Нове";
    case "in progress":
      return "В процесі";
    case "studied":
      return "Вивчене";
  }
}
