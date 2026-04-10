// import { useAppSelector } from "@/app/store";
// import { selectUser } from "@/features/auth/slice";
import requireCurrentUser from "@/shared/utils/auth/requireCurrentUser";

function TestInfo() {

  const user = requireCurrentUser()

  return (
    <>
      <p>{`${user?.email} / ${user?.emailVerified}`}</p>
      <p>{user?.displayName}</p>
    </>
  );
}

export default TestInfo;
