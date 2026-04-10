import TestLoader from "@/shared/components/ui/TestLoader";
import defaultAvatar from "@/features/profile/assets/default-avatar.png";
import type { AvatarProps } from "@/features/profile/types";

function Avatar({ uploadStatus, avatar, setAvatarToProfile }: AvatarProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {avatar ? (
        <img
          src={avatar}
          alt="avatar"
          className={`w-1/5 rounded-full ${uploadStatus === "uploading" ? "opacity-0" : ""}`}
        />
      ) : (
        <img
          src={defaultAvatar}
          alt="default-avatar"
          className="w-1/5 rounded-full"
        />
      )}

      <form className="flex flex-col items-center gap-3">
        <label
          htmlFor="upload-avatar"
          className={`border ${uploadStatus === "uploading" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        >
          {avatar ? "Змінити" : "Завантажити"}
        </label>

        <input
          type="file"
          id="upload-avatar"
          name="upload-avatar"
          accept="image/*"
          disabled={uploadStatus === "uploading"}
          onChange={(event) =>
            void setAvatarToProfile(event.currentTarget.files?.[0])
          }
          hidden
        />

        {uploadStatus === "uploading" && (
          <TestLoader text="Завантаження фото..." />
        )}
      </form>
      {/*{uploadStatus === "error" && <p>Помилка завантаження, спробуйте ще раз</p>}*/}
    </div>
  );
}

export default Avatar;
