import { CircularLoading } from "respinner";

function CircularLoader({ size = 15, color = "#111111"}: { size?: number, color?: string }) {
  return <CircularLoading color={color} size={size} />;
}

export default CircularLoader;
