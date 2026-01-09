import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

function Button(props: ButtonProps) {
  const { text, ...restAttributes } = props;
  return <button {...restAttributes}>{text}</button>;
}

export default Button;
