import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/ui/Button";
import { LuArrowLeft } from "react-icons/lu";

function BackButton({
  btnColor,
  to = -1,
}: {
  btnColor?: string;
  to?: number | string;
}) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (typeof to === "number") {
      navigate(to);
    } else {
      navigate(to);
    }
  };

  return (
    <Button
      text={
        <LuArrowLeft
          strokeWidth={1}
          size="1em"
          className="w-full text-2xl md:text-3xl"
        />
      }
      className={`cursor-pointer ${btnColor} w-full text-center`}
      onClick={handleGoBack}
    ></Button>
  );
}

export default BackButton;
