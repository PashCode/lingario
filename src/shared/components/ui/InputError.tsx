interface InputError {
  textError: string | undefined;
}

function InputError({ textError }: InputError) {
  return <p className="text-red-800">{textError}</p>;
}

export default InputError;
