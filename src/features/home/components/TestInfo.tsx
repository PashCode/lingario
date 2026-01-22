import { useAppSelector } from "@/app/store";
import { selectUser } from "@/features/auth/slice";

function TestInfo() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <p>{`${user?.email} / ${user?.emailVerified}`}</p>
      <p>{user?.name}</p>
    </>
  );
}

export default TestInfo;
