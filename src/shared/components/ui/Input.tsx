import type { InputHTMLAttributes } from "react";
import InputError from "@/shared/components/ui/InputError";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  htmlFor: string;
  errorMessage?: string | undefined;
}

function Input(attributes: InputProps) {
  const { htmlFor, labelText, errorMessage, ...restAttributes } = attributes;
  return (
    <div>
      <label htmlFor={htmlFor}>{labelText}</label>
      <input {...restAttributes} />
      <InputError errorMessage={errorMessage} />
    </div>
  );
}

export default Input;
