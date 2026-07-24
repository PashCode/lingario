import { useState } from "react";
import { updateProfile } from "firebase/auth";
import requireCurrentUser from "@/shared/utils/auth/requireCurrentUser";
import { getNameError } from "@/features/auth/utils/validation";
import { toast } from "sonner";
import type { EditNameStatus, UseEditNameReturn } from "@/features/profile/types";
import type { FormEvent } from "react";

function useEditName(): UseEditNameReturn {
  const [editNameStatus, setEditNameStatus] = useState<EditNameStatus>("idle");
  const [isClickedEditName, setIsClickedEditName] = useState(false);
  const [name, setName] = useState("");
  const currentUser = requireCurrentUser();

  async function handleEditName(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const error = getNameError(name);
    const trimmedName = name.trim();

    if (error) {
      toast.error(error);
      return;
    }

    try {
      setEditNameStatus("loading");
      await updateProfile(currentUser, { displayName: trimmedName });
      setName("");
      toast.success("Імʼя змінено успішно");
      setEditNameStatus("idle");
      setIsClickedEditName(false);
    } catch (error) {
      console.error(error);
      setEditNameStatus("error");
      toast.error("Не вдалося змінити імʼя");
    }
  }

  return {
    editNameStatus,
    handleEditName,
    name,
    setName,
    isClickedEditName,
    setIsClickedEditName,
  };
}

export default useEditName;
