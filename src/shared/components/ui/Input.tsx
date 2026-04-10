import type { InputHTMLAttributes } from "react";
import InputError from "@/shared/components/ui/InputError";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  htmlFor: string;
  errorMessage?: string | undefined;
  className?: string;
}

function Input(attributes: InputProps) {
  const {
    htmlFor,
    labelText,
    errorMessage,
    className,
    ...inputAttributes
  } = attributes;

  return (
    <div className={className}>
      <label className="select-none" htmlFor={htmlFor}>{labelText}</label>
      <input {...inputAttributes} />
      <InputError errorMessage={errorMessage} />
    </div>
  );
}

export default Input;
