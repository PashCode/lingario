import { toast } from "sonner";
import { useEffect } from "react";

function GlobalLoading({ text = "Завантаження сторінки..." }: { text: string }) {
  useEffect(() => {
    let toastLoadingId: string | number;

    const timerId = setTimeout(() => {
      toastLoadingId = toast.loading(text);
    }, 0);

    return () => {
      toast.dismiss(toastLoadingId);
      clearTimeout(timerId);
    };
  }, [text]);

  return null;
}

export default GlobalLoading;
