import { logout } from "@/features/auth/services.ts";

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
