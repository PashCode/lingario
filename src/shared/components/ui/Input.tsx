import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  htmlFor: string;
}

function Input(attributes: InputProps) {
  const { htmlFor, labelText, ...restAttributes } = attributes;
  return (
    <div>
      <label htmlFor={htmlFor}>{labelText}</label>
      <input {...restAttributes} />
    </div>
  );
}

export default Input;
