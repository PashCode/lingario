function LoadingBar({
  percent,
  bgColor,
  mainColor,
  percentColor = "text-white",
}: {
  percent: number;
  bgColor: string;
  mainColor: string;
  percentColor?: string;
}) {
  return (
    <div
      className={`relative flex h-4 w-full overflow-hidden rounded-buttons ${bgColor}`}
    >
      <span
        className={`${mainColor} absolute h-full rounded-buttons transition-all duration-500 ease-out`}
        style={{ width: `${percent}%` }}
      ></span>

      <span className={`relative m-auto text-[12px] font-light ${percentColor}`}>
        {Number.isInteger(percent) ? percent.toFixed(0) : percent.toFixed(1)}%
      </span>
    </div>
  );
}

export default LoadingBar;
