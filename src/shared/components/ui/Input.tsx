import type { InputHTMLAttributes } from "react";
import InputError from "@/shared/components/ui/InputError";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  htmlFor: string;
  textError: string | undefined;
}

function Input(attributes: InputProps) {
  const { htmlFor, labelText, textError, ...restAttributes } = attributes;
  return (
    <div>
      <label htmlFor={htmlFor}>{labelText}</label>
      <input {...restAttributes} />
      <InputError textError={textError} />
    </div>
  );
}

export default Input;
