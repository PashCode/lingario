import DeleteAccount from "@/features/auth/components/DeleteAccount";
import Logout from "@/features/auth/components/Logout";
import useAvatar from "@/features/profile/hooks/useAvatar";
import GlobalLoading from "@/shared/components/ui/GlobalLoading";
import requireCurrentUser from "@/shared/utils/auth/requireCurrentUser";
import EditName from "@/features/profile/components/EditName";
import useEditName from "@/features/profile/hooks/useEditName";
import Avatar from "@/features/profile/components/Avatar";
import ProfileStats from "@/features/profile/components/ProfileStats";
import { useAppSelector } from "@/app/store";
import { selectOxford3000 } from "@/features/dictionaries/slice";
import useDictSnapshot from "@/shared/hooks/useDictSnapshot";
import type { Oxford3000Values } from "@/features/dictionaries/types";

export function Profile() {
  const { avatar, isProfileLoading, uploadStatus, setAvatarToProfile } = useAvatar();
  const { editNameStatus, handleEditName, name, setName } = useEditName();
  const currentUser = requireCurrentUser();
  const displayName = currentUser.displayName
  const dateRegistration = currentUser.metadata.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString("uk-UA")
    : "Помила дати реєстрації...";
  const oxford3000 = useAppSelector(selectOxford3000);
  const { personalDictionary, isPersonalDictLoading } = useDictSnapshot<Oxford3000Values>();

  if (isProfileLoading || isPersonalDictLoading) {
    return <GlobalLoading />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex">
        <Avatar
          uploadStatus={uploadStatus}
          avatar={avatar}
          setAvatarToProfile={setAvatarToProfile}
        />

        <div className="grid">
          <h1>Імʼя: {displayName ? displayName : "Обізяна"}</h1>
          <h1>Дата реєстрації: {dateRegistration}</h1>
        </div>
      </div>

      <EditName
        editNameStatus={editNameStatus}
        handleEditName={handleEditName}
        name={name}
        setName={setName}
      />

      <ProfileStats
        oxford3000={oxford3000}
        personalDictionary={personalDictionary}
      />

      <div>
        <Logout />
        <DeleteAccount />
      </div>
    </div>
  );
}
