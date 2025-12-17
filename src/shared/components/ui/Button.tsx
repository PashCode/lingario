import type { TButtonProps } from "../../types/types.ts";

function Button({ text }: TButtonProps) {
  return <button>{text}</button>;
}

export default Button;
