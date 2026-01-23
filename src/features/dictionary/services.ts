import { getDownloadURL } from "firebase/storage";
import { oxford3000Storage } from "@/config/firebase";

export async function getOxford3000FromDB() {
  const oxford3000Link = await getDownloadURL(oxford3000Storage);
  const oxford3000Dictionary = await fetch(oxford3000Link);
  return await oxford3000Dictionary.json();
}