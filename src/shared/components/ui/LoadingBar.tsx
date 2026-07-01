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
      className={`rounded-buttons relative flex h-4 xs:h-5 sm:h-6 md:h-7 w-full lg:h-4 2xl:h-5 overflow-hidden ${bgColor}`}
    >
      <span
        className={`${mainColor} rounded-buttons absolute h-full transition-all duration-500 ease-out`}
        style={{ width: `${percent}%` }}
      ></span>

      <span
        className={`xs:text-xs sm:text-sm md:text-base relative m-auto text-[10px] lg:text-[10px] 2xl:text-xs font-light ${percentColor}`}
      >
        {Number.isInteger(percent) ? percent.toFixed(0) : percent.toFixed(1)}%
      </span>
    </div>
  );
}

export default LoadingBar;
