interface InputErrorProps {
  errorMessage: string | undefined;
}

function AuthInputError({ errorMessage }: InputErrorProps) {
  return (
    <p className="absolute right-0 text-sm text-red-800 sm:text-base lg:text-sm">
      {errorMessage}
    </p>
  );
}

export default AuthInputError;
