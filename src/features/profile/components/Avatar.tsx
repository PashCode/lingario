import CircularLoader from "@/shared/components/ui/CircularLoader";
import defaultAvatar from "@/features/profile/assets/defaultAvatar-img.png";
import type { AvatarProps } from "@/features/profile/types";
import { LuUpload } from "react-icons/lu";

function Avatar({ uploadStatus, avatar, setAvatarToProfile }: AvatarProps) {
  let uploadButtonStatus;
  if (uploadStatus === "uploading") {
    uploadButtonStatus = (
      <span className="2xl:text-2xl xs:text-lg sm:text-xl rounded-buttons flex h-full w-full items-center justify-center gap-x-2 border border-blue-800 text-blue-800 transition-transform duration-100 ease-out active:scale-98">
        <p>Завантаження</p>
        <CircularLoader />
      </span>
    );
  } else if (avatar) {
    uploadButtonStatus = (
      <span className="2xl:text-2xl xs:text-lg rounded-buttons flex h-full w-full items-center justify-center gap-x-2 border border-blue-800 text-blue-800 transition-transform duration-100 ease-out active:scale-98 sm:text-xl">
        <p>Змінити</p>
        <LuUpload />
      </span>
    );
  } else {
    uploadButtonStatus = (
      <span className="2xl:text-2xl xs:text-lg rounded-buttons flex h-full w-full items-center justify-center gap-x-2 border border-blue-800 text-blue-800 transition-transform duration-100 ease-out active:scale-98 sm:text-xl">
        <p>Завантажити</p>
        <LuUpload />
      </span>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-between gap-2">
      {avatar ? (
        <img
          src={avatar}
          alt="avatar"
          className={`xs:w-30 xs:h-30 h-25 w-25 rounded-full border border-gray-800 p-2 sm:h-40 sm:w-40 2xl:h-45 2xl:w-45`}
        />
      ) : (
        <img
          src={defaultAvatar}
          alt="default-avatar"
          className="2xl:h-45 sm:h-40 xs:w-30 xs:h-30 h-25 w-25 rounded-full border border-gray-800 p-2 sm:w-40 2xl:w-45"
        />
      )}

      <form className="2xl:h-14 2xl:w-60 xs:h-10 xs:w-45 h-8 w-40 sm:h-12 sm:w-50">
        <label
          htmlFor="upload-avatar"
          className={`${uploadStatus === "uploading" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        >
          {uploadButtonStatus}
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
      </form>
    </div>
  );
}

export default Avatar;
