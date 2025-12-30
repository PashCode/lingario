interface AlertProps {
  message: string | null;
}

function Alert({ message }: AlertProps) {
  return <div className="border-2 border-red-900">{message}</div>;
}

export default Alert;
