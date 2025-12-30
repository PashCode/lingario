import { selectUser } from "@/features/auth/slice.ts";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector(selectUser);
  return (
    <>
      <div>HOME</div>
      <p>{user?.name}</p>
    </>
  );
}

export default Home;
