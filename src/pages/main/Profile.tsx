import { logout } from "@/features/auth/authServices.ts";

function Profile() {
  const hangleLogout = async () => await logout();

  return (
    <>
      <div>PROFILE</div>
      <button onClick={() => hangleLogout()}>Вийти</button>
    </>
  );
}

export default Profile;
