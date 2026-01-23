import type { ButtonHTMLAttributes, ReactElement } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | ReactElement;
}

function Button(props: ButtonProps) {
  const { text, ...restAttributes } = props;
  return <button {...restAttributes}>{text}</button>;
}

export default Button;
