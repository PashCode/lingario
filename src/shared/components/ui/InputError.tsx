interface InputErrorProps {
  errorMessage: string | undefined;
  errorClassName?: string;
}

function InputError({ errorMessage, errorClassName }: InputErrorProps) {
  return <p className={`text-red-900 ${errorClassName}`}>{errorMessage}</p>;
}

export default InputError;
