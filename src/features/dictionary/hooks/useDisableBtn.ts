import { useState } from "react";

function useDisableBtn() {
  const [isDisabled, setIsDisabled] = useState('');
  return { isDisabled, setIsDisabled };
}

export default useDisableBtn;
