import DeleteAccount from "@/features/auth/components/DeleteAccount";
import Logout from "@/features/auth/components/Logout";
import useAvatar from "@/features/profile/hooks/useAvatar";
import GlobalLoading from "@/shared/components/ui/GlobalLoading";
import TestLoader from "@/shared/components/ui/TestLoader";
import defaultAvatar from "@/features/profile/assets/default-avatar.png";

function Profile() {
  const { avatar, isProfileLoading, uploadStatus, setAvatarToProfile } =
    useAvatar();

  if (isProfileLoading) {
    return <GlobalLoading />;
  }

  return (
    <div className="flex flex-col items-center justify-end gap-50">
      <form className="flex flex-col items-center gap-3">
        <label
          htmlFor="upload-avatar"
          className={`border ${uploadStatus === "uploading" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        >
          {avatar ? "Змінити фото" : "Завантажити фото"}
        </label>

        <input
          type="file"
          id="upload-avatar"
          name="upload-avatar"
          accept="image/*"
          capture="user"
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

      <div>
        <Logout />
        <DeleteAccount />
      </div>
    </div>
  );
}

export default Profile;
