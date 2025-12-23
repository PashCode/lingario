import type { AlertProps } from "@/features/auth/authTypes";

function Alert({ errorText }: AlertProps) {
  return <div className="border-2 border-red-900">{errorText}</div>;
}

export default Alert;
