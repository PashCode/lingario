import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "@/config/firebase";
import requireCurrentUser from "@/shared/utils/auth/requireCurrentUser";
import { toast } from "sonner";
import type { UploadStatus, UseAvatarReturn } from "@/features/profile/types";

function useAvatar(): UseAvatarReturn {
  const currentUser = requireCurrentUser();
  const [avatar, setAvatar] = useState("");
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");

  function waitImage(url: string) {
    return new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => reject();
      image.src = url;
    });
  }

  useEffect(() => {
    async function loadAvatar() {
      try {
        const docRef = doc(db, "avatar", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const photoURL = docSnap.data()?.photoURL;

        if (photoURL) {
          await waitImage(photoURL);
          setAvatar(photoURL);
        }
      } catch (error) {
        console.error("[ERROR]", error);
        toast.error("Помилка завантаження фото. Спробуйте оновити сторінку.");
      } finally {
        setIsProfileLoading(false);
      }
    }

    void loadAvatar();
  }, [currentUser.uid]);

  async function setAvatarToProfile(file: File | undefined) {
    if (!file) return;

    setUploadStatus("uploading");

    const storage = getStorage();
    const fileRef = ref(storage, `avatar/${currentUser.uid}/avatar-${Date.now()}`);

    try {
      await uploadBytes(fileRef, file);
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося завантажити файл");
      setUploadStatus("idle");
      return;
    }

    let avatarURL = "";
    try {
      avatarURL = await getDownloadURL(fileRef);
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося отримати посилання на фото");
      setUploadStatus("idle");
      return;
    }

    try {
      await setDoc(
        doc(db, "avatar", currentUser.uid),
        { photoURL: avatarURL },
        { merge: true },
      );
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося зберегти фото в профілі");
      setUploadStatus("idle");
      return;
    }

    try {
      await waitImage(avatarURL);
    } catch (error) {
      console.error(error);
      toast.error("Фото збережено, але не вдалося його показати");
      setUploadStatus("idle");
      return;
    }

    setAvatar(avatarURL);
    setUploadStatus("idle");
    toast.success("Фото профілю встановлено");
  }

  return {
    avatar,
    isProfileLoading,
    uploadStatus,
    setAvatarToProfile,
  };
}

export default useAvatar;
