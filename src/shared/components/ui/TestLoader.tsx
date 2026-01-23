import { ClipLoader } from "react-spinners";

function TestLoader({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <p>{text}</p>
      <ClipLoader color="black" size={15} />
    </div>
  );
}

export default TestLoader;
