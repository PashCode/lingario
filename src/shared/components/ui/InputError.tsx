interface InputErrorProps {
  errorMessage: string | undefined;
}

function InputError({ errorMessage }: InputErrorProps) {
  return <p className="text-red-800">{errorMessage}</p>;
}

export default InputError;
