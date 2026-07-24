import DeleteAccount from "@/features/auth/components/DeleteAccount";
import Logout from "@/features/auth/components/Logout";
import useAvatar from "@/features/profile/hooks/useAvatar";
import GlobalLoading from "@/shared/components/ui/GlobalLoading";
import requireCurrentUser from "@/shared/utils/auth/requireCurrentUser";
import EditName from "@/features/profile/components/EditName";
import useEditName from "@/features/profile/hooks/useEditName";
import Avatar from "@/features/profile/components/Avatar";
import profileImg from "@/features/profile/assets/defaultProfile-img.png";
import { LuCalendarHeart, LuMail } from "react-icons/lu";

export function Profile() {
  const { avatar, uploadStatus, setAvatarToProfile, isProfileLoading } =
    useAvatar();

  const {
    editNameStatus,
    handleEditName,
    name,
    setName,
    isClickedEditName,
    setIsClickedEditName,
  } = useEditName();

  const currentUser = requireCurrentUser();
  const displayName = currentUser.displayName;
  const userEmail = currentUser.email;
  const dateRegistration = currentUser.metadata.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString("uk-UA")
    : "Помила дати реєстрації";

  if (isProfileLoading) {
    return <GlobalLoading />;
  }

  return (
    <section className="grid h-full grid-rows-[auto_minmax(0,1fr)]">
      {/* header — same block as on every other page */}
      <div className="rounded-main-blocks shadow-main-blocks xs:min-h-30 relative flex min-h-25 w-full items-center justify-between bg-white px-5 sm:min-h-30 lg:px-7.5 2xl:min-h-35">
        <div>
          <h1 className="xs:text-4xl mb-0.5 text-3xl font-bold sm:mb-1 sm:text-[42px] md:text-[44px] lg:text-[40px] 2xl:text-[44px]">
            Профіль
          </h1>
          <p className="xs:text-xl text-lg font-light text-gray-800 sm:text-2xl lg:text-lg 2xl:text-xl">
            Онови, поглянь і керуй
          </p>
        </div>
        <img
          className="hidden w-50 lg:flex 2xl:w-60"
          src={profileImg}
          alt="logo"
        />
      </div>

      {/* the only scroll container — blocks below keep their natural height */}
      <div className="scrollbar-hidden rounded-main-blocks flex h-[90%] min-h-0 flex-col items-center self-center overflow-y-auto bg-white">
        <div className="flex w-full flex-col gap-y-5 p-5 sm:gap-y-7">
          <Avatar
            uploadStatus={uploadStatus}
            avatar={avatar}
            setAvatarToProfile={setAvatarToProfile}
          />

          <div className="rounded-buttons flex flex-col gap-y-3 border border-blue-800 p-5 sm:gap-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-1">
                <p className="xs:text-lg text-gray-800 sm:text-xl 2xl:text-2xl">
                  Імʼя
                </p>
                <p className="xs:text-lg overflow-hidden font-bold text-ellipsis whitespace-nowrap text-blue-800 sm:text-xl 2xl:text-2xl">
                  {displayName ? displayName : "Гість"}
                </p>
              </div>
              <EditName
                editNameStatus={editNameStatus}
                handleEditName={handleEditName}
                name={name}
                setName={setName}
                isClickedEditName={isClickedEditName}
                setIsClickedEditName={setIsClickedEditName}
              />
            </div>

            <hr className="w-full text-gray-500" />

            <div className="xs:text-lg flex items-center gap-x-2 text-gray-800 sm:text-xl 2xl:text-2xl">
              <LuCalendarHeart />
              <p>Реєстрація: {dateRegistration}</p>
            </div>

            <hr className="w-full text-gray-500" />

            <div className="xs:text-lg flex items-center gap-x-2 text-gray-800 sm:text-xl 2xl:text-2xl">
              <LuMail />
              <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                Email: {userEmail || "Гість"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-y-5 px-5 py-4">
          <h1 className="text-2xl font-bold sm:text-3xl 2xl:text-4xl">
            Керування акаунтом
          </h1>
          <div className="flex h-12 2xl:h-14 gap-x-3">
            <Logout />
            <DeleteAccount />
          </div>
        </div>
      </div>
    </section>
  );
}
