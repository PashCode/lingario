import { getRedirectResult, type Auth } from "firebase/auth";

const checkRedirectResul = async (auth: Auth) => {
  try {
    return await getRedirectResult(auth);
  } catch (error) {
    console.log(error);
  }
};

export default checkRedirectResul