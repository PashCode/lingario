import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/ui/Button";
import { LuArrowLeft } from "react-icons/lu";

function BackButton({
  btnColor,
  size = 40,
  to = -1,
}: {
  btnColor?: string;
  size?: number;
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
      text={<LuArrowLeft strokeWidth={1} size={size} className="w-full" />}
      className={`cursor-pointer ${btnColor} w-full text-center`}
      onClick={handleGoBack}
    ></Button>
  );
}

export default BackButton;
