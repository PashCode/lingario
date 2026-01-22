import { getDownloadURL } from "firebase/storage";
import { oxfordDictionaryStorage } from "@/config/firebase";

export async function getOxfordDictionaryFromDB() {
  const oxfordDictionaryLink = await getDownloadURL(oxfordDictionaryStorage);
  const oxfordDictionary = await fetch(oxfordDictionaryLink);
  return await oxfordDictionary.json();
}