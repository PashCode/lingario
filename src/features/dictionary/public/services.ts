import { getDownloadURL } from "firebase/storage";
import { oxford3000Storage } from "@/config/firebase";
// import { db } from "@/config/firebase";
// import { addDoc, collection } from "firebase/firestore";

export async function getOxford3000FromDB() {
  const oxford3000Link = await getDownloadURL(oxford3000Storage);
  const oxford3000Dictionary = await fetch(oxford3000Link);
  return await oxford3000Dictionary.json();
}
//
// export async function addToPersonalDict() {
//   const docRef = await addDoc(collection(db, 'users'), {name: '1'})
//   console.log(docRef);
// }
//
// addToPersonalDict().then((res) => console.log(res));
