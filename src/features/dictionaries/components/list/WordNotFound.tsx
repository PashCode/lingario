interface WordNotFoundProps {
  message: string;
}

function WordNotFound({ message }: WordNotFoundProps) {
  return (
    <div className="flex h-full min-h-0 items-center justify-center bg-white px-8 text-center">
      <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold">{message}</h1>
    </div>
  );
}

export default WordNotFound;
