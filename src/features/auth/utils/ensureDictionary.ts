import { getOxfordDictionary } from "@/features/auth/services";

async function getOrCreateOxfordDictionary() {
  const getDictionary = JSON.parse(
    localStorage.getItem("oxford-dictionary") || "[]",
  );

  if (getDictionary.length) {
    return getDictionary;
  }

  const oxfordDictionary = await getOxfordDictionary();
  localStorage.setItem("oxford-dictionary", JSON.stringify(oxfordDictionary));
  return oxfordDictionary;
}

export default getOrCreateOxfordDictionary;
