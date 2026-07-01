import { CircularLoading } from "respinner";

function CircularLoader({
  size = 15,
  color = "#111111",
  strokeWidth = 1,
}: {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <CircularLoading color={color} size={size} strokeWidth={strokeWidth} />
  );
}

export default CircularLoader;
