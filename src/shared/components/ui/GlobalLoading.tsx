import { toast } from "sonner";
import { useEffect } from "react";

function GlobalLoading() {
  useEffect(() => {
    let toastLoadingId: string | number;

    const timerId = setTimeout(() => {
      toastLoadingId = toast.loading("Завантаження...");
    }, 0);

    return () => {
      toast.dismiss(toastLoadingId);
      clearTimeout(timerId);
    };

  }, []);

  return null;
}

export default GlobalLoading;
