import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/ui/Button";

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      text="←"
      className="absolute top-4 left-4 cursor-pointer text-5xl"
      onClick={() => navigate(-1)}
    ></Button>
  );
}

export default BackButton;
