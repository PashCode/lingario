import { selectUser } from "@/features/auth/slice";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector(selectUser);
  return (
    <>
      <div>HOME</div>
      <p>{`${user?.email} / ${user?.emailVerified}`}</p>
      <p>{user?.name}</p>
    </>
  );
}

export default Home;
