import type {
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from "react";
import InputError from "@/shared/components/ui/InputError";
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  htmlFor: string;
  errorMessage?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  leftIcon?: ReactNode;
  canTogglePassword?: boolean;
  isPasswordVisible?: boolean;
  setIsPasswordVisible?: Dispatch<SetStateAction<boolean>>;
}

function Input(props: InputProps) {
  const {
    htmlFor,
    labelText,
    errorMessage = "",
    wrapperClassName = "",
    labelClassName = "",
    inputClassName = "",
    errorClassName = "",
    leftIcon,
    canTogglePassword = false,
    isPasswordVisible = false,
    setIsPasswordVisible,
    type = "text",
    ...inputAttributes
  } = props;

  const isPasswordField = type === "password";
  let finalType = type;

  if (canTogglePassword && isPasswordField) {
    finalType = isPasswordVisible ? "text" : "password";
  }

  return (
    <div className={`${wrapperClassName} relative`}>
      <label className={`select-none ${labelClassName}`} htmlFor={htmlFor}>
        {labelText}
      </label>

      <div
        className={`px-1 h-10 flex items-center border-2 border-gray-300 rounded ${errorMessage ? "border-red-500 focus-within:border-red-500" : "border-black focus-within:border-yellow-500"}`}
      >
        {leftIcon && <div className="mr-2">{leftIcon}</div>}

        <input
          {...inputAttributes}
          type={finalType}
          className={`w-full ${inputClassName} focus:outline-none`}
        />

        {canTogglePassword && isPasswordField && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible?.((prev) => !prev)}
            className="cursor-pointer"
          >
            {isPasswordVisible ? <LuEye /> : <LuEyeClosed />}
          </button>
        )}
      </div>

      <InputError errorClassName={errorClassName} errorMessage={errorMessage} />
    </div>
  );
}

export default Input;
