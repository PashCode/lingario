const borderColors: Record<string, string> = {
  new: "border-blue-500",
  studied: "border-green-500",
};

export const getBorderColor = (progress: string | undefined) => {
  if (progress && borderColors[progress]) {
    return borderColors[progress];
  }
  return "border-amber-600";
};
