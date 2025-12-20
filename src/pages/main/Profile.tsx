import { logout } from "../../features/auth/authServices.ts";
import auth from "../../config/firebase.ts";

function Profile() {
  const hangleLogout = async (auth) => await logout(auth);

  return (
    <>
      <div>PROFILE</div>
      <button onClick={() => hangleLogout(auth)}>Вийти</button>
    </>
  );
}

export default Profile;
