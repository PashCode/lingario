import { selectUser } from "@/features/auth/slice";
import { useAppSelector } from "@/app/store";

function Home() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <div>HOME</div>
      <p>{`${user?.email} / ${user?.emailVerified}`}</p>
      <p>{user?.name}</p>
    </>
  );
}

export default Home;
